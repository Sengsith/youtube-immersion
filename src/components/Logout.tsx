import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

interface Props {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const Logout = ({ user, setUser }: Props) => {
  const handleLogout = () => {
    setUser(null);
    console.log("Logout clicked");
  };

  return (
    <div className="logout-container">
      {user && (
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Logout;
