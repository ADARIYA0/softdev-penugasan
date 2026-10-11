export function Badge({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-red-500 text-white',
    secondary: 'bg-slate-200 text-slate-900',
  };

  return (
    <div 
      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
