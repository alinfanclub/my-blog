"use client";

import { Editor } from "@/app/(admin)/admin/write/_componets/Editor";
import TagInputComponent from "@/app/(admin)/admin/write/_componets/TagInputComponent";
import { useAuthContext } from "@/context/AuthContext";
import { uploadImage } from "@/utils/firestorage";
import {
  ICommand,
  TextAreaTextApi,
  TextState,
  commands,
} from "@uiw/react-md-editor";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function WritePostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [title, setTile] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [featured, setFeatured] = useState<boolean | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    axios
      .get(
        `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${slug}`
      )
      .then((res) => {
        const { data } = res.data;
        setTile(data.title);
        setContent(data.content);
        setDescription(data.description);
        setFeatured(data.featured);
        setTags(data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      axios
        .put(
          `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${slug}`,
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
          router.replace(`/posts/${res.data.data.title}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = useCallback((value: string | undefined) => {
    setContent(value);
  }, []);

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
        value={title || ""}
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
        value={description || ""}
      ></textarea>
      <label htmlFor="featured">Featured Post</label>
      <input
        type="checkbox"
        name=""
        id="featured"
        className="mb-4"
        onChange={(e) => setFeatured(e.target.checked)}
        checked={featured || false}
      />
      <Editor
        value={content || ""}
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
