import ProfileAvatar from "./ProfileAvatar";

const Topbar = () => {
  return (
    <div className="p-4 bg-[#074873] w-full">
      <div className="mx-10 py-2">
        <div className="flex justify-end items-center">
          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
