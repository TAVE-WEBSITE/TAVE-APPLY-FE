import SignUpForm from "./SignInForm";

const SignIn = () => {
  return (
    <div>
      <div className="pt-24 pb-16">
        <h3 className="text-2xl font-bold text-center">TAVE RECRUIT</h3>
      </div>
      <div>
        <section className="bg-white md:h-left h-screen">
          <SignUpForm />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
