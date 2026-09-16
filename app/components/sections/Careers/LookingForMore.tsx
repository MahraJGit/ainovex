import QueryBanner from "../../common/Querybanner";

export default function LookingForMore() {
  return (
    <QueryBanner
      heading={<>Looking for More Than<br /><span className="text-primary">Just a Job?</span></>}
      description="Join a workplace where learning, collaboration, and growth come together."
    />
  );
}