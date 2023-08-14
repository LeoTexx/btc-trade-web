import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: React.FC<Props> = ({ text, ...rest }) => {
  return (
    <button
      className="w-full py-4 px-4 text-white font-semibold rounded-xl transition-all duration-500 bg-gradient-to-r from-[#ffc95e] via-[#333]  to-[#20bfa7] bg-size-200 bg-pos-0 hover:bg-pos-100"
      {...rest}
    >
      {text}
    </button>
  );
};
