const stack = ["React", "TypeScript", "Vite", "Tailwind", "React Router", "Vercel"];

const BuiltWith = () => {
  return (
    <footer className="w-full shrink-0 border-t border-[var(--surface-border)] px-1 py-3 sm:px-2 sm:py-4">
      <div className="flex flex-col items-center justify-between gap-1.5 text-center text-[11px] themed-text-muted sm:flex-row sm:text-left sm:text-xs">
        <p>© {new Date().getFullYear()} Jose Benjumea</p>
        <p>
          Built with{" "}
          {stack.map((name, index) => (
            <span key={name}>
              {index > 0 && <span className="opacity-40"> · </span>}
              {name}
            </span>
          ))}
        </p>
        <a
          href="https://github.com/imJOS3/My-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-[var(--text-label)]"
        >
          Source
        </a>
      </div>
    </footer>
  );
};

export default BuiltWith;
