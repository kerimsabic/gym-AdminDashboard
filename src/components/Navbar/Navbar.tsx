import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { CgGym } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";


const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true); 
  return (
    
    <div className="flex px-6 z-10 relative bg-[#191d4f] top-0 sticky">
      <div className='flex gap-6 items-center w-full h-[100px]'>
          <button onClick={()=>setActiveMenu(!activeMenu)} className="">
            {activeMenu ? (
              <div className='text-white text-3xl max-md:text-base'>
              <GiHamburgerMenu />
              </div>
            ) : (
              <div className='text-white text-3xl'>
                <IoClose />
              </div>
              
            )}
            
          </button>
          <Link to="/home" className='flex items-center gap-2 text-white text-3xl max-md:text-base'>
             <CgGym /> 
             <span>MyGym</span> 
          </Link>
      </div>
      <Sidebar isActive={activeMenu}/>
    </div>
    
  )
}

export default Navbar