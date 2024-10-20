import React, { useEffect, useState } from "react";

function Timeline() {
  const [isLoading, setIsLoading] = useState(false); // manage loading status
  const [projectTimeline, setProjectTimeline] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());

  // fetch projects
  useEffect(() => {
    getProjects();
  }, []);

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
      // console.log(projectsByYearAndMonth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // set loading to false regardless of success or failure
    }
  };
  console.log(projectTimeline[currentYear]);
  return (
    <>
      <div className='flex w-full h-auto justify-center p-4'>
        <div className='flex flex-col items-center w-full md:w-[80%] lg:w-[50%] gap-y-8'>
          {/* year */}
          {projectTimeline && Object.keys(projectTimeline).length > 0 && (
            <>
              {Object.entries(projectTimeline[currentYear])
                .sort(([monthB], [monthA]) => Number(monthA) - Number(monthB)) // Sort numerically in descending order
                .map(([month, projects]) => (
                  <>
                    {projects.length > 0 && (
                      <>
                        <div key={month}>{Number(month) - 1}</div>
                        {projects.map((project, index) => (
                          <div key={index} className='w-[90%] h-auto shadow-md py-6 px-8 rounded-2xl'>
                            {project.projectTitle} - {project.type}
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