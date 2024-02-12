"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error + " Error occurred");
  }, [error]);
  //   const router = useRouter();

  return (
    <div>
      <main className="error">
        <h1>An error occurred!</h1>
        <p>Failed to fetch meal data. Please try again later.</p>
      </main>
      {/* <button
        onClick={() => {
          //   reset();
        //   router.push("/meals");
        }}
      >
        Try again
      </button> */}
    </div>
  );
}
