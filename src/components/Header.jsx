export default function Header() {
  return (
    <header className="w-full py-6 px-12 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
      <div className="text-2xl font-bold tracking-tight">Interactive Calendar</div>
      <nav>
        <ul className="flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <li className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Calendar</li>
          <li className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Stats</li>
          <li className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Settings</li>
        </ul>
      </nav>
    </header>
  );
}
