import { CircleX, Pencil } from "lucide-react"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import { useState } from "react";
import { updateCommand, deleteCommand } from "@/api/api"; 
import { toast } from "react-toastify";

const PostRowSavedCommand = ({ command, refetch }) => {
  const [commandName, setCommandName] = useState(command.postName); 
  const [commandContent, setCommandContent] = useState(command.postContent); 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);

  const handleEditCommand = async (e) => {
    e.preventDefault(); 
    try {
      await updateCommand({ 
        id: command.id, 
        userId: command.userId, 
        postName: commandName,  
        postContent: commandContent 
      });
      toast.success("Command updated successfully!");
      setDialogOpen(false);
      refetch(); 
    } catch (error) {
      toast.error("Failed to update command.");
      console.error("Error updating command:", error);
    }
  };

  const handleDeleteCommand = async (e) => {
    e.preventDefault(); 
    try {
      await deleteCommand(command.id);
      toast.success("Command deleted successfully!");
      setDialogOpenDelete(false);
      refetch();
    } catch (error) {
      toast.error("Failed to delete command.");
      console.error("Error deleting command:", error);
    }
  };

  return (
    <div key={command.id} className="bg-secondary w-full h-10 flex justify-between items-center mb-2">
      <p className="ml-4 ">
        <span className="font-bold mr-3">{command.postName}:</span>
        <span>{command.postContent}</span>
      </p>
      <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button onClick={() => setDialogOpen(true)}> 
              <Pencil className="mr-3" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Command</DialogTitle>
              <DialogDescription>
                Edit name and content of your command
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditCommand}> 
              <div className="w-full">
                <div className="flex flex-col">
                  <Label htmlFor="name" className="mb-4">
                    Type the name of the command
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3 mb-4 w-full"
                    value={commandName}
                    onChange={(e) => setCommandName(e.target.value)}
                  />
                  <Label htmlFor="content" className="mb-2"> 
                    Command content
                  </Label>
                  <Input
                    id="content" 
                    className="col-span-3 mb-4 w-full"
                    value={commandContent} 
                    onChange={(e) => setCommandContent(e.target.value)} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save command</Button> 
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={dialogOpenDelete} onOpenChange={setDialogOpenDelete}>
          <DialogTrigger asChild>
            <button onClick={() => setDialogOpenDelete(true)}> 
              <CircleX className="mr-3" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Row</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove the command?
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDeleteCommand}> 
              <div className="w-full">
                <div className="flex justify-center">
                  <Button type="button" onClick={() => setDialogOpenDelete(false)} className="mr-2">Cancel</Button> 
                  <Button type="submit" variant="destructive">Delete row</Button> 
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PostRowSavedCommand;
