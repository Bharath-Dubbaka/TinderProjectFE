import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { allRequests } from "../utils/store/requestsSlice";

const Requests = () => {
   const dispatch = useDispatch();

   // Get received requests from Redux store
   const requests = useSelector((store) => store.requests);

   const getRequests = async () => {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
         withCredentials: true,
      });
      console.log(res, "res from Request compo");
      dispatch(allRequests(res?.data?.data));
   };
   console.log(requests, "requests from use selector");
   useEffect(() => {
      getRequests();
   }, []);

   // Add loading state and error handling
   if (!requests) {
      return <div>Loading requests...</div>;
   }

   if (requests.length === 0) {
      return (
         <div className="text-center my-10">
            <h1 className="text-bold text-2xl">No requests Found</h1>
            <p>Start request with people!</p>
         </div>
      );
   }

   // Helper function to calculate time ago
   const timeAgo = (dateString) => {
      const now = new Date();
      const past = new Date(dateString);
      const seconds = Math.floor((now - past) / 1000);

      if (seconds < 60) {
         return seconds === 0 ? "just now" : `${seconds} seconds ago`;
      }

      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
         return `${minutes} minutes ago`;
      }

      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
         return `${hours} hours ago`;
      }

      const days = Math.floor(hours / 24);
      if (days < 7) {
         return `${days} days ago`;
      }

      const weeks = Math.floor(days / 7);
      if (weeks < 4) {
         return `${weeks} weeks ago`;
      }

      const months = Math.floor(days / 30); // Approximate
      if (months < 12) {
         return `${months} months ago`;
      }

      const years = Math.floor(days / 365);
      return `${years} years ago`;
   };

   return (
      <div className="text-center my-10">
         <h1 className="text-bold text-white text-3xl">Requests</h1>

         {requests?.map((request) => {
            console.log(request, "request from MAP");
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
               request?.fromUserID;
            const requestTimeAgo = timeAgo(request.createdAt); // Calculate time ago here

            return (
               <div
                  key={_id}
                  className="m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
               >
                  <div className="flex">
                     <div>
                        <img
                           alt="photo"
                           className="w-24 h-24 rounded-full object-cover"
                           src={photoUrl}
                        />
                     </div>
                     <div className="text-left mx-4 w-full">
                        <h2 className="font-bold text-xl flex justify-between items-center">
                           <div>{firstName + " " + lastName}</div>{" "}
                           <div>
                              {" "}
                              <p className="text-sm text-green-500 mt-1">
                                 Received: {requestTimeAgo}
                              </p>
                           </div>
                        </h2>
                        {age && gender && <p>{age + ", " + gender}</p>}
                        <p>{about}</p>
                     </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                     <button
                        className=" btn btn-primary transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1"
                     >
                        Reject
                     </button>
                     <button
                        className=" btn btn-secondary transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1"
                     >
                        Accept
                     </button>
                  </div>
                  {/* <Link to={"/chat/" + _id}>
                     <button className="btn btn-primary">Chat</button>
                  </Link> */}
               </div>
            );
         })}
      </div>
   );
};

export default Requests;
