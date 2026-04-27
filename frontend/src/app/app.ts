import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  menuOpen = false;
  selectedCategory = 'All';

  profile = {
    name: 'Diwakar Kandel',
    role: 'BCA Student | Java Enthusiast | Frontend Developer',
    email: 'kandeldiwakar7@gmail.com',
    location: 'Balkumari - Lalitpur, Nepal',
    status: 'Open to work and startup opportunities',
    cvUrl: '/Diwakar-Kandel-CV.pdf',
    shortIntro:
      'I am a BCA student and aspiring software developer with a focus on building scalable and practical applications using Angular, Java, Spring Boot, and MySQL.',
     };

  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/diwakar-kandel-634844264'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/diwakarkandel'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/emi.diwakar'
    }
  ];

  stats = [
    { value: '4+', label: 'Projects' },
    { value: '10+', label: 'Skills' },
    { value: '4+', label: 'Trainings' },
    { value: '2022', label: 'BCA Started' }
  ];

  skills = [
    { name: 'Java', level: 80 },
    { name: 'OOP', level: 78 },
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 70 },
    { name: 'Angular', level: 60 },
    { name: 'PHP', level: 65 },
    { name: 'MySQL', level: 75 },
    { name: '.NET Framework', level: 55 },
    { name: 'GitHub', level: 70 }
  ];

  visibleSkillStart = 0;
  itemsPerPage = 3;

  constructor() {
    this.updateItemsPerPage();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();

    if (window.innerWidth > 900) {
      this.menuOpen = false;
    }
  }

  updateItemsPerPage() {
    this.itemsPerPage = window.innerWidth <= 760 ? 1 : 3;
  }

  get visibleSkills() {
    return Array.from(
      { length: Math.min(this.itemsPerPage, this.skills.length) },
      (_, index) => this.skills[(this.visibleSkillStart + index) % this.skills.length]
    );
  }

  nextSkills() {
    this.visibleSkillStart =
      (this.visibleSkillStart + this.itemsPerPage) % this.skills.length;
  }

  previousSkills() {
    this.visibleSkillStart =
      (this.visibleSkillStart - this.itemsPerPage + this.skills.length) % this.skills.length;
  }

  categories = ['All', 'Java', 'Frontend', 'Backend', 'Database'];

  projects = [
    {
      title: 'Student Record Management System',
      category: 'Java',
      description:
        'A Java OOP based application to manage student records with add, view, update and delete features.',
      tech: ['Java', 'OOP', 'Console App']
    },
    {
      title: 'Gym Management System',
      category: 'Frontend',
      description:
        'Responsive gym management system using HTML, CSS, JavaScript, PHP and MySQL.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
    },
    {
      title: 'Employee Management System',
      category: 'Database',
      description:
        'Web-based employee management system to manage employee records and perform CRUD operations.',
      tech: ['.NET', 'PHP', 'MySQL', 'JavaScript']
    },
    {
      title: 'EventConnect',
      category: 'Backend',
      description:
        'Event management and ticket booking backend project using Spring Boot and MySQL.',
      tech: ['Java', 'Spring Boot', 'MySQL']
    }
  ];

  education = [
    {
      year: '2022 - Present',
      title: 'Bachelor of Computer Application',
      place: 'Nepal College of Information Technology',
      board: 'Pokhara University'
    },
    {
      year: '2020 - 2022',
      title: '+2 Management',
      place: 'Omega International College',
      board: 'Higher Secondary Level'
    }
  ];

  certifications = [
    'Basic Java Training',
    'Digital Marketing Workshop - NSU, NCIT',
    'Basic .NET Training',
    'Capture The Flag - NOSK'
  ];

  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  successMessage = '';
  errorMessage = '';
  isSending = false;

  get filteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }

    return this.projects.filter(
      project => project.category === this.selectedCategory
    );
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

  async sendMessage() {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.contact.name ||
      !this.contact.email ||
      !this.contact.subject ||
      !this.contact.message
    ) {
      this.errorMessage = 'Please fill all fields first.';
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
        {
          publicKey: 'K8mqh8y4XSenhyiqS'
        }
      );

      this.successMessage = `Thank you ${this.contact.name}, your message has been sent successfully.`;

      this.contact = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.errorMessage = 'Message failed. Please try again later.';
    } finally {
      this.isSending = false;
    }
  }
}