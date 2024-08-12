import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const err = useRouteError();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>
        {err.data} : {err.statusText}
      </h1>
      <img
        style={{ height: "20em", width: "20em" }}
        alt="Page Not Found!!!"
        src="https://png.pngtree.com/png-vector/20220121/ourlarge/pngtree-oops-404-error-with-a-broken-electric-line-concept-png-image-png-image_4341582.png"
      />
    </div>
  );
};

export default ErrorComponent;
