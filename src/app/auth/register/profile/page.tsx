import ProfileClient from "./ProfileClient";

const Profile = () => {
  return (
    <>
      <h1 className="font-bold md:text-2xl text-xl text-[#394150] text-center">
        개인 정보 입력
      </h1>
      <ProfileClient />
    </>
  );
};

export default Profile;
