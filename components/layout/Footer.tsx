export function Footer() {
  return (
    <footer 
      className="mt-auto border-t border-border transition-colors"
      style={{ backgroundColor: "var(--header-bg, var(--bg))" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Копирайт: оставляем приглушенным, но плотным */}
          <p className="text-base font-medium text-muted">
            © {new Date().getFullYear()} A-bumaga
          </p>
          
          {/* Ссылки: делаем основным цветом, при наведении — акцент */}
          <nav className="flex gap-8 text-base font-medium">
            <a
              href="https://www.wildberries.ru/seller/191252"
              className="text-foreground transition-colors hover:text-accent"
            >
              Wildberries
            </a>
            <a
              href="https://www.ozon.ru/seller/a-bumaga/"
              className="text-foreground transition-colors hover:text-accent"
            >
              Ozon
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}