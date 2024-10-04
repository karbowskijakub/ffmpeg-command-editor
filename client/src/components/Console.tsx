import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  FilePathInput: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  FilePathOutput: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  filePath2: z.string().min(1, {
    message: "File path 2 is required.",
  }),
});

const Console = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FilePathInput: "",
      FilePathOutput: "",
      filePath2: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className=" flex w-full h-full justify-center ">
      <div className="mt-10 mx-10 w-5/6 h-3/5 flex justify-center items-center">
        <div className="bg-secondary text-secondary-foreground h-full w-1/4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
              <FormField
                control={form.control}
                name="FilePathInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Input Filepath</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="FilePathOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Output Filepath</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="text-secondary-foreground h-full w-2/4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
              <FormField
                control={form.control}
                name="filePath2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4">
                Submit All
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Console;
