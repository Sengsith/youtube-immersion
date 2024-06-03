import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h2>404 Not Found</h2>
      <Link to="/">Home</Link>
    </>
  );
};

export default NotFoundPage;
