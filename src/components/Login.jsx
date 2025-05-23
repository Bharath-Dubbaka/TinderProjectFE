import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
   const [emailID, setEmailID] = useState("virat@gmail.com");
   const [password, setPassword] = useState("Q!w2e39548");
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // console.log(emailID, "emailID");
   // console.log(password, "password");

   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      // console.log("handleLoginSubmit");
      try {
         const res = await axios.post(
            BASE_URL + "/login",
            {
               emailID,
               password,
            },
            { withCredentials: true } //for saving cookies in browser, bcz due to cors not matching we must specify to save cookies
         );
         // console.log(res, "res from handleLoginSubmit");

         //saving loggedInUser Info to userSlice
         dispatch(addUser(res.data));

         //redirect to feed/home
         navigate("/");
      } catch (err) {
         setError(err?.response?.data || "Something went wrong");
         console.error(err);
      }
   };
   return (
      <div className=" flex justify-center items-center mt-20">
         <div className="card bg-base-300 w-1/3 shadow-xl  p-4">
            <div className="card-body">
               <h2 className="card-title mb-3 text-xl font-extrabold text-blue-500">
                  Login:
               </h2>
               <hr />
               <form onSubmit={handleLoginSubmit}>
                  <div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="email" className="text-md">
                           Enter Email:
                        </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           className="bg-slate-100 mt-2 rounded-sm h-8  text-black p-2"
                           value={emailID}
                           onChange={(e) => setEmailID(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="email">Enter Password:</label>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                  </div>{" "}
                  {error && <p>{error}</p>}
                  <div className="card-actions justify-center mt-6">
                     <button type="submit" className="btn btn-primary  w-full">
                        Sign In
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
