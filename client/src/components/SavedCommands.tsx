import { CircleX, Pencil, FileDown } from "lucide-react";
import { Button } from "./ui/button";

const SavedCommands = () => {
  return (
    <div className="w-full h-1/3 flex flex-row">
      <div className="w-[95%] h-full bg-customGrey rounded p-5 mt-10">
        <div className="bg-secondary w-full h-10 flex justify-between items-center">
          <p className="ml-4 ">
            <span className="font-bold mr-3">dasdasFFd:</span>
            <span> fdfsfsdfsdfs</span>
          </p>
          <div>
            <button>
              <Pencil className="mr-3" />
            </button>
            <button>
              <CircleX className="mr-3" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[5%] h-full bg-customGrey rounded p-5 mt-10 ml-3 flex flex-col justify-between items-center">
        <h1 className="font-bold text-primary-foreground text-xl text-center">
          Hello, Jakub
        </h1>
        <div className="flex justify-center items-center flex-col">
          <button >
            <FileDown className="mb-4 text-primary-foreground" />
          </button>
          <Button variant="secondary">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default SavedCommands;
