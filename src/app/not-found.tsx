import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        style={{
          color: "white",
          backgroundColor: "#FB861B",
          padding: "0.5rem 1rem",
          borderRadius: "12px",
          textDecoration: "none",
        }}
      >
        Return Home
      </Link>
    </main>
  );
}
