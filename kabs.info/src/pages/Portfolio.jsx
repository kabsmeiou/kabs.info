import React, { useEffect, useState } from "react";

import goToLink from '../assets/icons8-external-link-12.png'

function Portfolio() {
  const [projects, setProjects] = useState([]); // hold the list of projects
  const [isLoading, setIsLoading] = useState(false); // manage loading status
  const [error, setError] = useState(null); // manage errors
  const [filter, setFilter] = useState(null); // for filters
  const apiUrl = import.meta.env.MODE === 'production'
  ? 'https://kabs-info-backend.onrender.com'
  : '/api';

  // get the list of projects, add filter state as one of the triggers
  useEffect(() => {
    getProjects();
  }, [filter]);

  // fetch projects
  const getProjects = async () => {
    setIsLoading(true);
    const path = `${apiUrl}/projects/`;
    console.log(path);

    try {
      const res = await fetch(path, {
        method: "GET",
      }); 

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      var data = await res.json();
      console.log(projects);
      if (filter != null) {
        // filter data if viewer has clicked a skill tag among the options
        data = data.filter(project => project.skillTags.includes(filter));
      }
      setProjects(data); // assuming data is an array of projects
    } catch (error) {
      console.error(error);
      setError(error.message); // set error state if fetch fails
    } finally {
      setIsLoading(false); // set loading to false regardless of success or failure
    }
  };

  const filters = ['Web-dev', 'Completed', 'Ongoing']

  return (
    <div className='flex w-full h-auto justify-center p-4 overflow-auto'>
      <div className='inter flex flex-col w-full items-center md:w-[80%] lg:w-[50%] gap-y-4'>
        <div className="select-none flex flex-wrap text-sm gap-x-4 gap-y-2 -mt-2 -mb-2">
        {/* list of filters */}
          {filters.map((skill, index) => (
            <p key={index} 
            className={`cursor-pointer px-2 py-1 rounded-2xl hover:bg-[#979799] ${filter == skill ? 'bg-[#b5c0cf]' : 'bg-[#E8E8E8]'}`}
            onClick={() => filter == skill ? setFilter(null) : setFilter(skill)}>{skill}</p>
          ))}
        </div>
        {projects.map((project, index) => (
          <div key={index} className='w-[90%] h-auto shadow-md py-6 px-8 rounded-2xl'>
            <p className='blue-text text-xl font-bold'>
              {project.projectTitle}
            </p>
            <p className='opacity-75 text-base mt-2'>
              {project.description}
            </p>
            <div className="blue-text flex items-center gap-x-1 mt-1">
              <a href={project.projectLink} target="_blank" className="links text-xs">Check it out at Github</a>
              <img className="w-3 h-3" src={goToLink} alt="LinkTo"></img>
            </div>
            <div className="flex flex-wrap gap-2 text-xs mt-4">
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