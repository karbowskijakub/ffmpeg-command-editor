import { useState } from "react";
import CommandField from "../components/CommandField";
import Console from "../components/Console";
import { Form } from "@/interfaces/Form";
import SavedCommands from "@/components/SavedCommands";

const Main = () => {
  const [watchedFields, setWatchedFields] = useState<Partial<Form>>({});
  return (
    <section className="p-16 w-full h-screen">
      <CommandField watchedFields={watchedFields}></CommandField>
      <Console setWatchedFields={setWatchedFields}></Console>
      <SavedCommands />
    </section>
  );
};

export default Main;
