export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} A-bumaga
          </p>
          <nav className="flex gap-8 text-sm text-muted">
            <a href="https://www.wildberries.ru/seller/191252" className="transition-colors hover:text-foreground">Wildberries</a>
            <a href="https://www.ozon.ru/seller/a-bumaga/" className="transition-colors hover:text-foreground">Ozon</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}