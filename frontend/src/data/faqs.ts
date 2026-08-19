export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    id: "age",
    question: "How old are you?",
    answer:
      "I was born in 2005, so I'm 20–21. I'm a Software Engineering student in my final semesters at Universidad Manuela Beltrán.",
  },
  {
    id: "availability",
    question: "What's your availability? When can you start?",
    answer:
      "I'm open to internships and junior roles now. We can agree on a start date quickly. I still have university classes, so hours can be full-time or part-time depending on the role — happy to align a schedule in the first conversation.",
  },
  {
    id: "languages",
    question: "What languages do you speak, and at what level?",
    answer:
      "Spanish is my native language. English is at a professional working level: I write this site and technical docs in English, and I can interview and collaborate with a team in English. I'm used to reading official documentation in English day to day.",
  },
  {
    id: "location",
    question: "Where are you based? Remote, hybrid, or on-site?",
    answer:
      "I live in Bogotá, Colombia (born and raised in Barranquilla). I'm open to remote, hybrid, or on-site work in Bogotá. For roles outside the city, remote is the best fit unless we talk about relocation.",
  },
  {
    id: "role-type",
    question: "Are you looking for an internship or a full-time job?",
    answer:
      "Both, as long as I can keep finishing my degree. Internships and junior roles are the priority. I'm looking for a team where I can ship real product work — APIs, data models, and fullstack features — not only classroom exercises.",
  },
  {
    id: "education",
    question: "What do you study, and where?",
    answer:
      "Software Engineering at Universidad Manuela Beltrán in Bogotá. I'm in my final semesters. Alongside the degree I've taken courses from SENA, Oracle, Google Cloud, and Cisco (including Ethical Hacker).",
  },
  {
    id: "focus",
    question: "Are you more backend or frontend?",
    answer:
      "Fullstack with a backend focus. I like APIs, data models, auth, and systems that hold up outside a demo. I also ship the UI when the product needs it — React, TypeScript, and Tailwind are part of my day-to-day.",
  },
  {
    id: "experience",
    question: "Do you have professional work experience?",
    answer:
      "I don't have a corporate job yet — that's why I'm looking for an internship or junior role. I do have shipped personal and academic products: EcoTurismo (bookings + PostgreSQL), Old West (appointments), Bingo Online (realtime with Socket.io), plus work-in-progress SaaS and Java/Spring projects. GitHub has the code.",
  },
  {
    id: "stack",
    question: "What's your main stack?",
    answer:
      "Java and Spring Boot, Node.js and Express, React and TypeScript, PostgreSQL, Docker, and Git. I also work with MySQL, Oracle, Python, and Linux. AWS and GCP are at a foundations level (Google Cloud Computing Foundations badge on Credly).",
  },
  {
    id: "work-auth",
    question: "Are you authorized to work in Colombia?",
    answer:
      "Yes. I'm a Colombian student based in Bogotá, available for internships and junior contracts under Colombian labor rules. I don't need visa sponsorship for local roles.",
  },
  {
    id: "contact",
    question: "How should I contact you?",
    answer:
      "Email josebenjuema2005@gmail.com or WhatsApp +57 318 289 3475. LinkedIn is jose-benjumea-5167b8271 and GitHub is imJOS3. Email is best for recruiting; WhatsApp is fine for a quick first ping.",
  },
  {
    id: "cv-code",
    question: "Where can I see your CV and your code?",
    answer:
      "The CV PDF is on the About section of this site (Open CV). Projects with screenshots and repos are on the homepage coverflow. Code lives at github.com/imJOS3.",
  },
];
