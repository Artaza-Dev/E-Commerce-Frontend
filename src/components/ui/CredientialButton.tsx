interface ButtonProps {
  text: string;
  onclick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onclick, className }) => {
  return (
    <button
  onClick={onclick}
  className={`bg-black hover:bg-gray-800 w-full py-3 cursor-pointer 
    rounded-2xl text-white font-semibold text-lg tracking-wide 
    shadow-md transition-all duration-200 active:scale-95 ${className || ""}`}
>
  {text}
</button>

  );
};

export default Button;
