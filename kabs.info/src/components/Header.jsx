import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom'

import fb from '../assets/icons8-facebook-32.png'
import github from '../assets/icons8-github-32.png'
import linkn from '../assets/icons8-linkedin-32.png'
import mail from '../assets/icons8-mail-32.png'
import phone from '../assets/icons8-phone-32.png'
import me from '../assets/mwe.jpg'

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [emailTooltipVisible, setEmailTooltipVisible] = useState(false);
  const [phoneTooltipVisible, setPhoneTooltipVisible] = useState(false);
  const [copied, setCopied] = useState(false); // track if the email was copied
  const email = 'christiancabral010@gmail.com';
  const phoneNumber = '+63 938 708 5239'

  const handleCopy = (toCopy) => {
    navigator.clipboard.writeText(toCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <>
    <div className='header flex h-auto w-full justify-center p-2'>
      <div className='flex flex-col md:flex-row items-center w-full md:w-[80%] lg:w-[50%] h-full rounded-3xl shadow-md bg-[#F5F5F5] p-2 md:p-6'>
        <div className='w-[8.25rem] h-auto md:w-32 md:h-32 rounded-2xl border-2 mb-4 md:mb-0 md:me-8 overflow-hidden'>
          <img className='w-full h-full object-cover' src={me} alt="Kabs"/>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-lg md:text-[1.75rem] text-center md:text-left font-extrabold'>
            Christian Vincent D. Cabral
          </p>
          <p className='text-sm md:text-base text-center md:text-left opacity-70'>
            BS Computer Science | Learner | Machine Learning Enthusiast
          </p>
          <p className='text-xs text-center md:text-left opacity-70'>
            Naga City, Camarines Sur, Philippines
          </p>
          <div className='flex flex-wrap gap-2 mt-2'>
            <a href={'https://www.facebook.com/kabsmeiou.chopin'} target="_blank" className="links text-xs"><img src={fb} alt="Facebook"/></a>
            <a href={'https://github.com/kabsmeiou'} target="_blank" className="links text-xs"><img src={github} alt="GitHub"/></a>
            <a href={'https://www.linkedin.com/in/cvcabral'} target="_blank" className="links text-xs"><img src={linkn} alt="LinkedIn"/></a>
            <img
              src={mail}
              alt="Email"
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onMouseEnter={() => setEmailTooltipVisible(true)}
              onMouseLeave={() => setEmailTooltipVisible(false)}
              onClick={() => handleCopy(email)} // Copy email on click
            />
            {emailTooltipVisible && (
              <div className="absolute left-1/2 transform -translate-x-44 -translate-y-8 bg-gray-700 text-white text-sm rounded py-1 px-2 mt-2">
                {copied ? 'Copied!' : email} {/* Show "Copied!" if copied */}
              </div>
            )}
            <img
              src={phone}
              alt="Phone"
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onMouseEnter={() => setPhoneTooltipVisible(true)}
              onMouseLeave={() => setPhoneTooltipVisible(false)}
              onClick={() => handleCopy(phoneNumber)} // Copy email on click
            />
            {phoneTooltipVisible && (
              <div className="absolute left-1/2 transform -translate-x-32 -translate-y-8 bg-gray-700 text-white text-sm rounded py-1 px-2 mt-2">
              {copied ? 'Copied!' : phoneNumber} {/* Show "Copied!" if copied */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className='flex h-auto w-full justify-center p-4'>
      <div className='flex gap-x-4'>
        <Link
          to='/'
          className={`text-lg md:text-xl ${currentPath === '/' ? 'font-extrabold md:text-[1.375rem]' : 'text-lg'}`}
        >
          About
        </Link>
        <Link
          to='/portfolio'
          className={`text-lg md:text-xl ${currentPath === '/portfolio' ? 'font-extrabold md:text-[1.375rem]' : 'text-lg'}`}
        >
          Projects
        </Link>
        <Link
          to='/timeline'
          className={`text-lg md:text-xl ${currentPath === '/timeline' ? 'font-extrabold md:text-[1.375rem]' : 'text-lg'}`}
        >
          Timeline
        </Link>
      </div>
    </div>     
  </>
  );
}

export default Header