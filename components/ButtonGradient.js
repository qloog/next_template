"use client";

const ButtonGradient = ({ title = "Start using Findrr now", onClick = () => {} }) => {
  return (
    <button className="btn btn-gradient animate-shimmer" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
