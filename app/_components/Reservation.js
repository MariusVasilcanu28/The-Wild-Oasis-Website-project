import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabinId, cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-2 md:grid-rows-1 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabinId={cabinId}
        cabin={cabin}
      />
      {session ? (
        <ReservationForm
          cabin={cabin}
          cabinId={cabinId}
          user={session.user}
          bookedDates={bookedDates}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
