import axios from "axios";
import React, { useState, useEffect } from "react";
import Display from "../display/Display";

interface Squak {
  id: number;
  content: string;
  date: number;
}

const Post = () => {
  const [squakInput, setSquakInput] = useState<string>("");
  const [valid, setValid] = useState(false);
  const [posts, setPosts] = useState<Squak[]>([]);

  const updatePosts = () => {
    axios
      .get("https://squakbox-app.azurewebsites.net/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update the posts every 20 seconds
  useEffect(() => {
    updatePosts();
    const interval = setInterval(() => {
      updatePosts();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const onHandleChange = (e: {
    target: { value: any | React.SetStateAction<string> };
  }) => {
    setSquakInput(e.target.value);
    setValid(e.target.value.length > 0 && e.target.value.length < 255);
  };

  const onHandleSubmit = () => {
    if (squakInput.length === 0 || squakInput.length > 255) return;
    axios
      .post("https://squakbox-app.azurewebsites.net/", {
        content: squakInput,
      })
      .then((res) => {
        setSquakInput("");
        updatePosts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <textarea
        value={squakInput}
        onChange={onHandleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onHandleSubmit();
          }
        }}
      />
      <button onClick={onHandleSubmit} disabled={!valid}>
        Submit
      </button>
      <Display posts={posts} />
    </>
  );
};

export default Post;
