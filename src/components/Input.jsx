const Input = ({
  type,
  placeholder,
  value,
  label,
  disabled,
  errorMessage,
  required,
  customClassName,
  onChange,
}) => {
  const inputStyles = {
    backgroundColor: disabled ? "#f0f4f8" : "#ffffff",
    color: disabled ? "#6b7280" : "#000000",
    borderColor: errorMessage ? "#e53e3e" : disabled ? "#e5ebe7" : "#a0aec0",
  };

  const focusStyles = {
    borderColor: "#2563eb",
    borderWidth: "2px",
  };

  return (
    <div className="flex flex-col">
      <label>
        {required && <span className="text-red-500">*</span>}
        <span className="text-sm mr-3">{label}</span>
      </label>
      <input
        placeholder={placeholder}
        style={{ ...inputStyles }}
        className={`h-9 border rounded p-2 outline-none ${customClassName}`}
        type={type}
        label={label}
        value={value}
        onFocus={(e) => {
          e.target.style.borderColor = focusStyles.borderColor;
          e.target.style.borderWidth = focusStyles.borderWidth;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errorMessage
            ? "#e53e3e"
            : inputStyles.borderColor;
          e.target.style.borderWidth = errorMessage ? "2px" : "1px";
        }}
        onChange={onChange}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
