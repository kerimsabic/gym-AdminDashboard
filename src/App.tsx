import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Members from "./pages/Members"
import Trainers from "./pages/Trainers"
import Plans from "./pages/Plans"
import Admin from "./pages/Admin"
import Equipment from "./pages/Equipment"
import { Attendance, FirstChart, LogIn, Membership, SecondChart } from "./pages"
import ProtectedRoutes from "./utils/ProtectedRoutes"


function App() {

  //const [activeMenu, setActiveMenu] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="z-0 w-[80wv] ml-36 mr-36 max-md:mx-10">
        <Routes>

          {/* dashboard  */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={(<Home />)} />
          </Route>
          {/* pages  */}
          <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/admins" element={<Admin />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
          

          <Route element={<ProtectedRoutes />}>
          <Route path="/plans" element={<Plans />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/attendance" element={<Attendance />} />
          </Route>


          {/* charts  */}
          <Route path="/line" element={<FirstChart />} />
          <Route path="/area" element={<SecondChart />} />
        </Routes>
      </div>
    </div>


  );
};

export default App
