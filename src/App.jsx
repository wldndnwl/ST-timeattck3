import React, { useState } from "react";
import axios from "axios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

// posts의 데이터
const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:4000/posts");
  return data;
};

// 포스트  추가
const newPosts = async () => {
  await axios.post("http://localhost:4000/posts");
};
const App = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <div>로딩중입니다…</div>;
  }
  if (isError) {
    return <div>오류가 발생하였습니다…</div>;
  }
  // console.log("post=>", posts);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>추가하기</button>
      </form>
      <ul>
        {posts.map((post) => {
          <li key={post.id}>
            {post.title}
            {post.views}views
          </li>;
        })}
      </ul>
    </>
  );
};

export default App;
