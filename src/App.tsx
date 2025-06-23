import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Resume from './pages/Resume';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="project/:slug" element={<ProjectDetails />} />
                        <Route path="projects" element={<ProjectDetails />} />
                        <Route path="resume" element={<Resume />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;