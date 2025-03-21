import { useState } from 'react';

function About() {
  const skillsData = [
    { name: 'Java', category: 'Programming' },
    { name: 'Python', category: 'Programming' },
    { name: 'PHP', category: 'Programming' },
    { name: 'JavaScript', category: 'Programming' },
    { name: 'C', category: 'Programming' },
    { name: 'React.js', category: 'Frontend' },
    { name: 'HTML & CSS', category: 'Frontend' },
    { name: 'SQL', category: 'Database' },
    { name: 'Git', category: 'Tools' },
    { name: 'VS Code', category: 'Tools' },
    { name: 'IntelliJ', category: 'Tools' },
    { name: 'MySQL Workbench', category: 'Database' },
    { name: 'Unity', category: 'Game Dev' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = skillsData.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container about-container mt-5">
      <h2 className="section-title">About Me</h2>
      <p className="intro-text">
        A 3rd-year Computer Science student at <strong>Dalhousie University</strong>, passionate about Cybersecurity, Artificial Intelligence, and UI/UX. Beyond tech, I’m a sports enthusiast with a background in roller hockey, tennis, and competitive debating.
      </p>

      <hr className="section-divider" />

      <h3 className="section-subtitle">Education</h3>
      <ul className="education-list">
        <li><strong>BSc in Computer Science</strong>, Dalhousie University (2022 - 2026)</li>
      </ul>

      <hr className="section-divider" />

      <h3 className="section-subtitle">Work Experience</h3>

      <div className="experience-card">
        <h4>Research Assistant - Dalhousie University</h4>
        <p><em>2025 - Present</em></p>
        <ul>
          <li>Conducting research on <strong>AI-assisted learning and student engagement models</strong>.</li>
          <li>Developing models to <strong>analyze learning behaviors</strong> and optimize AI-driven tutoring.</li>
        </ul>
      </div>

      <div className="experience-card">
        <h4>Teaching Assistant - CSCI 1105</h4>
        <p><em>2025 - Present</em></p>
        <ul>
          <li>Leading labs for <strong>60+ students</strong>, assisting with <strong>Java programming concepts</strong>.</li>
          <li>Grading assignments and mentoring students in <strong>debugging and problem-solving</strong>.</li>
        </ul>
      </div>

      <div className="experience-card">
        <h4>ITS Client Services - Dalhousie University</h4>
        <p><em>2022 - Present</em></p>
        <ul>
          <li>Resolved over <strong>500+ IT tickets</strong>, helping students and faculty with technical issues.</li>
          <li>Managed computer deployments, including <strong>Azure Join configurations</strong>.</li>
        </ul>
      </div>

      <hr className="section-divider" />

      <h3 className="section-subtitle">Skills & Technologies</h3>

     
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />

        
        <div className="category-buttons">
          {['All', 'Programming', 'Frontend', 'Database', 'Tools', 'Game Dev'].map(category => (
            <button
              key={category}
              className={`btn btn-sm m-1 ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      
      <div className="skills-grid mt-3">
        {filteredSkills.map((skill, idx) => (
          <span key={idx}>{skill.name}</span>
        ))}
      </div>

      <hr className="section-divider" />

      <h3 className="section-subtitle">Volunteer & Leadership</h3>
      <ul className="volunteer-list">
        <li> <strong>VP Internal</strong>, Enactus Dalhousie</li>
        <li> <strong>Founder & President</strong>, Enora Model United Nations</li>
        <li> <strong>Volunteer</strong>, ShiftKey Labs (Hackathons, Game Jams)</li>
      </ul>
    </div>
  );
}

export default About;
