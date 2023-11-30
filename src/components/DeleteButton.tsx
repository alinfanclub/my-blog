"use client";

import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";

export default function DeleteButton({ id }: { id: string }) {
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      window.location.reload();
      await axios.delete(
        `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${id}`
      );
    }
  };
  return (
    <button type="button" onClick={handleDelete}>
      삭제
    </button>
  );
}
