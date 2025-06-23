import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import VSCodeIDE from './VSCodeIDE';
import projectsData from '../../data/projects.json';

const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();

    // If we're on the /projects route (no slug), show all projects with explorer open
    if (location.pathname === '/projects') {
        return <VSCodeIDE keepExplorerOpen={true} />;
    }

    // Find the project by slug for individual project pages
    const project = projectsData.projects.find(p => p.id === slug);

    if (!project && slug) {
        // Only redirect if there's a slug but no matching project
        return <div>Project not found</div>;
    }

    return <VSCodeIDE selectedProjectId={slug} />;
};

export default ProjectDetails; 