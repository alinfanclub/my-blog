"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Post } from "@/types/post";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default function DeleteButton({
  id,
  setPosts,
}: {
  id: string;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}) {
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await axios.delete(
        `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${id}`
      );
      await axios
        .get(
          "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post"
        )
        .then((res) => {
          setPosts(res.data.data);
        });
    }
  };
  return (
    <button type="button" onClick={handleDelete}>
      삭제
    </button>
  );
}
