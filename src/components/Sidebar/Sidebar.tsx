import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineCalendar, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineStock } from "react-icons/ai";
import { CgGym } from "react-icons/cg";

import { link } from 'fs';

import { BsKanban, BsBarChart } from 'react-icons/bs';
import { FiEdit, FiPieChart } from 'react-icons/fi';
import { GiLouvrePyramid } from 'react-icons/gi';
import { IoMdContacts } from 'react-icons/io';
import { RiStockLine } from 'react-icons/ri';
import { MenuSection } from '@/utils/types';
import { GrUserAdmin } from "react-icons/gr";
import { IoFitness } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";



export const links: MenuSection[] = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Home',
        icon: <CgGym />,
      },
    ],
  },
  {
    title: 'Users',
    links: [
      {
        name: 'members',
        icon: <IoMdContacts />,
      },
      {
        name: 'trainers',
        icon: <IoMdContacts />,
      },
      {
        name: 'admins',
        icon: <GrUserAdmin />,
      },
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'plans',
        icon: <AiOutlineCalendar />,
      },
      {
        name: 'equipment',
        icon: <BsKanban />,
      },
      {
        name: 'membership',
        icon: <FiEdit />,
      },
      {
        name: 'attendance',
        icon: <IoFitness />,
      },
    ],
  },
  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: <AiOutlineStock />,
      },
      {
        name: 'area',
        icon: <AiOutlineAreaChart />,
      },
      {
        name: 'bar',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'pie',
        icon: <FiPieChart />,
      },
      {
        name: 'financial',
        icon: <RiStockLine />,
      },
      {
        name: 'color-mapping',
        icon: <BsBarChart />,
      },
      {
        name: 'pyramid',
        icon: <GiLouvrePyramid />,
      },
      {
        name: 'stacked',
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
type Props = {
  isActive: any
}

const Sidebar = (props: Props) => {


  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 bg-[#ffffff]";
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white hover:text-black dark:text-gray-200 hover:bg-[#f8fafc] hover:bg-light-gray m-2';

  return (

    <div  className={`overflow-x-auto kerim transition-all bg-[#191d4f] duration-700 ease-in-out absolute w-[300px] left-0 top-[100px]  ${props.isActive ? 'left-[-300px]' : 'left-0'}`}>
          <div>
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-white  m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.name}`}
                    key={link.name}
                    onClick={() => { }}
                    className={({ isActive }) => isActive ? activeLink : normalLink}>
                    {link.icon} <span className='capitalize'>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
      </div>
  )
}

export default Sidebar