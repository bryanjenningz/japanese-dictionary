import { CloseIcon } from "~/icons/CloseIcon";
import { MenuIcon } from "~/icons/MenuIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="flex w-full max-w-2xl flex-col">
        <header className="flex h-14 items-center">
          <button className="h-14 px-6">
            <span className="sr-only">Open menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <input className="grow bg-slate-800 px-1 py-2" />
            <button className="absolute bottom-0 right-0 top-0 px-1 text-slate-300">
              <span className="sr-only">Clear input</span>
              <CloseIcon />
            </button>
          </div>

          <button className="flex h-14 items-center justify-center px-6">
            <span className="flex h-6 w-6 items-center justify-center rounded border-2 border-white text-lg">
              <span className="sr-only">English search</span>
              <span aria-hidden>E</span>
            </span>
          </button>
        </header>
      </div>
    </main>
  );
}
