import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cabin or booked dates:", error);
    return Response.json(
      { error: "Failed to fetch cabin or booked dates." },
      { status: 500 }
    );
  }
}
