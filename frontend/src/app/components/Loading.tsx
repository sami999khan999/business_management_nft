import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center 1080p:mt-[20rem] 720p:mt-[10rem]  mt-[15rem]">
      <AiOutlineLoading3Quarters className="animate-spin text-primary-foreground dark:text-primary-foreground xl:text-[5rem] text-4xl" />
    </div>
  );
};

export default Loading;
