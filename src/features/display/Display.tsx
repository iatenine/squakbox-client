import React, { useEffect, useState } from "react";
import axios from "axios";

interface Squak {
  id: number;
  content: string;
  date: number;
}

const Display = (props: { posts: Squak[] }) => {
  // Use Axios to get all posts from the database

  const getDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const postList = props.posts
    .map((post: Squak) => (
      <div key={post.id}>
        <h3>{getDateFromTimestamp(post.date) + ": " + post.content}</h3>
      </div>
    ))
    .reverse();

  return <div>{postList}</div>;
};

export default Display;
