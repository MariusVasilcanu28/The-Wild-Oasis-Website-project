"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [counter, setCounter] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // Countdown interval
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Redirect timeout
    const timeout = setTimeout(() => {
      router.push("/account/reservations");
    }, 5000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>

      <p className="text-lg">
        Redirecting to your reservations in{" "}
        <span className="font-bold">{counter}</span> seconds...
      </p>

      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
