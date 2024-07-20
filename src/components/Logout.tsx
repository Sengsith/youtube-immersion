import { UserProps } from "../types/userProps";

const Logout = ({ user, setUser }: UserProps) => {
  const handleLogout = () => {
    setUser(null);
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
