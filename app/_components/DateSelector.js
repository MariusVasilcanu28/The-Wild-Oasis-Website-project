"use client";

import { differenceInDays, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useResevation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates, cabinId }) {
  const { range, setRange, resetRange } = useResevation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CHANGE
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  console.log(typeof minBookingLength, typeof maxBookingLength);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="py-6 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={setRange}
        selected={displayRange}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) return true;

          if (bookedDates.some((bookedDate) => isSameDay(date, bookedDate)))
            return true;

          if (!range?.from || range?.to) return false;

          const start = new Date(range.from);
          start.setHours(0, 0, 0, 0);

          const diff = Math.floor((date - start) / (1000 * 60 * 60 * 24));
          if (diff >= 0 && diff < minBookingLength) return true;
          if (diff > maxBookingLength - 1) return true;

          return false;
        }}
        defaultMonth={new Date()}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear(), 5 * 12)}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer hover:bg-primary-800 hover:text-primary-100 transition-colors"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
