import axios from "axios";
import { Cookies } from "react-cookie";


export default function Logout({logout}: {logout: () => void}) {
  const handleLogOut = async () => {
    await axios.post('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/logout', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logout();
  }
  return (
    <button type="button"  onClick={handleLogOut}>logout</button>
  );
}

