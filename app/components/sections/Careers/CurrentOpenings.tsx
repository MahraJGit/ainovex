import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";
import JobCard from "../../ui/JobCard";

const jobs = [
  { title: "Senior Business Development", description: "We're looking for someone who spots opportunities and turns them into growth. If you're skilled at building relationships and closing deals, this role offers real impact." },
  { title: "B2B Sales Specialist", description: "Perfect for someone who enjoys connecting with businesses and understanding their needs, like building relationships, presenting the right solutions, and driving sustainable growth." },
  { title: "HR Executive", description: "We need someone who values people and workplace culture. From hiring top talent to supporting employees, you'll play an important role in strengthening our team." },
  { title: "Full Stack Developer", description: "If you enjoy building digital products from start to finish, this role is for you. You'll work across both front-end and back-end technologies to solve real-world challenges." },
  { title: "Odoo Developer", description: "This role suits someone who likes building and customizing business software. You'll set up, configure, and improve Odoo modules to help our clients run their operations more smoothly." },
  { title: "Civil Engineer", description: "We're looking for someone with a strong eye for planning and structure. You'll support project design, site assessments, and technical documentation for our engineering-related work." },
  { title: "Electrical Engineer", description: "This role is for someone who understands electrical systems and enjoys solving technical problems. You'll help design, review, and support electrical components across our projects." },
];

export default function CurrentOpenings() {
  return (
    <section id="current-openings" className="relative overflow-hidden bg-white">
      <SectionGrid placement="left-light" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 mb-16">
          <div className="text-center lg:text-left">
            <h2 className="text-ink tracking-[-2.25px]">
              Current <span className="text-primary">Openings</span>
            </h2>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <p className="text-base font-normal leading-relaxed text-ink text-center lg:text-right max-w-[563px]">
              Explore exciting career opportunities and join a team where your
              skills, ideas, and hard work truly make a difference.
            </p>
          </div>
        </div>

        {/* Job list */}
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.title} {...job} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button variant="primary">View All Openings</Button>
        </div>
      </div>
    </section>
  );
}