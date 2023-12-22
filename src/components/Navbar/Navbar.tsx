import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { CgGym } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";


const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true); 
  return (
    
    <div className="flex px-6 z-10 relative">
      <div className='flex gap-6 items-center w-full h-[100px]'>
          <button onClick={()=>setActiveMenu(!activeMenu)} className="">
            {activeMenu ? (
              <GiHamburgerMenu />
            ) : (
              <IoClose />
            )}
            
          </button>
          <Link to="/" className='flex items-center gap-2'>
             <CgGym /> 
             <span>MyGym</span> 
          </Link>
      </div>
      <Sidebar isActive={activeMenu}/>
    </div>
    
  )
}

export default Navbar