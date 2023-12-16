"use client";

const ButtonGradient = ({ title = "Start using Findrr now", onClick = () => {} }) => {
  return (
    <button className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
