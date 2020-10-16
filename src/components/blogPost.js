import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = ({ posts }) => {
  const { post_id } = useParams();

  const post = posts.find((post) => {
    return post.id === parseInt(post_id) ? post : null;
  });

  return (
    <div>
      {!!posts.length ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default BlogPost;
