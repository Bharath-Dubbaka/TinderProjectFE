import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
// import { toast, Toaster } from "sonner";

const EditProfile = ({ user }) => {
   console.log(user, "USERRR");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [gender, setGender] = useState("");
   const [age, setAge] = useState("");
   const [about, setAbout] = useState("");
   const [photoUrl, setPhotoUrl] = useState("");
   const [error, setError] = useState("");
   const [showToast, setShowToast] = useState(false);

   const dispatch = useDispatch();

   // Sync with Redux user when it's ready
   useEffect(() => {
      if (user) {
         setFirstName(user.firstName || "");
         setLastName(user.lastName || "");
         setGender(user.gender || "");
         setAge(user.age || "");
         setAbout(user.about || "");
         setPhotoUrl(user.photoUrl || "");
      }
   }, [user]); // <-- Watch for when `user` changes

   const handleEditProfile = async (e) => {
      e.preventDefault();

      try {
         setError("");
         const res = await axios.patch(
            BASE_URL + "/profile/edit",
            {
               firstName,
               lastName,
               about,
               age,
               gender,
               photoUrl,
            },
            { withCredentials: true }
         );
         console.log("saved ... ");
         //dispatch res of updated data to store
         dispatch(addUser(res?.data?.data));

         //showing toast on save
         setShowToast(true);
         const i = setTimeout(() => {
            setShowToast(false);
         }, 3000);
      } catch (error) {
         setError(error.response.data);
      }
   };

   if (!user) return <div className="text-white">Loading...</div>; // to load with proper data

   return (
      <div className=" flex justify-center items-center mt-10 mb-40 gap-10">
         {showToast && (
            <div className="toast toast-top toast-center z-10">
               <div className="alert alert-success">
                  <span>Profile updated successfully.</span>
               </div>
            </div>
         )}

         <div className="card bg-base-300 w-1/3 shadow-xl p-4">
            <div className="card-body">
               <h2 className="card-title mb-3 text-xl font-extrabold text-blue-500">
                  Edit Profile:
               </h2>
               <hr />
               <form onSubmit={handleEditProfile}>
                  <div>
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
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                           type="text"
                           name="lastName"
                           id="lastName"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="lastName">Age:</label>
                        <input
                           type="text"
                           name="age"
                           id="age"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={age}
                           onChange={(e) => setAge(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="lastName">Gender:</label>
                        <input
                           type="gender"
                           name="gender"
                           id="gender"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={gender}
                           onChange={(e) => setGender(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="lastName">About:</label>
                        <input
                           type="about"
                           name="about"
                           id="about"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={about}
                           onChange={(e) => setAbout(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col mt-4">
                        <label htmlFor="lastName">PhotoUrl:</label>
                        <input
                           type="photoUrl"
                           name="photoUrl"
                           id="photoUrl"
                           className="bg-slate-100 mt-2 rounded-sm  h-8 text-black p-2"
                           value={photoUrl}
                           onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                     </div>
                  </div>{" "}
                  {error && <p className="mt-4 text-red-500 underline">{error}</p>}
                  <div className="card-actions justify-center mt-6">
                     <button type="submit" className="btn btn-primary  w-full">
                        Save Profile
                     </button>
                  </div>
               </form>
            </div>
         </div>
         <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, about }}
         />
      </div>
   );
};

export default EditProfile;
