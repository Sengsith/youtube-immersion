import { UserProps } from "../types/userProps";

const Logout = ({ user, setUser }: UserProps) => {
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
