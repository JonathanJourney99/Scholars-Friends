// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our App!</h1>
      <p>
        This application provides various services related to research and journaling.
        Explore the features and make the most of your experience!
      </p>
      
      <h2>Explore Our Services</h2>
      <ul>
        <li>
          <Link to="/journal-services">Journal Services</Link>
        </li>
        <li>
          <Link to="/researcher-tools">Researcher Tools</Link>
        </li>
        <li>
          <Link to="/research-steps">Research Steps</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
