export default function ToggleSwitch({ enabled, onToggle, label, id }) {
  return (
    <button id={id} role="switch" aria-checked={enabled} aria-label={label} onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 shrink-0
                  ${enabled ? 'bg-orange-500' : 'bg-stone-200'}`}>
      <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm
                        transition-transform duration-300 ${enabled ? 'translate-x-7' : 'translate-x-0'}`} />
    </button>
  );
}
