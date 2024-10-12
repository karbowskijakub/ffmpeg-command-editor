import { useState } from "react"; // Import useState for managing state
import { Button } from "./ui/button";
import { CommandFieldProps } from "@/interfaces/Console";
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
import { postCommand } from "@/api/api";
import { toast } from "react-toastify";

const CommandField = ({ watchedFields }: CommandFieldProps) => {
  const {
    FilePathInput,
    FilePathOutput,
    InputFileFormat,
    OutputFileFormat,
    videoCodec,
    audioCodec,
    frameRate,
    bitRateAudio,
    bitRateVideo,
    resolution,
    duration,
  } = watchedFields;

  const ffmpegCommand = `ffmpeg ${
    InputFileFormat ? `-f ${InputFileFormat}` : ""
  } -i ${FilePathInput} ${OutputFileFormat ? `-f ${OutputFileFormat}` : ""} ${
    videoCodec ? `-vcodec ${videoCodec}` : ""
  } ${audioCodec ? `-acodec ${audioCodec}` : ""} 
  ${bitRateVideo ? `-b:v ${bitRateVideo}` : ""}
    ${bitRateAudio ? `-b:a ${bitRateAudio}` : ""}
 ${duration ? `-t ${duration}` : ""}
  ${frameRate ? `-r ${frameRate}` : ""}
  ${resolution ? `-s ${resolution}` : ""}
  ${FilePathOutput}`;

  const [commandName, setCommandName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!commandName.trim()) {
      toast.error("Command name cannot be empty."); 
      return; 
    }

    try {
      await postCommand({ postName: commandName, postContent: ffmpegCommand });
      toast.success("Command saved successfully!");
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save command.");
      console.error("Error saving command:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ffmpegCommand)
      .then(() => {
        toast.success("Command copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy command.");
        console.error("Copy error:", err);
      });
  };

  return (
    <>
      <div className="w-full h-16 bg-primary rounded p-5 flex justify-between items-center">
        <p className="text-primary-foreground font-bold text-xl">
          {ffmpegCommand}
        </p>
        <div>
          <Button className="mr-3" variant="secondary" onClick={handleCopy} >
            Copy
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Generate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate command</DialogTitle>
                <DialogDescription>
                  Save your command to the database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}> 
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
                    <Label htmlFor="commandPreview" className="mb-2">
                      Command preview
                    </Label>
                    <p>{ffmpegCommand}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save command</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default CommandField;