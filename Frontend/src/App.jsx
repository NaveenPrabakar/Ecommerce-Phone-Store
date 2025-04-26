import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignUpForm from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

export default App;
