export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none ${className}`}
      {...props}
    />
  );
}
