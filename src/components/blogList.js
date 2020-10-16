import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import BlogPost from "./blogPost";

const loadData = async () => {
  const url = "http://localhost:3000/v1/all";
  const response = await fetch(url);
  const data = response.json();
  return data;
};

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function () {
      const posts = await loadData(`http://localhost:3000/v1/all`);
      setPosts(posts);
    })();
  }, [setPosts]);

  return (
    <>
      <h2>Blog Post</h2>
      <Route path="/" exact>
        <ul>
          {posts.map((post) => {
            return (
              <li key={`post-${post.id}`}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>
      </Route>
      <Route path="/post/:post_id?">
        <BlogPost posts={posts} />
      </Route>
    </>
  );
};

export default BlogList;
