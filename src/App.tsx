import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Members from "./pages/Members"
import Trainers from "./pages/Trainers"
import  Plans  from "./pages/Plans"
import Admin from "./pages/Admin"
import Equipment from "./pages/Equipment"
import { LogIn } from "./pages"


function App() {

  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
        <Navbar />
        <div className="z-0 w-[80wv] ml-36 mr-36 max-md:mx-10">
          <Routes>
            {/* dashboard  */}
            <Route path="/" element={(<Home />)} />

            {/* pages  */}
            <Route path="/home" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/admins" element={<Admin />} />
            <Route path="/login" element={<LogIn />} />

            {/* apps  */}
            <Route path="/plans" element={<Plans />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/attendance" element={<Equipment />} />


            {/* charts  */}
          </Routes>
        </div>
    </div>


  );
};

export default App
