import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
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
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;