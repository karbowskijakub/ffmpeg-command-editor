import { Button } from "./ui/button";

const CommandField = () => {
  return (
    <div className="w-full h-16 bg-primary rounded p-5 flex justify-between items-center">
      <p className="text-primary-foreground" >ffmpeg -i</p>
      <div><Button className="mr-3" variant="secondary">Copy</Button><Button variant="secondary">Copy and generate</Button></div>
    </div>
  );
};

export default CommandField;
