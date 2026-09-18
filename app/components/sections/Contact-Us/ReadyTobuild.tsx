import QueryBanner from "../common/Querybanner";

export default function ReadyToBuild() {
  return (
    <QueryBanner
      heading={<><span className="text-primary">Ready</span> to Build Something Great?</>}
      description="Let’s turn your ideas into powerful digital solutions with a team committed to innovation, quality, and measurable results."
    />
  );
}