import Text from "./Text";
import { colors } from "../utils/color";

const Card = ({
  title,
  value,
  description,
  children,
  variant = "default",
  className = "",
}) => {
  const variants = {
    default: {
      border: colors.border.light,
      value: colors.text.dark,
    },
    primary: {
      border: colors.primary[600],
      value: colors.primary[600],
    },
    success: {
      border: "#16a34a",
      value: "#16a34a",
    },
    danger: {
      border: "#dc2626",
      value: "#dc2626",
    },
    warning: {
      border: "#d97706",
      value: "#d97706",
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm border ${className}`}
      style={{
        backgroundColor: colors.background.card,
        borderColor: selectedVariant.border,
      }}
    >
      {title && (
        <Text size="sm" weight="medium" color="muted">
          {title}
        </Text>
      )}

      {value && (
        <h3
          className="mt-3 text-3xl font-bold"
          style={{ color: selectedVariant.value }}
        >
          {value}
        </h3>
      )}

      {description && (
        <Text size="sm" color="light" className="mt-2">
          {description}
        </Text>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;