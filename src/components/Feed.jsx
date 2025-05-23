import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const feed = useSelector((store) => store?.feed);

   const getFeed = async () => {
      //removed below "if (feed) return" so we get instant updates from DB when other users  do interested/ignored us OR we accepted/rejected
      // if (feed) return;
      // console.log(feed, "feed from store");
      try {
         const res = await axios.get(BASE_URL + "/feed", {
            withCredentials: true,
         });
         // console.log(res, "FEED res");
         dispatch(addFeed(res?.data?.data));
      } catch (error) {
         setError(error?.response?.data || "Something went wrong");
         console.log(error);
      }
   };
   useEffect(() => {
      getFeed();
   }, []);

   if (!feed) return;

   if (feed.length <= 0)
      return (
         <h1 className="flex justify-center my-10">No new users founds!</h1>
      );

   return (
      <div>
         <div className=" pb-20 flex flex-col items-center text-white">
            {/* {feed?.map((f, index) => {
               return (
                  <div key={index} className="text-white"> */}
            <UserCard user={feed[0]} />
            {/* </div>
               );
            })} */}
         </div>
      </div>
   );
};

export default Feed;
