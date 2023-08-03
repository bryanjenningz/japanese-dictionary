import { Header } from "~/components/Header";
import { EmptySearchResultsMenu } from "~/components/EmptySearchResultsMenu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="flex w-full max-w-2xl flex-col">
        <Header />

        <EmptySearchResultsMenu />
      </div>
    </main>
  );
}
