import classes from "./Error.module.scss";
import cn from "classnames";

const Error = ({
  message,
  toast = false,
  style = "error",
}: {
  message: string;
  toast?: boolean;
  style?: "error" | "response";
}) => {
  return (
    <div
      className={cn({
        [classes.errorMessage]: style === "error",
        [classes.errorToast]: style === "error" && toast,
        [classes.responseToast]: style === "response" && toast,
        [classes.responseMessage]: style === "response",
      })}
      style={{ margin: "auto" }}
    >
      {message}
    </div>
  );
};

export default Error;
