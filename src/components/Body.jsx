import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import axios from "axios";

const Body = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const loggedInUserFromStore = useSelector((store) => store?.user);

   const fetchLoggedInUser = async () => {
      // if (!loggedInUserFromStore) return;
      try {
         const res = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
         });
         dispatch(addUser(res.data));
         console.log("Logged in user check from cookies");
      } catch (error) {
         if (error.status == 401) {
            navigate("/login");
         }
         console.log(error);
      }
   };
   useEffect(() => {
      fetchLoggedInUser();
   }, []);

   return (
      <div
      //    className="flex flex-col min-h-screen"
      >
         <Navbar />
         {/* <main className="flex-grow"> */}
         <Outlet />
         {/* </main> */}
         <Footer />
      </div>
   );
};

export default Body;
