interface OverLayProps {
  children: React.ReactNode;
  className?: string;
}

const OverLay = ({ children, className = "" }: OverLayProps) => {
  return (
    <div
      className={`fixed inset-0 z-99 bg-black/40 ${className}`}
      role="presentation"
    >
      {children}
    </div>
  );
};

export default OverLay;
