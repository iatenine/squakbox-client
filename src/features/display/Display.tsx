import React, { useEffect, useState } from "react";
import axios from "axios";

interface Squak {
  id: number;
  content: string;
  date: number;
}

const Display = () => {
  // Use Axios to get all posts from the database
  const [posts, setPosts] = useState<Squak[]>([]);

  useEffect(() => {
    axios
      .get("https://squakbox-app.azurewebsites.net/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const getDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const postList = posts.map((post) => (
    <div key={post.id}>
      <h3>{getDateFromTimestamp(post.date) + ": " + post.content}</h3>
    </div>
  ));

  return <div>{postList}</div>;
};

export default Display;
