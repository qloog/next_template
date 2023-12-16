"use client";

const ButtonGradient = ({ title = "Start using Findrr now", onClick = () => {} }) => {
  return (
    <button className="btn btn-gradient animate-shimmer items-center justify-center" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
