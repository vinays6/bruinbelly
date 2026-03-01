import { useRef } from 'react';

export default function ImageUploadPreview({ imageFile, onChange }) {
  const inputRef = useRef(null);
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <div>
      <label htmlFor="image-upload" className="text-sm font-semibold text-stone-600 block mb-2">
        Photo (optional)
      </label>

      {previewUrl ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove image"
            className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Upload photo"
          className="w-full h-28 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50
                     flex flex-col items-center justify-center gap-2 text-stone-400
                     hover:border-orange-300 hover:bg-orange-50 transition-colors active:scale-[0.98]"
        >
          <span className="text-2xl">📷</span>
          <span className="text-xs font-medium">Tap to add a photo</span>
        </button>
      )}

      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </div>
  );
}
