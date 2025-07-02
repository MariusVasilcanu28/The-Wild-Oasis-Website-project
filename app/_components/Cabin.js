import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-[1fr] grid-rows-[250px_5fr] md:grid-rows-[1fr] md:grid-cols-[3fr_4fr] gap-10 md:gap-20 border border-primary-800 md:py-3 md:px-10 mb-14 md:mb-24">
      <div className="relative md:scale-[1.15] md:-translate-x-3">
        <Image
          fill
          className="object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="px-3 md:px-0">
        <h3 className="text-accent-100 font-black text-5xl mb-3 md:text-7xl md:mb-5 md:translate-x-[-254px] bg-primary-950 md:p-6 md:pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
