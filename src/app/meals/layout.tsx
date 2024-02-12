export default function MealLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <nav>Here Im in meals Page</nav> */}

      {children}
    </section>
  );
}
