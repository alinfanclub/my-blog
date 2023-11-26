'use client';

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  type User = {
    _id: string,
    name: string,
    email: string,
  }

  const [title, setTile] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState<User>()

  useEffect(() => {
      axios.get('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user)
      }).catch((err) => {
        console.log(err)
      }
      )
  }
  ,[])
  const handlesubmit = (e:React.FormEvent) => {
    e.preventDefault()
    if(user) {
      axios.post('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post', {
      title:title,
      content:content,
      user
    }, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    }
  }
  return (
    <section>
      <form onSubmit={handlesubmit}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTile(e.target.value)} />
        <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </section>
  )
}
