import { Header } from "~/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="flex w-full max-w-2xl flex-col">
        <Header />
      </div>
    </main>
  );
}
