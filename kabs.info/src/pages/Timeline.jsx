import React, { useEffect, useState } from "react";

import completed_icon from '../assets/icons8-task-completed-50.png'
import idea_icon from '../assets/icons8-idea-50.png'




function Timeline() {
  const [isLoading, setIsLoading] = useState(false); // manage loading status
  const [projectTimeline, setProjectTimeline] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [yearList, setYearList] = useState([]);
  // const apiUrl = 'https://kabs-info-backend.onrender.com';

  const apiUrl = import.meta.env.MODE === 'production'
  ? 'https://kabs-info-backend.onrender.com'
  : '/api';

  // fetch projects
  useEffect(() => {
    getProjects();
  }, []);

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

      var projectsByYearAndMonth = {};

      data.forEach((project) => {
        // extract the year and month from the project's date or completion date
        const started = new Date(project.date);
        const ended = project.completed ? new Date(project.completed) : null; // Project completion date, if available

        // get year and month of the start date
        const startYear = started.getFullYear().toString();
        const startMonth = (started.getMonth() + 1).toString().padStart(2, '0');
        // console.log(startYear);
        // add project to the start date's year and month
        if (!projectsByYearAndMonth[startYear]) {
          projectsByYearAndMonth[startYear] = {
            "01": [], "02": [], "03": [], "04": [], "05": [], "06": [],
            "07": [], "08": [], "09": [], "10": [], "11": [], "12": []
          };
        }
        projectsByYearAndMonth[startYear][startMonth].push({ ...project, type: 'Started' });
        // if the project has an end date, add it to the end date's year and month
        if (ended) {
          const endYear = ended.getFullYear().toString();
          const endMonth = (ended.getMonth() + 1).toString().padStart(2, '0');

          // initialize the year if it doesn't exist for the completion date
          if (!projectsByYearAndMonth[endYear]) {
            projectsByYearAndMonth[endYear] = {
              "01": [], "02": [], "03": [], "04": [], "05": [], "06": [],
              "07": [], "08": [], "09": [], "10": [], "11": [], "12": []
            };
          }

          projectsByYearAndMonth[endYear][endMonth].push({ ...project, type: 'Completed' });
        }
      });

      // set state
      setProjectTimeline(projectsByYearAndMonth);
      // console.log(Object.keys(projectsByYearAndMonth));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // set loading to false regardless of success or failure
    }
  };
  console.log(projectTimeline[currentYear]);

  const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  return (
    <>
      <div className='flex w-full h-auto justify-center p-4'>
        <div className='flex flex-col items-center w-full md:w-[80%] lg:w-[50%] gap-y-8'>
          <div className="select-none flex flex-wrap text-sm gap-x-4 gap-y-2 -mt-2 -mb-2">
            {Object.keys(projectTimeline).map((year, index) => (
              <p key={index} 
              className={`cursor-pointer px-2 py-1 rounded-2xl hover:bg-[#979799] ${year == currentYear ? 'bg-[#b5c0cf]' : 'bg-[#E8E8E8]'}`}
              onClick={() => year == currentYear ? setCurrentYear(currentYear) : setCurrentYear(year)}>{year}</p>
            ))}
          </div>
          {/* year */}
          {projectTimeline && Object.keys(projectTimeline).length > 0 && (
            <>
              {Object.entries(projectTimeline[currentYear])
                .sort(([monthB], [monthA]) => Number(monthA) - Number(monthB)) // sort numerically in descending order
                .map(([month, projects]) => (
                  <>
                    {projects.length > 0 && (
                      <>
                        <div key={month} className="w-[90%] px-2 font-bold">
                          <div>{months[Number(month) - 1]}</div>
                        </div>
                        {projects.map((project, index) => (
                          <div key={index} className='flex items-center w-[90%] h-auto shadow-md -mt-6 py-4 px-6 rounded-2xl'>
                            <img src={project.type == 'Completed' ? completed_icon : idea_icon}></img>
                            <div className="flex flex-col justify-center">
                              <div className="flex px-4 gap-x-2">
                                <p className={`font-bold  ${project.type == 'Completed' ? 'text-[#45BA74]' : 'text-[#BA9245]'}`}>
                                  {project.type == 'Completed' ? 'Completed a project:' : 'Started a new project:'}
                                </p>
                                <p className="blue-text font-semibold">{project.projectTitle}</p>
                              </div>
                              <p className="px-4 text-sm">
                              {new Date(project.type == 'Completed' ? project.completed : project.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                              })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Timeline