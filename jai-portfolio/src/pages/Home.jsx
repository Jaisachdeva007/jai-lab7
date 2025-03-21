import { useState, useEffect } from "react";

function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  return (
    <div className="container home-container text-center mt-5">
      <h1 className="home-title">Jai Sachdeva</h1>
      <p className="lead">Computer Science Student | Researcher | Software Developer</p>

      <p className="intro-text">
        Welcome to my portfolio! I’m a <strong>Computer Science student at Dalhousie University (2022-2026)</strong> with a passion for
        <span className="highlight"> AI-driven learning, cybersecurity, and full-stack development.</span>
      </p>

      <p className="intro-text">
        I specialize in <strong>blockchain security, web development, AI-assisted learning, and VR game development</strong>.
        Oh, and if you ever need someone to debug your code or destroy you in a debate —I’m your guy.
      </p>

      <hr className="section-divider" />

      <h3 className="section-subtitle"> What I Do</h3>
      <ul className="features-list">
        <li>Software Development - Building secure, scalable applications in React, Java, and Python.</li>
        <li>Blockchain & Cybersecurity - Researching secure authentication models & decentralized applications.</li>
        <li>MUN & Public Speaking - Over 200+ MUN experiences as a delegate, executive board, and organizer.</li>
        <li>AI & Machine Learning - Leveraging AI for whale sound denoising, student engagement models, and automation.</li>
      </ul>

      <h3 className="section-subtitle"> Explore My Work</h3>
      <p>
        Check out my <a href="/projects" className="highlight-link">projects</a> and <a href="/about" className="highlight-link">learn more about me</a>.
        If you like what you see, let’s collaborate and build something awesome!
      </p>

      <hr className="section-divider" />

      <h3 className="section-subtitle"> A Little Joke</h3>
      <p className="joke-text">
        Why did the JavaScript developer go broke? <br />
        <strong>Because he kept using "undefined" as his salary!</strong>
      </p>

      {weather && (
        <div className="weather-box mt-4">
          <h4 className="section-subtitle">🌤️ Weather in {weather.city}</h4>
          <p className="intro-text">
            Temperature: <strong>{weather.temperature}°C</strong><br />
            Humidity: <strong>{weather.humidity}%</strong><br />
            Description: <em>{weather.description}</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
