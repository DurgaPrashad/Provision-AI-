
export interface ResumeData {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  languages: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  certifications: string[];
  atsScore: number;
  avatarUrl?: string;
  likes?: number;
  isLiked?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export const mockResumes: ResumeData[] = [
  {
    id: "1",
    fullName: "Alex Johnson",
    jobTitle: "Senior Frontend Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Passionate frontend developer with 6+ years of experience building responsive and accessible web applications. Specialized in React and modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "CSS/SCSS", "Redux", "Jest", "Webpack", "Accessibility", "Performance Optimization"],
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Python"],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2020",
        endDate: "Present",
        description: [
          "Led a team of 5 developers in rebuilding the company's main product using React and TypeScript",
          "Improved application performance by 40% through code optimization and lazy loading strategies",
          "Implemented comprehensive accessibility improvements following WCAG 2.1 AA standards"
        ]
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "Oakland, CA",
        startDate: "Mar 2017",
        endDate: "Dec 2019",
        description: [
          "Developed responsive web applications using React and Redux",
          "Collaborated with UX designers to implement pixel-perfect interfaces",
          "Reduced build size by 30% by optimizing dependency management"
        ]
      }
    ],
    education: [
      {
        degree: "BS Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "Aug 2013",
        endDate: "May 2017"
      }
    ],
    certifications: [
      "AWS Certified Developer",
      "Google Professional Web Developer"
    ],
    atsScore: 92,
    avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    likes: 24,
    isLiked: false,
    isActive: true,
    createdAt: "2023-04-15"
  },
  {
    id: "2",
    fullName: "Maya Patel",
    jobTitle: "UX/UI Designer",
    email: "maya.patel@example.com",
    phone: "(555) 987-6543",
    location: "New York, NY",
    summary: "Creative UX/UI designer with 4+ years of experience creating user-centered digital experiences. Strong background in design systems and prototyping.",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems", "Information Architecture", "Wireframing", "User Testing"],
    languages: ["HTML", "CSS", "JavaScript (Basic)"],
    experience: [
      {
        title: "Senior UX Designer",
        company: "CreativeLabs",
        location: "New York, NY",
        startDate: "Jun 2021",
        endDate: "Present",
        description: [
          "Design lead for the company's flagship product, managing end-to-end design process",
          "Created and maintained a comprehensive design system used across multiple products",
          "Conducted user research and testing sessions that led to a 25% increase in user engagement"
        ]
      },
      {
        title: "UX/UI Designer",
        company: "DigitalFront",
        location: "Brooklyn, NY",
        startDate: "Aug 2019",
        endDate: "May 2021",
        description: [
          "Redesigned the main product interface resulting in a 35% increase in user retention",
          "Collaborated with developers to ensure pixel-perfect implementation",
          "Created interactive prototypes for user testing and stakeholder presentations"
        ]
      }
    ],
    education: [
      {
        degree: "BFA Graphic Design",
        institution: "Rhode Island School of Design",
        location: "Providence, RI",
        startDate: "Aug 2015",
        endDate: "May 2019"
      }
    ],
    certifications: [
      "Google UX Design Certificate",
      "Nielsen Norman Group UX Certification"
    ],
    atsScore: 87,
    avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    likes: 18,
    isLiked: false,
    isActive: false,
    createdAt: "2023-05-22"
  },
  {
    id: "3",
    fullName: "David Wilson",
    jobTitle: "Data Scientist",
    email: "david.wilson@example.com",
    phone: "(555) 456-7890",
    location: "Austin, TX",
    summary: "Data scientist with 5+ years of experience applying machine learning and statistical analysis to solve complex business problems. Expertise in Python, R, and big data technologies.",
    skills: ["Machine Learning", "Statistical Analysis", "Data Visualization", "Deep Learning", "Natural Language Processing", "A/B Testing", "SQL", "Big Data"],
    languages: ["Python", "R", "SQL", "Scala", "MATLAB"],
    experience: [
      {
        title: "Senior Data Scientist",
        company: "DataDrive Analytics",
        location: "Austin, TX",
        startDate: "Apr 2019",
        endDate: "Present",
        description: [
          "Developed machine learning models that increased customer conversion rates by 22%",
          "Built and deployed a recommendation engine that boosted average order value by 15%",
          "Led a team of 3 data scientists working on natural language processing projects"
        ]
      },
      {
        title: "Data Scientist",
        company: "TechInsights",
        location: "Chicago, IL",
        startDate: "Jul 2016",
        endDate: "Mar 2019",
        description: [
          "Created predictive models for customer churn reduction",
          "Implemented A/B testing framework for product optimization",
          "Developed interactive dashboards for business intelligence"
        ]
      }
    ],
    education: [
      {
        degree: "MS Data Science",
        institution: "Northwestern University",
        location: "Evanston, IL",
        startDate: "Aug 2014",
        endDate: "May 2016"
      },
      {
        degree: "BS Mathematics",
        institution: "University of Michigan",
        location: "Ann Arbor, MI",
        startDate: "Aug 2010",
        endDate: "May 2014"
      }
    ],
    certifications: [
      "TensorFlow Developer Certificate",
      "AWS Certified Machine Learning Specialist"
    ],
    atsScore: 95,
    avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    likes: 32,
    isLiked: false,
    isActive: false,
    createdAt: "2023-06-10"
  },
  {
    id: "4",
    fullName: "Sarah Chen",
    jobTitle: "Full Stack Developer",
    email: "sarah.chen@example.com",
    phone: "(555) 789-0123",
    location: "Seattle, WA",
    summary: "Full stack developer with 7+ years of experience building scalable web applications. Expertise in JavaScript frameworks, cloud services, and database design.",
    skills: ["React", "Node.js", "Express", "MongoDB", "AWS", "GraphQL", "Docker", "Kubernetes"],
    languages: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "CloudNative Technologies",
        location: "Seattle, WA",
        startDate: "Aug 2020",
        endDate: "Present",
        description: [
          "Led development of microservices architecture for the company's flagship product",
          "Implemented CI/CD pipelines that reduced deployment time by 65%",
          "Mentored junior developers and conducted code reviews to ensure quality standards"
        ]
      },
      {
        title: "Backend Developer",
        company: "TechStartup Inc.",
        location: "Portland, OR",
        startDate: "May 2017",
        endDate: "Jul 2020",
        description: [
          "Designed and implemented RESTful APIs used by millions of users",
          "Optimized database queries resulting in 40% performance improvement",
          "Collaborated with frontend team to integrate new features seamlessly"
        ]
      }
    ],
    education: [
      {
        degree: "MS Computer Science",
        institution: "University of Washington",
        location: "Seattle, WA",
        startDate: "Sep 2015",
        endDate: "Jun 2017"
      },
      {
        degree: "BS Computer Engineering",
        institution: "Oregon State University",
        location: "Corvallis, OR",
        startDate: "Sep 2011",
        endDate: "Jun 2015"
      }
    ],
    certifications: [
      "AWS Solutions Architect",
      "MongoDB Certified Developer",
      "Kubernetes Administrator"
    ],
    atsScore: 90,
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    likes: 27,
    isLiked: false,
    isActive: false,
    createdAt: "2023-07-05"
  }
];
