// All portfolio content that is rendered from data lives here.
// Edit text in this file to update the Experience and Projects sections.

export const jobs = [
  {
    title: 'Front-End Developer Intern',
    company: 'Caterpillar Slovakia s.r.o — Summer Internship',
    location: 'Košice, Slovakia',
    period: 'June 2026 - Present',
    logo: '/img/caterpillar.png',
    description:
      'Part of the CatDigital Slovakia team, working on Cat.AI — an AI assistant being built for integration across all Caterpillar applications.',
    highlights: [
      'Develop and implement front-end features in React',
      'Translate designs and requirements into user-friendly interfaces',
      'Collaborate with developers and the broader product team',
      'Contribute to a project with real, global impact',
    ],
    current: true,
  },
  {
    title: 'Web & Application Tester',
    company: 'Dôvera zdravotná poisťovňa',
    location: 'Košice, Slovakia',
    period: 'April 2026 - Present',
    logo: '/img/dovera.png',
    description:
      'Part of an agile team called Služby poistencom (Services for Insured Clients), focused on testing mobile and web applications to ensure high software quality.',
    highlights: [
      'Use Jira to track and report bugs across mobile and web platforms',
      'Work with SQL and data analysis tools to investigate issues and identify patterns',
      'Understand frontend/backend interactions to accurately assign and verify issues',
      'Collaborate closely with developers and analysts to deliver data-driven quality improvements',
    ],
    current: true,
  },
  {
    title: 'Sales Representative',
    company: 'Art&Cream Čerhov',
    location: 'Čerhov, Slovakia',
    period: '2022 - 2025',
    logo: '/img/artcream.png',
    description:
      'Managed sales operations and customer relations in a dynamic retail environment, serving both local and international clientele.',
    highlights: [
      'Handled financial transactions with accuracy and efficiency',
      'Provided excellent customer service to international clients',
      'Contributed to team sales goals and process improvements',
      'Developed strong communication skills across language barriers',
    ],
    current: false,
  },
];

