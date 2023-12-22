import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Members from "./pages/Members"
import Trainers from "./pages/Trainers"
import { Equipent, Plans } from "./pages"


function App() {

  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
        <Navbar />
        <div className="z-0 w-[80wv] mx-auto">
          <Routes>
            {/* dashboard  */}
            <Route path="/" element={(<Home />)} />

            {/* pages  */}
            <Route path="/members" element={<Members />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/admins" element={<Trainers />} />

            {/* apps  */}
            <Route path="/plans" element={<Plans />} />
            <Route path="/equipment" element={<Equipent />} />
            <Route path="/attendance" element={<Equipent />} />


            {/* charts  */}
          </Routes>
        </div>
    </div>


  );
};

export default App
