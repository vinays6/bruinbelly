export default function SectionCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-display font-semibold text-base text-stone-800">{title}</h2>
        </div>
      )}
      <div className="px-4 pb-4">
        {children}
      </div>
    </div>
  );
}
