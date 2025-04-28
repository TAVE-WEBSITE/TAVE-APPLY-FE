import FlexBox from "../layout/FlexBox";

interface CardProps {
  content?: string;
  isRequired?: boolean;
  wordLimit?: number;
  children?: React.ReactNode;
}

const Card = ({
  content,
  isRequired = false,
  wordLimit = 500,
  children,
}: CardProps) => {
  return (
    <div className="bg-white p-8 border-[#E5E7EB]">
      <FlexBox className="justify-between">
        {content ? (
          <FlexBox className="gap-1">
            <span className="font-bold">{content}</span>
            <span className="font-medium">{wordLimit}자 이내</span>
            {isRequired && <span className="text-[#FF0073CC]">*</span>}
          </FlexBox>
        ) : (
          children
        )}
      </FlexBox>
    </div>
  );
};

export default Card;
