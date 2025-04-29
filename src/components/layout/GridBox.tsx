interface GridBoxProps {
  className?: string;
  cols: number;
  children: React.ReactNode;
}

const GridBox = ({ className, cols, children }: GridBoxProps) => {
  return (
    <div className={`grid items-center grid-cols-${cols} ${className}`}>
      {children}
    </div>
  );
};

export default GridBox;
