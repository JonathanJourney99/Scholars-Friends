// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer"; 
import JournalServices from "./JournalServices"; 
import ResearchSteps from "./ResearchSteps";
import ResearchTools from "./ResearchTools";
import Home from "./Home"; // Ensure Home component is imported

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isInactive, setIsInactive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/journal?title=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
      setIsInactive(data.status === "Inactive");
      setIsActive(data.status === "Active");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <div 
        className={`App ${darkMode ? 'bg-[#060415] text-white' : 'bg-white text-black'}`} 
        style={{ 
          backgroundImage: darkMode 
            ? 'linear-gradient(160deg, #060415 0%, #0f1f3a 33%, #0b1332 66%, #0b0b34 100%)' 
            : 'linear-gradient(315deg, #f1f1f1 0%, #ffffff 24%, #e0e2ef 49%, #ffffff 75%, #ffffff 100%)'
        }}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Slogan Section */}
        <div className="bg-cover bg-center h-60 flex items-center justify-center">
          <h1 className={`text-5xl font-bold text-center p-6`}>
            Your Trusted Partner<br />for Genuine Research Platforms and Publishers
          </h1>
        </div>

        {/* Centered Search Section */}
        <div className="flex justify-center items-center mt-10">
          <div className="container mx-auto p-10">
            <h2 className="text-2xl font-bold text-center mb-4">SEARCH FOR A JOURNAL</h2>
            <div className="flex items-center justify-center mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Journal Name"
                className={`border rounded-md p-3 w-1/2 mr-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} border-gray-300`}
              />
              <button 
                onClick={handleSearch} 
                className={`rounded-md px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white border border-blue-400`}
              >
                Search
              </button>
            </div>

            {/* Results Section */}
            {results && (
              <div className={`mt-6 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300`}>
                <h2 className="text-lg font-bold">Results:</h2>
                <p><strong>Journal Title:</strong> {results.journal_title}</p>
                <p><strong>ISSN:</strong> {results.issn}</p>
                <p><strong>Publisher:</strong> {results.publisher}</p>
                <p><strong>Status:</strong> {results.status}</p>
              </div>
            )}

            {isInactive && (
              <div className="mt-4 p-4 bg-yellow-100 text-red-800 border border-yellow-300 rounded-md">
                <p><strong>Disclaimer:</strong> This journal is inactive and may not provide the intended services. Please verify the journal's status before proceeding.</p>
              </div>
            )}

            {isActive && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
                <p><strong>Good News!</strong> This journal is currently active.</p>
              </div>
            )}
          </div>
        </div>

        {/* ABOUT US Section */}
        <div 
          className="flex justify-center items-center mt-10" 
          style={{ 
            backgroundImage: darkMode 
              ? 'linear-gradient(160deg, #060415 0%, #0f1f3a 33%, #0b1332 66%, #0b0b34 100%)' 
              : 'linear-gradient(315deg, #cfe3ff 0%, #a7c0f9 100%)' 
          }}
        >
          <div className="container mx-auto text-center p-6">
            <h2 className="text-3xl font-bold mb-10">About Us</h2>
            <div className="flex justify-center gap-10">
              <div className="w-1/3 p-6 rounded-lg shadow-lg bg-gray-900 text-white">
                <p className="text-xl leading-relaxed">
                  Scholars Friend is a freely accessible platform designed for scholars, researchers, publishers, colleges, and universities. Our platform offers a streamlined search with filters for international journals, publishers, and research papers. We developed this portal to provide researchers with a comprehensive source of genuine information about various journals, complete with relevant indexing details. Given that some journals operate irregularly while others may have good indexing but lack responsiveness, our platform serves two key purposes: it provides essential journal information and connects users with published papers.
                </p>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <img 
                  src="/images/img2.jpg" // Replace with your image path
                  alt="About Us"
                  className={`w-3/4 h-auto rounded-lg shadow-lg`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* New Section: Understanding Assessors and Publishers in Research */}
        <div className="container mx-auto mt-10 p-6">
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-black'}`}>Understanding Assessors and Publishers in Research</h2>
          <div className="flex items-center justify-center gap-10 mt-6">
            <div className="w-1/2 p-6 rounded-lg shadow-lg bg-gray-900 text-white">
              <h3 className="text-xl font-bold">Assessors: Ensuring Research Quality</h3>
              <p>
                Assessors evaluate the credibility and quality of journals. They help researchers find trustworthy places to publish.
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>Scopus: High-quality peer-reviewed journals.</li>
                <li>Web of Science: Rigorous journal assessment.</li>
                <li>UGC CARE: Ensures academic standards for Indian scholars.</li>
              </ul>
            </div>
            <img 
              src="/images/IMG3.JPG" // Replace with your image path
              alt="Assessors"
              className={`w-1/3 h-auto rounded-lg shadow-lg`} 
            />
          </div>
          <div className="flex items-center justify-center gap-10 mt-6">
            <img 
              src="/images/IMG4.JPG" // Replace with your image path
              alt="Publishers"
              className={`w-1/3 h-auto rounded-lg shadow-lg`} 
            />
            <div className="w-1/2 p-6 rounded-lg shadow-lg bg-gray-900 text-white">
              <h3 className="text-xl font-bold">Publishers: Bringing Research to Life</h3>
              <p>
                Publishers turn research into published works, ensuring visibility and accessibility.
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>IEEE: Renowned in technology and engineering.</li>
                <li>PubMed: Includes published biomedical research.</li>
                <li>Springer: Leading publisher in science and technology.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application sections */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal-services" element={<JournalServices />} />
          <Route path="/research-steps" element={<ResearchSteps />} />
          <Route path="/researcher-tools" element={<ResearchTools />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
