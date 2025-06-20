import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Stack from '../components/Stack';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Stack />
            <Projects />
            <Experience />
            <Contact />
        </>
    );
};

export default Home; 