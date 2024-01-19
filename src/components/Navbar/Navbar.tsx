import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { CgGym } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import AccountInfo from '../AccountInfo';
import { useDispatch, useSelector, } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';



const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  
  const { userToken } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()


  return (
    <>
      <div className="flex px-6 z-40  bg-[#191d4f] top-0 sticky">
        <div className='flex gap-6 items-center w-[85%] h-[90px]'>
          <button onClick={() => setActiveMenu(!activeMenu)} className="">
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
        
        <div className='flex items-center justify-center h-[90px]   text-white ml-10'>
          <div className='flex flex-col'>
          <button className='flex  text-3xl justify-center'><VscAccount /></button>
          {!userToken ? 
          (
            <Link to="/login">
              <span>LogIn</span>
            </Link>) 
            : 
          (
            <Link to="/login">
              <button  onClick={()=>{dispatch(logout()); }} className='text-red-500 flex justify-center items-center'><span className='text-xl'>Log out</span></button>
            </Link>
          ) }
          </div>

        </div>
        <Sidebar isActive={activeMenu} />



      </div>
      </>

  )
}

export default Navbar