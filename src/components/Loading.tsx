import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      data-cy="loading-todo"
      className="flex justify-center items-center mt-60"
    >
      <BeatLoader color="lightblue" />
    </div>
  );
};

export default Loading;
