import type { ChangeEvent } from "react";

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  onchange,
  value,
  className,
}) => {
  return (
   <input
  type={type}
  value={value}
  placeholder={placeholder}
  onChange={onchange}
  className={`w-full px-4 py-3.5 mb-4 rounded-2xl border border-gray-300 
    bg-white text-gray-800 placeholder:text-gray-500 
    outline-none transition-all duration-200 
    focus:border-black focus:ring-2 focus:ring-black/30 
    hover:border-gray-500 shadow-sm ${className ?? ""}`}
  autoComplete="off"
/>
  );
};

export default Input;
