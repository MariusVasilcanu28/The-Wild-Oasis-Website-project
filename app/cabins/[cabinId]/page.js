import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

// PLACEHOLDER DATA
export default async function Page({ params }) {
  const { cabinId } = await params;

  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl mb-10 text-accent-400 font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabinId={cabinId} cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
