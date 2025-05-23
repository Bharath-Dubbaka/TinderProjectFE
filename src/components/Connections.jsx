
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedConnections } from "../utils/store/connectionsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Connections = () => {
   const dispatch = useDispatch();

   // Get connections from Redux store
   const connections = useSelector((store) => store.connections);

   const fetchConnections = async () => {
      try {
         const res = await axios.get(BASE_URL + "/user/requests/accepted", {
            withCredentials: true,
         });
         console.log("API Response:", res.data);

         // Dispatch the connections data to Redux store
         dispatch(addedConnections(res.data.data));
      } catch (err) {
         console.error("Error fetching connections:", err.message);
      }
   };

   useEffect(() => {
      fetchConnections();
   }, []);

   // Add loading state and error handling
   if (!connections) {
      return <div>Loading connections...</div>;
   }

   if (connections.length === 0) {
      return (
         <div className="text-center my-10">
            <h1 className="text-bold text-2xl">No Connections Found</h1>
            <p>Start connecting with people!</p>
         </div>
      );
   }

   return (
      <div className="text-center my-10">
         <h1 className="text-bold text-white text-3xl">Connections</h1>

         {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
               connection;

            return (
               <div
                  key={_id}
                  className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
               >
                  <div>
                     <img
                        alt="photo"
                        className="w-20 h-20 rounded-full object-cover"
                        src={photoUrl}
                     />
                  </div>
                  <div className="text-left mx-4 ">
                     <h2 className="font-bold text-xl">
                        {firstName + " " + lastName}
                     </h2>
                     {age && gender && <p>{age + ", " + gender}</p>}
                     <p>{about}</p>
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

export default Connections;
