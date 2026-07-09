function Alert({ type = "success", title, message, onClose, className = "" }) {
  const styles = {
    success: "bg-green-50 text-green-700 border-green-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div className={`rounded-lg border px-4 py-3 ${styles[type]} ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {title && <h4 className="font-semibold">{title}</h4>}
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-lg leading-none opacity-70 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
