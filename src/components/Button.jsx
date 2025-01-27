const Button = ({ label, onClick, customClassname, disabled }) => {
  return (
    <button
      disabled={disabled}
      className="bg-[#0077D4] text-lg px-2 py-2 cursor-pointer rounded-md text-white hover:opacity-90 focus:outline-none"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
