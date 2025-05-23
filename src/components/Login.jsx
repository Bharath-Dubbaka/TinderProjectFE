import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
   const [emailID, setEmailID] = useState("");
   const [password, setPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isLoginForm, setIsLoginForm] = useState(true);
   // console.log(emailID, "emailID");
   // console.log(password, "password");

   const handleLoginSubmit = async (e) => {
      setError(false);
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

   const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      setError(false);

      try {
         const res = await axios.post(
            BASE_URL + "/signup",
            {
               firstName,
               lastName,
               emailID,
               password,
            },
            { withCredentials: true }
         );
         console.log(res, "RES from signupform");
         dispatch(addUser(res.data));

         navigate("/profile");
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <div className=" flex justify-center items-center mt-20">
         <div className="card bg-base-300 w-1/3 shadow-xl  p-4">
            <div className="card-body">
               <h2 className="card-title mb-3 text-xl font-extrabold text-blue-500">
                  {isLoginForm ? "Login:" : "Sign-Up"}
               </h2>
               <hr />
               <form
                  onSubmit={
                     isLoginForm ? handleLoginSubmit : handleSignUpSubmit
                  }
               >
                  <div>
                     {!isLoginForm && (
                        <>
                           <div className="flex flex-col mt-4">
                              <label htmlFor="firstName" className="text-md">
                                 First Name:
                              </label>
                              <input
                                 type="text"
                                 name="firstName"
                                 id="firstName"
                                 className="bg-slate-100 mt-2 rounded-sm h-8  text-black p-2"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                              />
                           </div>
                           <div className="flex flex-col mt-4">
                              <label htmlFor="lastName" className="text-md">
                                 Last Name:
                              </label>
                              <input
                                 type="text"
                                 name="lastName"
                                 id="lastName"
                                 className="bg-slate-100 mt-2 rounded-sm h-8  text-black p-2"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                              />
                           </div>
                        </>
                     )}
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
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="card-actions justify-center mt-6">
                     <button type="submit" className="btn btn-primary  w-full">
                        {isLoginForm ? "Login" : "SignIn"}
                     </button>
                  </div>
                  {isLoginForm ? (
                     <p
                        className="text-green-500 mt-6 text-end underline"
                        onClick={() => setIsLoginForm(false)}
                     >
                        New user ? SignUp
                     </p>
                  ) : (
                     <p
                        className="text-green-500 mt-6 text-end  underline"
                        onClick={() => setIsLoginForm(true)}
                     >
                        Existing user ? Login
                     </p>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
