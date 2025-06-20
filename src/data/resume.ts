export const experience = [
    {
        title: "Senior Analyst",
        company: "Capgemini",
        period: "Aug 2022 – Dec 2023",
        bullets: [
            "Customized Apex triggers, Lightning Web Components and complex role hierarchies that cut client downtime by 15% during Classic-to-Lightning migration",
            "Built custom Salesforce solutions (Apex, LWC) to streamline client ops",
            "Led Lightning migration, cutting downtime 15%",
            "Owned security, roles & integrations across orgs"
        ]
    },
    {
        title: "Founder / Lead Game Developer",
        company: "Astro (Indie Mobile-Game Studio)",
        period: "Mar 2021 – Aug 2022",
        bullets: [
            "Led 5-person team delivering two Unity titles from concept to store launch",
            "Built Tesla Off-Road achieving 100K+ downloads with ★4.5 rating",
            "Shipped X-Blade to App Store with 1K+ installs and 95% crash-free sessions",
            "Owned full release cycle: build automation, store submission, ASO & live-ops"
        ]
    },
    {
        title: "Freelance Unity Developer",
        company: "Fiverr",
        period: "Dec 2020 – Dec 2023",
        bullets: [
            "Ran a top-rated Fiverr Unity studio with perfect 5-star average across 70 projects",
            "Delivered in-app-purchase integrations, ad mediation and live-ops fixes",
            "Delivered 70+ Unity contracts with ad integration & bug fixes",
            "Maintained 5-star rating across all freelance projects"
        ]
    }
];

export const skills = {
    languages: ["Java", "Python", "C", "C#", "HTML", "CSS", "JavaScript"],
    frameworks: [
        "React Native",
        "Expo Router",
        "Redux Toolkit + Persist",
        "Salesforce Lightning",
        "Apex"
    ],
    cloud: [
        "Firebase Storage & Auth",
        "Supabase Auth (Google & Apple SSO)",
        "RevenueCat subscriptions",
        "Expo Notifications push API"
    ],
    design: ["Figma", "Photoshop", "Illustrator", "NativeWind (Tailwind for RN)"]
};

export const projects = [
    {
        name: "JobSculptor — AI-Powered Job-Application Manager",
        slug: "jobsculptor",
        role: "Lead Developer",
        brief: "React Native app with AI cover-letter & resume generator, interview coach, and real-time career advice chat. Releasing Q3 2025.",
        bullets: [
            "AI cover-letter & resume generator with real-time chat for career advice",
            "Interview-question coach with deadline reminders via Expo Notifications",
            "React Native + Expo Router, Supabase, RevenueCat freemium subscriptions",
            "Redux Toolkit + Persist for offline-first functionality",
            "Works offline, syncs seamlessly across devices"
        ],
        tech: ["React Native", "Expo Router", "Supabase", "RevenueCat", "Redux Toolkit", "NativeWind"],
        status: "In Development",
        big: true
    },
    {
        name: "Student Assignment Management System",
        slug: "sams",
        role: "Technical Lead",
        period: "Nov 2021 → Dec 2021",
        brief: "Twin Android apps—one for students, one for faculty—backed by Firebase Authentication and Cloud Storage.",
        bullets: [
            "Eliminated 100% of lockdown-era data-loss risk with cloud workflow",
            "Cut manual paper handling by 40% using Firebase object storage",
            "Real-time database rules secure graded work on spotty campus Wi-Fi",
            "Realtime upload & auth with Firebase"
        ],
        tech: ["Android", "Firebase", "Cloud Storage", "Real-time Database"],
        big: true
    },
    {
        name: "Astro Gamers Website",
        slug: "astro-site",
        role: "Front-end Developer",
        period: "Mar 2021 → Apr 2021",
        brief: "Static HTML/CSS/JS showcase that pulled in 5,000 unique visitors within its first three months.",
        bullets: [
            "Custom Figma layouts translated into responsive flex-grid code",
            "Load times under 1s on 4G with vanilla HTML/CSS/JS",
            "5,000 unique visitors in first three months"
        ],
        url: "https://astro.org.in",
        tech: ["HTML", "CSS", "JavaScript", "Figma"],
        big: false
    },
    {
        name: "Mobile Game Duo — Tesla Off-Road & X-Blade",
        slug: "game-duo",
        role: "Lead Programmer",
        period: "Apr 2020 → Feb 2021",
        brief: "Two Unity titles that surpassed 100,000 combined downloads and earned a 4.5-star Play Store rating.",
        bullets: [
            "100,000+ combined downloads with 4.5-star Play Store rating",
            "Implemented Unity IAP for consumables and Leaderboards for player retention",
            "Co-ordinated five-person art and engineering crew using Agile stand-ups",
            "Integrated ad mediation and live-ops monetization features"
        ],
        tech: ["Unity", "C#", "Unity IAP", "Leaderboards", "Agile"],
        achievements: ["100K+ downloads", "4.5-star rating", "Team leadership"],
        big: true
    }
];

export const professionalProfile = {
    name: "Himanshu Kurapati",
    title: "Game Developer, App Developer, Full-Stack Developer",
    bio: "Himanshu Kurapati is a Salesforce-trained full-stack developer who has shipped production code for enterprise clients at Capgemini, delivered 70-plus freelance Unity contracts, and built mobile, web, and game products that have reached more than 100,000 end-users. His toolbox spans Java, Python, C#, React Native, Firebase, Supabase, and the entire Salesforce Lightning stack, and he blends that technical range with a design-first mindset honed through daily work in Figma and Adobe CC.",
    highlights: [
        "Enterprise impact at Capgemini with 15% downtime reduction during Classic-to-Lightning migration",
        "Top-rated Fiverr Unity studio with perfect 5-star average across 70 projects",
        "Products reaching 100,000+ end-users across mobile, web, and gaming platforms",
        "Design-first mindset with daily Figma and Adobe CC experience"
    ]
}; 