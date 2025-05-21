import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

function App() {
   const [count, setCount] = useState(0);

   return (
      <>
         <BrowserRouter basename="/">
            <Routes>
               <Route path="/" element={<Body />}>
                  <Route path="/" element={<Feed />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
               </Route>
            </Routes>
         </BrowserRouter>
         {/* <Navbar />
         <div>Home from div</div> */}
      </>
   );
}

export default App;
