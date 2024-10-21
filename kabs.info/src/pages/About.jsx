import React, { useEffect, useState } from "react";

function About() {
  const [isLoading, setIsLoading] = useState(false); // manage loading status
  const [skillTags, setSkillTags] = useState([]); // for unique skill tags
  const apiUrl = 'https://kabs-info-backend.onrender.com';

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
      // store unique skill tags in useState
      const uniqueSkillTags = await [
        ...new Set(
          data
            .flatMap((project) => project.skillTags) // extract all skill tags
            .filter(tag => (tag !== 'Completed' && tag !== 'Ongoing')) // exclude specific tags
        )
      ];
      // console.log(uniqueSkillTags.filter(tag => tag != 'Completed'));
      setSkillTags(uniqueSkillTags);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // set loading to false regardless of success or failure
    }
  };

  return (
    <>
      <div className='flex w-full h-auto justify-center p-4'>
        <div className='flex flex-col w-full md:w-[80%] lg:w-[50%] gap-y-8'>
          <div className='flex flex-col gap-y-4'>
          {/* This is the about me section */}
            <p className='text-lg md:text-xl font-bold'>
              About me
            </p>
            <p className='md:text-sm opacity-75 text-xs'>
              I’m currently a 3rd Year Computer Science student in Ateneo de Naga University. I am an INTJ. I enjoy problem-solving, which is why I participate in competitive programming competitions quite often. Other than programming, I play the piano from time to time, engage in contact sports such as basketball, and play chess. Right now, I am learning about Machine Learning. I am aspiring to be a great Machine Learning Engineer.
            </p>
          </div>
          {/* This is the education section */}
          <div className='flex flex-col gap-y-4'>
            <p className='text-lg md:text-xl font-bold'>
                Education
            </p>
            <div className='flex flex-col gap-y-2'>
              <p className='font-semibold'>
                Ateneo de Naga University
              </p>
              <p className='opacity-75 text-sm'>
                2022 - 2026
              </p>
              <p className='opacity-75 text-sm'>
                Studying B.S. Computer Science from Ateneo de Naga University College of Computer Studies.
              </p>
            </div>
            <div className='sm:text-sm flex flex-col gap-y-2'>
              <p className='font-semibold'>
                University of Nueva Caceres
              </p>
              <p className='opacity-75 text-sm'>
                2020 - 2022
              </p>
              <p className='opacity-75 text-sm'>
                Studied at University of Nueva Caceres for senior high school under the Science, Technology, Engineering, and Mathematics(STEM) track.
              </p>
            </div>
          </div>
          {/* This is the skill set section 
              Redirect to portfolio for certain skill(that is clicked) that is in the category for filtering projects
          */}
          <p className='text-lg md:text-xl font-bold'>
              Skill Set
          </p>
          <div className="select-none flex flex-wrap text-sm gap-x-4 gap-y-2 -mt-2 -mb-2">
            {/* list of skills */}
            {skillTags.map((skill, index) => (
              <p key={index} 
              className={`cursor-pointer px-2 py-1 rounded-2xl hover:bg-[#979799] bg-[#E8E8E8]`}
              >{skill}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default About