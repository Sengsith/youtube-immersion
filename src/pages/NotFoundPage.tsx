import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      id="not-found"
      className="grid gap-4 place-items-center place-content-center min-h-[calc(100vh-1rem)]"
    >
      <h2 className="text-4xl">Page not found</h2>
      <img src="../public/ubiquitous.png" alt="not found" className="" />
      <Link to="/" className="text-blue-500 hover:underline">
        Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
