import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/store/feedSlice";
import axios from "axios";

const UserCard = (user) => {
   // console.log(user, "user from UserCard");
   const { _id, firstName, lastName, age, gender, about, photoUrl } =
      user?.user;

   const dispatch = useDispatch();

   const handleSendRequest = async (status, userID) => {
      try {
         const res = await axios.post(
            BASE_URL + "/request/send/" + status + "/" + userID,
            {},
            {
               withCredentials: true,
            }
         );
         dispatch(removeUserFromFeed(userID));
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div>
         <div
            className="card bg-base-200 h-[36rem] w-96 shadow-sm my-10 transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1"
         >
            <figure>
               <img src={photoUrl} alt="Shoes" />
            </figure>
            <div className="card-body">
               <h2 className="card-title">
                  {firstName + " " + lastName}
                  {age && gender && (
                     <div className="badge badge-secondary">
                        {gender + ", " + age}
                     </div>
                  )}
               </h2>
               <p className="text-start">{about}</p>
               <div className="card-actions justify-end">
                  <button
                     className=" btn btn-primary transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1"
                     onClick={() => handleSendRequest("ignored", _id)}
                  >
                     Ignore
                  </button>
                  <button
                     className=" btn btn-secondary transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1"
                     onClick={() => handleSendRequest("interested", _id)}
                  >
                     Interested
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserCard;
