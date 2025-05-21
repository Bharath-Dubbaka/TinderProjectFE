import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
   const [count, setCount] = useState(0);

   return (
      <>
         <Navbar />
         <div>Home</div>
      </>
   );
}

export default App;
