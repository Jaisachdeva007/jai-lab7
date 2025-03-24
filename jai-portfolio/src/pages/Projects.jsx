import { useState, useEffect } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jai-lab7.onrender.com')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Projects</h2>
      <p>Here are some of my key projects in AI, blockchain, and full-stack development.</p>

      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.name}</h3>
            <p><strong>Author:</strong> {project.author}</p>
            <p><strong>Languages:</strong> {project.languages.join(', ')}</p>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
