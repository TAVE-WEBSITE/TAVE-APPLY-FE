import StepBar from "../../components/StepBar";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div>
      <div className="pt-28 pb-16">
        <StepBar title="JOIN TO TAVE" maxStep={3} currentStep={1} />
      </div>
      <section className="bg-white h-screen">
        <RegisterForm />
      </section>
    </div>
  );
};

export default Register;
