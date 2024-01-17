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
  const [activeAccountMenu, setActiveAccountMenu] = useState<boolean>(false);

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
        <div className='flex items-center justify-center h-[90px] size-10 text-3xl text-white ml-20'>
          <button className='flex' onClick={() => setActiveAccountMenu(!activeAccountMenu)}><VscAccount /></button>
          {!userToken ? 
          (
            <Link to="/login">
              <span>LogIn</span>
            </Link>) 
            : 
          (
            <Link to="/login">
              <button onClick={()=>{dispatch(logout()); console.log(userToken)}} className='text-red-500'>Log Out</button>
            </Link>
          ) }


        </div>
        <Sidebar isActive={activeMenu} />



      </div>
      {activeAccountMenu && <AccountInfo />}</>

  )
}

export default Navbar