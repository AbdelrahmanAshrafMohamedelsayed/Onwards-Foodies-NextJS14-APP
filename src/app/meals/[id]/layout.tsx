export default function MealsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <nav>Here Im in meal Page</nav> */}

      {children}
    </section>
  );
}
