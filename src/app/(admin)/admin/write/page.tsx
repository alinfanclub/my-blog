"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WritePostPage() {
  const [title, setTile] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuthContext();
  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      axios
        .post(
          "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post",
          {
            title: title,
            content: content,
            user,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTile(e.target.value)}
        />
        <textarea
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
