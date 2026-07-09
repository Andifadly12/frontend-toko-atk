import Input from "../input";
import Button from "../button";

const Form = ({
  fields = [],
  form = {},
  errors = {},
  onChange,
  onSubmit,
  className = "space-y-4",

  showButton = false,
  buttonText = "Simpan",
  buttonVariant = "primary",
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <div key={field.name} className="w-full">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              <select
                name={field.name}
                value={form[field.name] || ""}
                onChange={onChange}
                disabled={field.disabled || false}
                required={field.required || false}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                  errors[field.name]
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                } disabled:cursor-not-allowed disabled:bg-slate-100`}
              >
                <option value="">
                  {field.placeholder || "Pilih data"}
                </option>

                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name} className="w-full">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              <textarea
                name={field.name}
                value={form[field.name] || ""}
                onChange={onChange}
                placeholder={field.placeholder || ""}
                rows={field.rows || 4}
                disabled={field.disabled || false}
                required={field.required || false}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                  errors[field.name]
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                } disabled:cursor-not-allowed disabled:bg-slate-100`}
              />

              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        }

        return (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={form[field.name] || ""}
            onChange={onChange}
            placeholder={field.placeholder || ""}
            error={errors[field.name]}
            required={field.required || false}
            disabled={field.disabled || false}
          />
        );
      })}

      {showButton && (
        <Button type="submit" variant={buttonVariant} full>
          {buttonText}
        </Button>
      )}
    </form>
  );
};

export default Form;