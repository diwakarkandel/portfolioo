import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

interface Project {
  title: string;
  role: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
}

interface Education {
  year: string;
  title: string;
  place: string;
  board: string;
}

interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  points: string[];
  tech: string[];
  current?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  menuOpen = false;
  scrolled = false;
  activeSection = 'home';
  selectedCategory = 'All';
  theme: 'dark' | 'light' = 'dark';

  navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

  profile = {
    name: 'Diwakar Kandel',
    firstName: 'Diwakar',
    lastName: 'Kandel',
    initials: 'DK',
    role: 'Java & Spring Boot Developer',
    tagline: 'Full-Stack Engineer',
    email: 'kandeldiwakar7@gmail.com',
    phone: '+977 986-748-3724',
    location: 'Balkumari, Lalitpur, Nepal',
    status: 'Open to work & traineeship opportunities',
    cvUrl: 'Diwakar-Kandel-CV.pdf',
    summary:
      'Final-year BCA student at Nepal College of Information Technology (Pokhara University) with hands-on experience in Java and Spring Boot backend development, gained through a fintech internship at eSewa. I build RESTful APIs, apply Object-Oriented Programming principles, and design relational databases with SQL and PostgreSQL — with a commitment to writing clean, maintainable code.'
  };

  socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/diwakarkandel', icon: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com/diwakarkandel', icon: 'github' },
    { name: 'Email', url: 'mailto:kandeldiwakar7@gmail.com', icon: 'mail' }
  ];

  stats = [
    { value: '6', label: 'Projects Built' },
    { value: '2', label: 'Internships' },
    { value: '10+', label: 'Technologies' },
    { value: '2026', label: 'BCA Graduate' }
  ];

  strengths = [
    'Fast learner who adapts quickly to new technologies and unfamiliar codebases.',
    'Clear communicator, comfortable in cross-functional teams with technical and non-technical stakeholders.',
    'Proactive problem-solver with a positive attitude toward debugging and continuous improvement.'
  ];

  skillGroups: SkillGroup[] = [
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Java', 'Spring Boot', 'RESTful APIs', 'OOP', 'JWT Authentication']
    },
    {
      category: 'Databases',
      icon: '🗄️',
      skills: ['PostgreSQL', 'MySQL', 'SQL', 'Relational Schema Design']
    },
    {
      category: 'Frontend',
      icon: '🎨',
      skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      category: 'Languages & Tools',
      icon: '🧰',
      skills: ['PHP', 'C Programming', 'Git', 'Webpack']
    }
  ];

  categories = ['All', 'Java & Spring', 'PHP & MySQL', 'C'];

  projects: Project[] = [
    {
      title: 'SmartShop',
      role: 'Full-Stack Developer',
      category: 'Java & Spring',
      description:
        'A multi-branch retail management system covering POS, inventory, purchases, sales, returns, stock transfers, expenses and reporting. Built on a Spring Boot backend with a TypeScript frontend and per-branch reporting.',
      tech: ['Java', 'Spring Boot', 'TypeScript', 'REST APIs'],
      link: 'https://github.com/diwakarkandel/smartshop'
    },
    {
      title: 'EventConnect',
      role: 'Backend & Database Lead',
      category: 'Java & Spring',
      description:
        'Architected the entire backend for an event ticketing, booking & management platform — RESTful API design for event creation, ticket booking, JWT authentication and role-based access (Admin, Organizer, Attendee). Designed the PostgreSQL schema and implemented core booking workflows.',
      tech: ['Spring Boot', 'React.js', 'PostgreSQL', 'REST APIs', 'JWT'],
      link: 'https://github.com/diwakarkandel/event-connect'
    },
    {
      title: 'Student Record Management System',
      role: 'Solo Project',
      category: 'Java & Spring',
      description:
        'Full-stack application with a Spring Boot REST API backend and a React.js frontend. Implemented complete CRUD operations for student records, applying core OOP principles to keep the codebase clean and maintainable.',
      tech: ['Java', 'Spring Boot', 'React.js', 'OOP']
    },
    {
      title: 'GymPal — Gym Management System',
      role: 'Database & Backend Developer',
      category: 'PHP & MySQL',
      description:
        'Designed the MySQL relational schema from scratch — members, membership plans, payments and attendance — and developed all backend logic in PHP (registration, renewal, payment tracking) using secure query practices to prevent SQL injection.',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Employee Management System',
      role: 'Solo Project',
      category: 'PHP & MySQL',
      description:
        'A complete web-based employee records system with full CRUD functionality and a clean UI. Manages personal details, department assignment and role information through a straightforward PHP/MySQL backend.',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Employee ID Record System',
      role: 'Solo Project',
      category: 'C',
      description:
        'A menu-driven C console application for recording, searching, updating and deleting employee identification data using file handling and structured data management.',
      tech: ['C Programming', 'File Handling', 'Data Structures']
    }
  ];

  experiences: Experience[] = [
    {
      role: 'Java Backend Development Intern',
      company: 'eSewa (Fintech)',
      duration: 'Feb 2026 – Jun 2026',
      current: true,
      points: [
        'Developed and maintained backend services and RESTful APIs for a live fintech platform using Core Java and Spring Boot.',
        'Followed industry best practices — OOP design patterns, clean code principles and version control with Git.',
        'Collaborated with the team on sprint-based tasks, participating in code reviews and technical discussions.',
        'Gained practical exposure to production-grade backend architecture and API integration in the payments domain.'
      ],
      tech: ['Java', 'Spring Boot', 'REST APIs', 'Git']
    },
    {
      role: 'Technical Support Intern',
      company: 'Foreign Employment Board Secretariat (GoN)',
      duration: 'Dec 2024 – Jun 2025',
      points: [
        'Provided day-to-day technical support to government staff, resolving hardware and software issues across the IT infrastructure.',
        'Assisted in maintaining and troubleshooting systems, networks and internal tools in a structured government setting.',
        'Strengthened communication and documentation skills by working directly with non-technical users.'
      ],
      tech: ['IT Support', 'Networking', 'Troubleshooting']
    }
  ];

  education: Education[] = [
    {
      year: '2022 – 2026 (Expected)',
      title: 'Bachelor of Computer Application (BCA)',
      place: 'Nepal College of Information Technology',
      board: 'Pokhara University'
    },
    {
      year: '2020 – 2022',
      title: '+2 Management',
      place: 'Omega International College',
      board: 'Higher Secondary Level'
    }
  ];

  certifications = [
    { title: 'Capture the Flag (CTF) Competition', place: 'NOSK', date: 'September 2024' },
    { title: 'Digital Marketing Workshop', place: 'NSU, NCIT', date: 'June 2025' },
    { title: 'Core Java & .NET Foundations', place: 'Nepal College of Information Technology', date: 'Coursework' }
  ];

  contact = { name: '', email: '', subject: '', message: '' };
  successMessage = '';
  errorMessage = '';
  isSending = false;

  ngOnInit() {
    this.loadTheme();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 40;
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 900) {
      this.menuOpen = false;
    }
  }

  updateActiveSection() {
    const offset = window.scrollY + 140;
    for (const id of this.navItems.map(n => n.toLowerCase())) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= offset && el.offsetTop + el.offsetHeight > offset) {
        this.activeSection = id;
        return;
      }
    }
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', this.theme);
    } catch {}
  }

  loadTheme() {
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved) {
        this.theme = saved;
      }
    } catch {}
  }

  async sendMessage() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.contact.name || !this.contact.email || !this.contact.subject || !this.contact.message) {
      this.errorMessage = 'Please fill in all fields before sending.';
      return;
    }

    this.isSending = true;

    try {
      await emailjs.send(
        'service_ysn4zxi',
        'template_qdopat3',
        {
          from_name: this.contact.name,
          from_email: this.contact.email,
          subject: this.contact.subject,
          message: this.contact.message,
          time: new Date().toLocaleString(),
          to_email: this.profile.email
        },
        { publicKey: 'K8mqh8y4XSenhyiqS' }
      );

      this.successMessage = `Thank you ${this.contact.name}! Your message has been sent successfully.`;
      this.contact = { name: '', email: '', subject: '', message: '' };
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.errorMessage = 'Message failed to send. Please email me directly instead.';
    } finally {
      this.isSending = false;
    }
  }
}
