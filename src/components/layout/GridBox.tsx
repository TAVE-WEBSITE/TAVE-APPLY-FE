interface GridBoxProps {
  className?: string;
  col?: 1 | 2;
  children: React.ReactNode;
}

const GridBox = ({ className, col, children }: GridBoxProps) => {
  return (
    <div
      className={`grid items-center ${
        col === 1 ? "grid-cols-1" : "grid-cols-2"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GridBox;
