"use client";
import { useState, useEffect, useRef } from 'react'
import './globals.css';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import dynamic from 'next/dynamic';


const DynamicImage = dynamic(() => import('next/image'), { ssr: false });

export default function Home() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  const projects = [
    { title: "Simple Calculator", description: "This is Simple Calculator which is create by next.js." },
    { title: "ATM Machine", description: "This is a next base project in which we use the counter all the condition use in ATM machine" },
    { title: "TODO", description: "A React-based task manager with drag-and-drop functionality." },
    { title: "Resume", description: "A Resume using React.js Crurriculam Vitae." },
  ]

  const skills = ["React", "JavaScript", "HTML", "CSS", "Node.js", "Git"]

  interface AnimatedSectionProps {
    children: React.ReactNode; // To support any valid React children
    className?: string; // Optional className
    id?: string; // Optional id prop
  }

  const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', id }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  
    // Check if id is a valid string
    if (typeof id !== 'string') {
      console.warn('Invalid id prop:', id);
    }
  
    return (
      <section id={id} ref={sectionRef} className={`animate-section ${isVisible ? 'is-visible' : ''} ${className}`}>
        {children}
      </section>
    );
  };
  

return (
  <div className="portfolio">
    <header>
      <div className="container">
        <h1>Sobia</h1>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#about-s" onClick={toggleMenu}>About</a></li>
            <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
            <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>

      <AnimatedSection id="about-s">
        <div className="container">
          <div className="profile-info">
          <DynamicImage
      src="/profile.jpg"
      alt="Profile Image"
      width={500}
      height={300}
      layout="intrinsic"
    />
          </div>
          <div className="info">
            <h2>About Me</h2>
            <p>Passionate Full Stack Web Developer with 5+ years of experience crafting responsive and user-friendly web applications. I thrive on turning complex problems into elegant, efficient solutions. My expertise spans from front-end finesse to back-end robustness, always with an eye on emerging technologies and best practices.</p>
          </div>
          
        </div>
      </AnimatedSection>

      <AnimatedSection id="skills">
        <div className="container">
          <h2>Skills</h2>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} style={{animationDelay: `${index * 0.1}s`}}>{skill}</li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" style={{animationDelay: `${index * 0.2}s`}}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="project-btn">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact">
        <div className="container">
          <h2>Contact Me</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </AnimatedSection>
    </main>

    <footer>
      <div className="container">
        <p>&copy; 2024 Sobia. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="mailto:jane@example.com" aria-label="Email">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </footer>

  </div>
)
}
