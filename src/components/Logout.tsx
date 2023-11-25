import axios from "axios";


export default function Logout() {
  return (
    <button onClick={() => {
      axios.post('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/logout').then(() => {
        window.location.href = '/';
      });
    }}>logout</button>
  );
}

