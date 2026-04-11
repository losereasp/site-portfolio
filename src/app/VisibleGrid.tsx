export default function VisibleGrid() {
  // 12 колонок, 1px линии, opacity 0.08 — еле видны, но создают индустриальную сетку
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none select-none" aria-hidden>
      <div className="w-full h-full grid grid-cols-12 px-4 md:px-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-l border-black"
            style={{ opacity: 0.06 }}
          />
        ))}
        {/* Правая крайняя черта */}
        <div
          className="fixed top-0 right-4 md:right-8 h-full border-r border-black w-0"
          style={{ opacity: 0.06 }}
        />
      </div>
    </div>
  );
}
