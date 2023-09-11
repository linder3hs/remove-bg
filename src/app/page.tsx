import dynamic from "next/dynamic";

export default function Home() {
  const PixiComponentWithNoSSR = dynamic(
    () => import("../components/InputFile"),
    { ssr: false }
  );

  return (
    <main className="h-screen bg-gray-950 p-6 md:p-12">
      <PixiComponentWithNoSSR />
    </main>
  );
}
