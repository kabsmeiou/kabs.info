import React from 'react'

function About() {
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
        </div>
      </div>
    </>
  )
}

export default About