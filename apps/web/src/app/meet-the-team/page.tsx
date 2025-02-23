import Avatar from "@/components/avatar";

const team = [
  {
    src: "/team/Hala.png",
    name: "Hala",
    position: "President",
    description:
      "Hala provides the strategic direction for the club, she oversees operations, team coordination, and project development. By fostering collaboration and innovation, she drive the whole club's success.",
  },
  {
    src: "/team/Jana.png",
    name: "Jana",
    position: "Vice President",
    description:
      "Jana supports the president and ensures smooth coordination between all departments. She is also head of operations and over seeing marketing!",
  },
  {
    src: "/team/John.png",
    name: "John",
    position: "Academics Head",
    description:
      "John designs and manages robotics courses, workshops, and training sessions.",
  },
  {
    src: "/team/Mariam.png",
    name: "Mariam",
    position: "Academics Head",
    description:
      "Mariam designs and manages robotics courses, workshops, and training sessions.",
  },
  {
    src: "/team/Mohanad.png",
    name: "Mohanad",
    position: "R&D Head",
    description:
      "Mohanad leads the research and development of new robotics technologies, focusing on designing, testing, and improving robots to meet project goals.",
  },
  {
    src: "/team/Eman.png",
    name: "Eman",
    position: "PR Head",
    description:
      "Eman manages the club's communications. She engages with sponsors and builds relationships with the university and external organizations.",
  },
  {
    src: "/team/Areeg.png",
    name: "Areej",
    position: "Events Head",
    description:
      "Areej plans, organizes, and manages club events, workshops, and competitions to ensure smooth execution.",
  },
  {
    src: "/team/Wakeel.png",
    name: "M. Wakeel",
    position: "Supply Chain Head",
    description:
      "Wakeel manages all the procurement, inventory, and distribution of materials for the robotics club.",
  },
  {
    src: "/team/Basmala.png",
    name: "Basmala",
    position: "Finance Head",
    description:
      "Basmala is responsible for managing the club's budget and allocating its financial resources.",
  },
  {
    src: "/team/Abanoub.png",
    name: "Abanoub",
    position: "HR Head",
    description:
      "Abanoub manages member recruitment, engagement and teamwork, ensuring a positive and productive club environment.",
  },
  // M. Yasser
  // Farouk
  {
    src: "/team/Maged.png",
    name: "Eng. Maged",
    position: "R&D Advisor",
    description:
      "Eng. Maged is in charge of advising the R&D committee in assisting them with ideas.",
  },
];

export default function MeetTheTeam() {
  return (
    <div className="*:px-6 *:py-6 md:*:px-24 lg:*:px-32">
      <section className="flex flex-col items-center justify-around gap-8">
        <div className="text-secondary text-center">
          <h2 className="font-display animate-in fade-in slide-in-from-top-4 text-7xl leading-[0.85] transition-none duration-500 md:text-8xl">
            Meet the minds behind{" "}
            <span className="text-primary">AUC ROBOTICS</span>!
          </h2>
          <p className="mt-4 text-3xl">
            We’re a team of innovators, builders, and problem-solvers, pushing
            the limits of technology one robot at a time.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {team.map((member, i) => (
            <Avatar {...member} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
