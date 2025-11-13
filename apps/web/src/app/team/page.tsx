import Avatar from "@/components/Avatar";

const teams = [
  [
    {
      src: "/team/Samar_Ahmed.jpg",
      name: "Samar Ahmed",
      position: "President",
      description: "Computer Engineering Senior",
    },
    {
      src: "/team/Ahmed_Hammad.jpg",
      name: "Ahmed Hammad",
      position: "Vice President",
      description: "Mechanical Engineering Senior",
    },
  ],
  [
    {
      src: "/team/Abdelrahman_Abdelbaky.jpg",
      name: "Abdelrahman Abdelbaky",
      position: "Treasurer",
      description: "Computer Engineering Junior",
    },

    {
      src: "/team/Mariam_Abdo.jpg",
      name: "Mariam Abdo",
      position: "Head of Academics",
      description: "Data Science Junior",
    },
    {
      src: "/team/Adham_Younes.jpg",
      name: "Adham Younes",
      position: "Head of Academics",
      description: "Electronics and Communications Engineering Sophomore",
    },

    {
      src: "/team/Omar_Abdel_Motalb.jpg",
      name: "Omar Abdel Motalb",
      position: "Head of R&D",
      description: "Computer Engineering Junior",
    },
    {
      src: "/team/avatar.svg",
      name: "Abdelrahman Wael",
      position: "Head of R&D",
      description: "Electronics and Communications Engineering Junior",
    },

    {
      src: "/team/Sama_Emad.jpg",
      name: "Sama Emad",
      position: "Head of Operaitons",
      description: "Computer Engineering Junior",
    },
    {
      src: "/team/Leena_Abbas.jpg",
      name: "Leena Abbas",
      position: "Head of Internal Events",
      description: "Electronics and Communications Engineering Sophomore",
    },
    {
      src: "/team/Seba_Wahba.jpg",
      name: "Seba Wahba",
      position: "Head of External Events",
      description: "Computer Science Junior",
    },

    {
      src: "/team/Aly_Samir.jpg",
      name: "Aly Samir",
      position: "Head of Supply Chain",
      description: "Construction Engineering Junior",
    },
    {
      src: "/team/Muhammed_El_Wakeel.jpg",
      name: "Muhammed El Wakeel",
      position: "Head of Supply Chain",
      description: "Mechanical Engineering Junior",
    },

    {
      src: "/team/Dan_Ashraf.jpg",
      name: "Dan Ashraf",
      position: "Head of PR & FR",
      description: "Business Finance Senior",
    },

    {
      src: "/team/Farouk_Youssef.jpg",
      name: "Farouk Youssef",
      position: "Head of Website",
      description: "Computer Science & Mathematics Sophomore",
    },
    {
      src: "/team/avatar.svg",
      name: "Omar Sherif",
      position: "Head of Website",
      description: "Mechanical Engineering Sophomore",
    },

    {
      src: "/team/Kareem_Abdellatif.jpg",
      name: "Kareem Abdellatif",
      position: "Head of Workshop",
      description: "Computer Engineering Sophomore",
    },

    {
      src: "/team/Abanoub_Kamel.jpg",
      name: "Abanoub Kamel",
      position: "Head of HR",
      description: "Electronics and Communications Engineering Senior",
    },

    {
      src: "/team/Sama_Ahmed.jpg",
      name: "Sama Ahmed",
      position: "Direcotor of Marketing",
      description: "Architectural Engineering Senior",
    },
    {
      src: "/team/Habiba_Khalil.jpg",
      name: "Habia Khalil",
      position: "Head of Communications",
      description: "Computer Engineering Junior",
    },
    {
      src: "/team/Nardine_Saleh.jpg",
      name: "Nardine Saleh",
      position: "Director of Multimedia",
      description: "Biology Senior",
    },

    {
      src: "/team/Ahmed_Maged.jpg",
      name: "Eng. Ahmed Maged",
      position: "Advisor",
      description: "PhD Student",
    },
  ],
];

export default function Team() {
  return (
    <div className="*:px-6 *:py-6 md:*:px-24 lg:*:px-32">
      <section className="flex flex-col items-center justify-around gap-8">
        <div className="text-secondary text-center">
          <h2 className="font-display animate-in fade-in slide-in-from-top-4 mt-16 mb-4 text-7xl leading-[0.85] transition-none duration-500 md:text-8xl">
            Meet the minds behind{" "}
            <span className="text-primary">AUC ROBOTICS</span>!
          </h2>
          <p className="mt-4 text-3xl">
            We’re a team of innovators, builders, and problem-solvers, pushing
            the limits of technology one robot at a time.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {teams.map((team, i) => (
            <div className="flex w-full flex-wrap justify-center gap-4" key={i}>
              {team.map((member, j) => (
                <div className="w-80" key={j}>
                  <Avatar {...member} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
