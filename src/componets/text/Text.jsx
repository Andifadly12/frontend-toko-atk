function Text({
  children,
  as = "p",
  size = "md",
  weight = "normal",
  color = "default",
  align = "left",
  className = "",
}) {
  const Tag = as;

  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colors = {
    default: "text-slate-800",
    muted: "text-slate-500",
    light: "text-slate-400",
    white: "text-white",
    primary: "text-blue-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`${sizes[size]} ${weights[weight]} ${colors[color]} ${aligns[align]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Text;
