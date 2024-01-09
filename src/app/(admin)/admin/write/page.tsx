"use client";

import { Editor } from "@/app/(admin)/admin/write/_componets/Editor";
import TagInputComponent from "@/app/(admin)/admin/write/_componets/TagInputComponent";
import { useAuthContext } from "@/context/AuthContext";
import dateFormat from "@/utils/dateFormat";
import { uploadImage } from "@/utils/firestorage";
import {
  ICommand,
  TextAreaTextApi,
  TextState,
  commands,
} from "@uiw/react-md-editor";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

export default function WritePostPage() {
  const [title, setTile] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [postSlug, setPostSlug] = useState<string | undefined>();
  const { user } = useAuthContext();
  const router = useRouter();

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
            slug: postSlug,
            user,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          router.replace(`/posts/${res.data.data.title}`);
          localStorage.removeItem("posts");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = useCallback((value: string | undefined) => {
    setContent(value);
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    localStorage.setItem(
      "posts",
      JSON.stringify({ ...posts, content: value, createdAt: new Date() })
    );

    value === "" &&
      localStorage.setItem(
        "posts",
        JSON.stringify({ ...posts, content: undefined })
      );
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTile(value);
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    localStorage.setItem(
      "posts",
      JSON.stringify({ ...posts, [name]: value, createdAt: new Date() })
    );
    value === "" &&
      localStorage.setItem(
        "posts",
        JSON.stringify({ ...posts, [name]: undefined })
      );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDescription(value);
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    localStorage.setItem(
      "posts",
      JSON.stringify({ ...posts, description: value, createdAt: new Date() })
    );
    value === "" &&
      localStorage.setItem(
        "posts",
        JSON.stringify({
          ...posts,
          description: undefined,
        })
      );
  };

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")!!) || null;

    if (posts === null) {
      return;
    } else {
      if (
        confirm(
          `${dateFormat(
            new Date(posts.createdAt)
          )} 에 작성한 글이 있습니다. 불러오시겠습니까?`
        )
      ) {
        setTile(posts.title);
        setContent(posts.content);
        setDescription(posts.description);
      }
    }
  }, []);

  // localstorage에 저장된 title, content, description이 없으면 삭제
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    if (
      posts.title === undefined &&
      posts.content === undefined &&
      posts.description === undefined
    ) {
      localStorage.removeItem("posts");
    }
  }, [title, content, description]);

  const insertImage: ICommand = {
    name: "insertImage",
    keyCommand: "insertImage",
    buttonProps: { "aria-label": "insert Image" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
        ></path>
      </svg>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
      const file = document.createElement("input");
      file.type = "file";
      file.accept = "image/*";
      file.onchange = async (e) => {
        if (file.files && file.files.length > 0) {
          const fileData = file.files[0];
          const url = await uploadImage(fileData);
          api.replaceSelection(`![alt](${url})`);
        }
      };
      file.click();
    },
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="title"
        value={title}
        name="title"
        onChange={handleTitleChange}
        className="w-full border h-10 px-2 rounded-xl mb-4"
      />
      <TagInputComponent selected={tags} setSelected={setTags} />
      <textarea
        name="description"
        id="description"
        className="border h-40 w-full resize-none p-4 rounded-md mb-4"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <div>
        <input
          type="text"
          placeholder="slug"
          value={postSlug}
          onChange={(e) => setPostSlug(e.target.value)}
        />
      </div>
      <label htmlFor="featured">Featured Post</label>
      <input
        type="checkbox"
        name="featured"
        id="featured"
        className="mb-4"
        onChange={(e) => setFeatured(e.target.checked)}
      />
      <Editor
        value={content}
        onChange={handleChange}
        height={650}
        commands={[...commands.getCommands(), insertImage]}
      />
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
