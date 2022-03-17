import React, { useEffect } from "react";
import Display from "./features/display/Display";
import Post from "./features/post/Post";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Squakbox";
  }, []);

  return (
    <>
      <Post />
    </>
  );
}

export default App;
