interface FlexBoxProps {
  className?: string;
  direction?: "row" | "col";
  children: React.ReactNode;
}

const FlexBox = ({ className, direction = "row", children }: FlexBoxProps) => {
  return (
    <div
      className={`flex ${
        direction === "col" ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FlexBox;
