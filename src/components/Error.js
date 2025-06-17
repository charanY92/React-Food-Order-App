import { useRouteError } from "react-router-dom";
const Error = ({ error }) => {
  const errorData = useRouteError();
  console.error("Error:", errorData);
  return (
    <div className="error">
      <h1>Oops! Something went wrong.</h1>
      <h2>
        {errorData.status} - {errorData.statusText}
      </h2>
      <p>{errorData.data}</p>
      <p>Please try again later.</p>
    </div>
  );
};

export default Error;
