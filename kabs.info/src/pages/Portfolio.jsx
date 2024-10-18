import React, { useEffect, useState } from "react";

import goToLink from '../assets/icons8-external-link-12.png'

function Portfolio() {
  const [projects, setProjects] = useState([]); // hold the list of projects
  const [isLoading, setIsLoading] = useState(false); // manage loading status
  const [error, setError] = useState(null); // manage errors

  // get the list of projects
  useEffect(() => {
    getProjects();
  }, []);

  // fetch projects
  const getProjects = async () => {
    setIsLoading(true);
    const path = "/api/projects/";
    console.log(path);

    try {
      const res = await fetch(path, {
        method: "GET",
      }); 

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setProjects(data); // assuming data is an array of projects
      console.log(projects);
    } catch (error) {
      console.error(error);
      setError(error.message); // set error state if fetch fails
    } finally {
      setIsLoading(false); // set loading to false regardless of success or failure
    }
  };


  return (
    <div className='flex w-full h-auto justify-center p-4'>
      <div className='flex flex-col w-full items-center md:w-[80%] lg:w-[50%] gap-y-8'>
        {projects.map((project, index) => (
          <div key={index} className='w-[90%] h-auto shadow-md p-4'>
            <p className='blue-text text-lg font-semibold'>
              {project.projectTitle}
            </p>
            <p className='opacity-75 mt-1'>
              {project.description}
            </p>
            <div className="blue-text flex items-center gap-x-1">
              <a href={project.projectLink} target="_blank" className="links text-xs">Check it out at Github</a>
              <img className="w-3 h-3" src={goToLink} alt="LinkTo"></img>
            </div>
            <div className="flex flex-wrap gap-x-2 text-xs mt-2">
            {/* 
              loop through the skills 
            */}
              {project.skillTags.map((skill, index) => (
                <p key={index} className="px-2 py-1 bg-[#E8E8E8] rounded-2xl">{skill}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio