"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { revalidate } from "../about/page";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] =
    formData.get("nationality").split("%") || [];

  if (!/^[a-zA-Z0-9]{6,13}$/.test(nationalID)) {
    throw new Error(
      "Invalid national ID format. It should be 6-12 alphanumeric characters."
    );
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You can only delete your own bookings");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // Authentication
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  // Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You can only delete your own bookings");
  }

  // Building update data
  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // Error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  //revalidating
  revalidatePath(`/account/reservations/`);
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // redirecting
  redirect(`/account/reservations/`);
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
