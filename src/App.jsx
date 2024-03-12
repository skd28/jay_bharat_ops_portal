

import Navbar from "./component/navbar"

import { Routes, Route } from "react-router-dom";
import Client_Management from "./component/jb_client_management/Client_Management";
import Sample from "./component/jb_sample/Sample";
import Create_Sample from "./component/jb_sample/Create_Sample";



function App() {


  return (
    <>
      <div className="flex ">
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/jb_admin" element={<Client_Management />} />
            <Route path="/jb_admin/sample" element={<Sample />} />
            <Route path="/jb_admin/sample/sampling" element={<Create_Sample/>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App





