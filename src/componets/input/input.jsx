const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  disabled = false,
  rightElement = null,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            rightElement ? "pr-12" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          } disabled:cursor-not-allowed disabled:bg-slate-100`}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