export const projects = [
  {
    id: 'space-voyager',
    title: 'Space Voyager',
    role: 'Lead Developer (Mobile & Cloud Integration)',
    shortDescription:
      'A sophisticated 2D arcade shooter for Android showcasing high-performance mobile development and real-time backend synchronization.',
    logo: '/img/spacevoyager.png',
    colors: ['#4F46E5', '#7E22CE'],
    overview:
      'As a student of Business Informatics at FEI TUKE, I set out to bridge the gap between low-level hardware interaction and modern cloud scalability. Space Voyager is a sophisticated 2D arcade shooter for Android that serves as a technical showcase of high-performance mobile development and real-time backend synchronization.',
    achievements: [
      'Accomplished a fully functional 2D arcade shooter for Android, featuring a dynamic mission system and three adaptive difficulty levels that scale game velocity based on player performance.',
      'Engineered a real-time global leaderboard using Firebase Firestore, achieving sub-second latency in score updates and secure player authentication via Email and Google OAuth.',
      'Integrated live celestial data by utilizing the Volley library to fetch real-time ISS position data from the open-notify.org REST API, adding a layer of educational realism to the gameplay.',
    ],
    technicalDetails: [
      { title: 'Graphics & Logic', description: 'Built a custom rendering engine using the SpaceView class and Android Canvas, managed by a precise Game Loop for fluid 60FPS performance.' },
      { title: 'Hardware Sensors', description: 'Implemented immersive ship control by mapping accelerometer data to in-game movement, allowing players to navigate by tilting their device.' },
      { title: 'Cloud Architecture', description: 'Managed multimedia assets via Firebase Storage and executed complex CRUD operations to ensure a scalable, data-driven user experience.' },
    ],
    githubLink: 'https://github.com/alzbetajaksova-ux/SpaceVoyager',
  },
  {
    id: 'saveeats',
    title: 'SaveEats',
    role: 'Project Manager & System Architect',
    shortDescription:
      'An AI-powered concept for Samsung smart fridges designed to combat global food waste through IoT integration.',
    logo: '/img/saveeats.png',
    colors: ['#22C55E', '#059669'],
    overview:
      'SaveEats is a high-level business concept and technical framework designed to combat global food waste through AI and IoT integration. Developed for the Samsung smart refrigerator ecosystem, this project involved moving from a raw idea to a €108,220 investment-ready business plan tailored for the Samsung NEXT (Q Fun fund) incubator.',
    achievements: [
      'Orchestrated a comprehensive project framework valued at over €108k, validated by a 40+ page technical specification and a rigorous financial audit covering payroll, material, and consulting costs.',
      'Identified a critical market gap using SWOT analysis and stakeholder mapping, resulting in a solution that balances cost control, waste reduction, and consumer time-savings.',
      'Optimized development timelines by identifying the critical path via PERT charts, ensuring the seamless integration of barcode scanning hardware and AI-driven recipe logic.',
    ],
    technicalDetails: [
      { title: 'System Decomposition', description: 'Performed a detailed Work Breakdown Structure (WBS) to segment the project into modules: Retail Partnerships (Lidl, Kaufland, Tesco), Software Engineering (AI expiration monitoring), and Marketing.' },
      { title: 'AI Logic', description: 'Conceptualized an AI engine that scans barcodes, tracks expiration dates, and generates spending statistics to optimize household efficiency.' },
      { title: 'Team Coordination', description: 'Established communication flows and meeting schedules between developers and project managers to mitigate risks identified in the preliminary risk assessment.' },
    ],
  },
  {
    id: 'smarter-home',
    title: 'Smarter Home',
    role: 'Technology Analyst & Concept Designer',
    shortDescription:
      'An AI-driven accessibility concept focused on making smart homes inclusive for seniors and people with disabilities.',
    logo: '/img/smarterhome.png',
    colors: ['#06B6D4', '#0D9488'],
    overview:
      'In this project, I moved beyond standard academic requirements to conduct a deep-dive analysis of the Smart Home market. The goal was to evaluate existing ecosystems—Google Home, Apple HomeKit, and Samsung SmartThings—and propose a superior, inclusive alternative: SMARTER HOME.',
    achievements: [
      'Executed a multi-platform ecosystem audit, ranking Samsung SmartThings as the industry leader due to its open-system architecture and superior third-party device compatibility.',
      'Architected a high-impact inclusive framework specifically designed for seniors and people with disabilities, transforming smart technology from a barrier into a daily assistant.',
      'Proposed a sustainable business model that includes a 48-hour professional service guarantee and the use of recyclable materials for hardware, reducing the ecological footprint of consumer electronics.',
    ],
    technicalDetails: [
      { title: 'UX/UI Design', description: 'Developed a conceptual UI/UX tailored for accessibility, focusing on simplified controls and high-contrast interfaces for disadvantaged users.' },
      { title: 'Strategic Research', description: 'Conducted a security and compatibility analysis across major APIs to identify vulnerabilities and user experience bottlenecks in current market offerings.' },
      { title: 'Industry Integration', description: 'Outlined a collaboration model involving hospitals and research centers to ensure the technology stays grounded in real-world medical and accessibility needs.' },
    ],
  },
  {
    id: 'career-compass-ai',
    title: 'CareerCompass AI',
    role: 'Full-Stack Developer & Data Engineer',
    shortDescription:
      'An intelligent platform that transforms unstructured Slovak IT job ads into clear career market data using AI and automated scraping.',
    logo: '/img/careercompass.png',
    colors: ['#0EA5E9', '#4F46E5'],
    overview:
      'IT job seekers in the Slovak market face non-transparent salaries, inconsistent skill definitions, and a rapidly shifting landscape. CareerCompass AI tackles all three using a fully automated data pipeline powered by Playwright scraping, Gemma 3 AI analysis, and an interactive Streamlit dashboard—giving users real-time career intelligence updated twice a week.',
    achievements: [
      'Built a fully automated CI/CD data pipeline using GitHub Actions that scrapes Profesia.sk twice weekly (Wednesday & Saturday), processing hundreds of job ads per cycle without manual intervention.',
      "Integrated Google's Gemma 3 LLM to extract structured skills, categorize positions, and clean unstructured ad text into JSON—transforming raw data into actionable market intelligence.",
      'Developed an interactive Streamlit dashboard featuring a Technology Demand tracker, Salary Map by role and seniority, and an AI-powered Salary Predictor based on user experience input.',
      'Deployed the full application on Streamlit Cloud with DuckDB & SQLite as the analytical backend, ensuring fast queries over hundreds of aggregated job records.',
    ],
    technicalDetails: [
      { title: 'AI & NLP', description: 'Leveraged Gemma 3 (Google AI) for advanced natural language processing—extracting skills, normalizing job titles, and converting messy ad text into clean JSON data.' },
      { title: 'Scraping & Automation', description: 'Used Playwright for headless browser scraping of Profesia.sk IT listings, orchestrated by GitHub Actions for fully hands-off bi-weekly data refresh.' },
      { title: 'Data & Visualization', description: 'Stored processed data in DuckDB & SQLite and visualized insights with Plotly inside a Streamlit web app, including interactive salary and skills charts.' },
    ],
    githubLink: 'https://github.com/alzbetajaksova-ux/career-compass-ai',
  },
];
