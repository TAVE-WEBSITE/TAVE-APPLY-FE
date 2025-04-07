import RegisterLayoutClient from "./RegisterLayoutClient";

const RegisterLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex flex-col">
      <RegisterLayoutClient>{children}</RegisterLayoutClient>
    </div>
  );
};

export default RegisterLayout;
