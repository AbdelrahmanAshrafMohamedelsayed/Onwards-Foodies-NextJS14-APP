"use client"; // Error components must be Client Components

import Link from "next/link";
import { useRouter } from "next/navigation";
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
    console.error(error);
  }, [error]);
  return (
    <main className="error">
      <h1>{error instanceof Error ? error.message : "An error occurred"}</h1>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          background: "linear-gradient(90deg, #f9572a, #ff9b05)",
          color: "#ffffff",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Try again
      </Link>
    </main>
  );
}
