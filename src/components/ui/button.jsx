export function Button({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    default: 'bg-black text-white hover:bg-slate-800',
    outline: 'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
