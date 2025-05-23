import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Navbar = () => {
   const photoUrl = useSelector((state) => state.user?.photoUrl);
   const loggedInUserFirstName = useSelector((state) => state.user?.firstName);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const defaultPhoto =
   //    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
   // const imageSrc =
   //    photoUrl && photoUrl.trim() !== "" ? photoUrl : defaultPhoto;

   // console.log(imageSrc);

   const handleLogout = async () => {
      console.log(" called the logout");
      try {
         const res = await axios.post(
            BASE_URL + "/logout",
            {},
            {
               withCredentials: true,
            }
         );
         console.log(res, "res from handleLogout");

         dispatch(removeUser());
         navigate("/login");
         console.log("user logged out");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="navbar bg-base-300 shadow-sm px-10">
         <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-2xl">
               ☘️ DevTinder
            </Link>
         </div>
         {photoUrl && (
            <div className="flex gap-2 align-center items-center">
               <div className="">Welcome, {loggedInUserFirstName} </div>
               <div className="dropdown dropdown-end">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           alt="Logged in user Profile Photo"
                           src={photoUrl}
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                     <li>
                        <Link to="/profile" className="justify-between">
                           Profile
                           <span className="badge">
                              {loggedInUserFirstName}
                           </span>
                        </Link>
                     </li>
                     <li>
                        <Link to="/">My Feed</Link>
                     </li>
                     <li>
                        <Link to="/connections">Connections</Link>
                     </li>
                     <li>
                        <Link to="/requests">Requests</Link>
                     </li>
                     <li onClick={handleLogout}>
                        <a>Logout</a>
                     </li>
                  </ul>
               </div>
            </div>
         )}
      </div>
   );
};

export default Navbar;
