import { useQuery } from "@tanstack/react-query";
import { postLogout, getAllCommands } from "@/api/api";
import { useNavigate } from "react-router-dom";
import PostRowSavedCommand from "./PostRowSavedCommand"; 
import { CommandPost } from "@/interfaces/CommandPost";
import { FileDown } from "lucide-react";
import { Button } from "./ui/button";
const SavedCommands = () => {
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["commands"],
    queryFn: getAllCommands,
  });

  const handleLoginClick = () => {
    postLogout();
    navigate("/login");
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading commands: {error.message}</div>;
  }

  return (
    <div className="w-full h-1/3 flex flex-row">
      <div className="w-[95%] h-full bg-customGrey rounded p-5 mt-10">
        {data.map((command:CommandPost) => (
          <PostRowSavedCommand
            key={command.id} 
            command={command}
            refetch={refetch}
          />
        ))}
      </div>
      <div className="w-[5%] h-full bg-customGrey rounded p-5 mt-10 ml-3 flex flex-col justify-between items-center">
        <h1 className="font-bold text-primary-foreground text-xl text-center">
          Hello, Jakub
        </h1>
        <div className="flex justify-center items-center flex-col">
          <button>
            <FileDown className="mb-4 text-primary-foreground" />
          </button>
          <Button variant="secondary" onClick={handleLoginClick}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedCommands;