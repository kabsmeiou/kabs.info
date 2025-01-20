import React, { useEffect, useState } from "react";

import goToLink from '../assets/icons8-external-link-12.png'

function Portfolio() {
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [filter, setFilter] = React.useState(null);
  const apiUrl = import.meta.env.MODE === 'production'
    ? 'https://kabs-info-backend.onrender.com'
    : '/api';

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiUrl}/projects/`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const sortedProjects = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setProjects(filter ? sortedProjects.filter((p) => p.skillTags.includes(filter)) : sortedProjects);
        console.log(projects);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [apiUrl, filter]);

  const filters = ['Web-dev', 'Machine Learning'].sort();

  return (
    <div className="flex w-full h-auto justify-center p-4 overflow-auto">
      <div className="inter flex flex-col w-full items-center md:w-[80%] lg:w-[50%] gap-y-4">
        <div className="select-none flex flex-wrap text-sm gap-x-4 gap-y-2 -mt-2 -mb-2">
          {filters.map((skill) => (
            <p
              key={skill}
              className={`cursor-pointer px-2 py-1 rounded-2xl hover:bg-[#979799] ${
                filter === skill ? 'bg-[#b5c0cf]' : 'bg-[#E8E8E8]'
              }`}
              onClick={() => setFilter(filter === skill ? null : skill)}
            >
              {skill}
            </p>
          ))}
        </div>
        {projects.map((project) => (
          <div
            key={project.projectTitle}
            className="w-[90%] h-auto shadow-md py-6 px-8 rounded-2xl"
          >
            <p className="blue-text text-xl font-bold">{project.projectTitle}</p>
            <p className="opacity-75 text-base mt-2">{project.description}</p>
            <div className="blue-text flex items-center gap-x-1 mt-1">
              <a
                href={project.projectLink}
                target="_blank"
                className="links text-xs"
              >
                Check it out at Github
              </a>
              <img
                className="w-3 h-3"
                src={goToLink}
                alt="LinkTo"
              />
            </div>
            <div className="flex flex-wrap gap-2 text-xs mt-4">
              {project.skillTags
                .filter((skill) => !(skill === 'Completed' || skill === 'Ongoing'))
                .map((skill) => (
                  <p key={skill} className="px-2 py-1 bg-[#E8E8E8] rounded-2xl">
                    {skill}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio