import ResetPasswordLayoutClient from "./ResetPasswordLayoutClient";

const ResetPasswordLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex flex-col">
      <ResetPasswordLayoutClient>{children}</ResetPasswordLayoutClient>
    </div>
  );
};

export default ResetPasswordLayout;
