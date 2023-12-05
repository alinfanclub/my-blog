"use client";

import { Editor } from "@/components/Eduitor";
import TagInputComponent from "@/components/TagInputComponent";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function WritePostPage() {
  const [title, setTile] = useState("");
  const [content, setContent] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
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
            description: description,
            tags: tags,
            featured: featured,
            user,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          window.location.href = "/admin";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = useCallback((value: string | undefined) => {
    setContent(value);
  }, []);

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTile(e.target.value)}
        className="w-full border h-10 px-2 rounded-xl mb-4"
      />
      <TagInputComponent selected={tags} setSelected={setTags} />
      <textarea
        name=""
        id="description"
        className="border h-40 w-full resize-none p-4 rounded-md mb-4"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="featured">Featured Post</label>
      <input
        type="checkbox"
        name=""
        id="featured"
        className="mb-4"
        onChange={(e) => setFeatured(e.target.checked)}
      />
      <Editor value={content} onChange={handleChange} height={650} />
      <button
        type="submit"
        onClick={handlesubmit}
        className="mx-auto block mt-6"
      >
        submit
      </button>
    </div>
  );
}
