function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
}) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-lg font-semibold transition duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;