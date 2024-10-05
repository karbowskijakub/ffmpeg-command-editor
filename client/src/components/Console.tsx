import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  duration: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  bitRate: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  frameRate: z
    .number({
      invalid_type_error: "Bitrate must be a number.",
      required_error: "Please select or enter a bitrate.",
    })
    .min(1, { message: "Bitrate must be greater than 0." }),
  audioCodec: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  videoCodec: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  FilePathInput: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  FilePathOutput: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  InputFileFormat: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  OutputFileFormat: z.string().min(1, {
    message: "File path 1 is required.",
  }),
  filePath2: z.string().min(1, {
    message: "File path 2 is required.",
  }),
  resolution: z.string().min(1, {
    message: "File path 2 is required.",
  }),

  isCustomBitRate: z.boolean().default(false).optional(),
  isCustomFrameRate: z.boolean().default(false).optional(),
  isCustomAudioCodec: z.boolean().default(false).optional(),
  isCustomVideoCodec: z.boolean().default(false).optional(),
});

const Console = () => {
  const [showCustomBitRate, setShowCustomBitRate] = useState(false);
  const [showCustomFrameRate, setShowCustomFrameRate] = useState(false);
  const [showCustomAudioCodec, setShowCustomAudioCodec] = useState(false);
  const [showCustomVideoCodec, setShowCustomVideoCodec] = useState(false);
  const [LastChoosedCustomBitRate, setLastChoosedCustomBitRate] = useState(0);
  const [LastChoosedCustomFrameRate, setLastChoosedCustomFrameRate] =
    useState(0);
  const [LastChoosedCustomAudioCodec, setLastChoosedCustomAudioCodec] =
    useState("");
  const [LastChoosedCustomVideoCodec, setLastChoosedCustomVideoCodec] =
    useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FilePathInput: "",
      FilePathOutput: "",
      InputFileFormat: "",
      OutputFileFormat: "",
      filePath2: "",
      isCustomBitRate: false,
      isCustomFrameRate: false,
      isCustomAudioCodec: false,
    },
  });
  const watchAllFields = form.watch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-full h-full justify-center">
      <div className="mt-10 mx-10 w-5/6 max-h-3/5 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex">
            <div className="bg-secondary text-secondary-foreground max-h-full w-1/4 p-4">
              <FormField
                control={form.control}
                name="FilePathInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Filepath</FormLabel>
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
                    <FormLabel>Output Filepath</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="InputFileFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input File format (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="OutputFileFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output File format (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-secondary-foreground max-h-[600px] w-2/4 ">
              <ScrollArea className="h-full p-5">
                <FormField
                  control={form.control}
                  name="audioCodec"
                  render={({ field }) => (
                    <FormItem className="mx-2">
                      <FormLabel>Choose Audio Codec</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const stringValue = value;
                          field.onChange(stringValue);
                          setLastChoosedCustomAudioCodec(stringValue);
                        }}
                        defaultValue={field.value?.toString()}
                        disabled={showCustomAudioCodec}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an audio codec" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">
                            Without audio codec{" "}
                          </SelectItem>
                          <SelectItem value="mp3">MP3</SelectItem>
                          <SelectItem value="aac">AAC</SelectItem>
                          <SelectItem value="flac">FLAC</SelectItem>
                          <SelectItem value="ogg">OGG</SelectItem>
                          <SelectItem value="wav">WAV</SelectItem>
                          <SelectItem value="opus">Opus</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isCustomAudioCodec"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel className="mr-3">Custom Audio Codec</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            const isChecked = checked === true;
                            if (!isChecked) {
                              form.setValue(
                                "audioCodec",
                                LastChoosedCustomAudioCodec
                              );
                            }
                            field.onChange(isChecked);
                            setShowCustomAudioCodec(isChecked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {showCustomAudioCodec && (
                  <FormField
                    control={form.control}
                    name="audioCodec"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Custom Audio Codec</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="videoCodec"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Choose Video Codec</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const stringValue = value;
                          field.onChange(stringValue);
                          setLastChoosedCustomVideoCodec(stringValue);
                        }}
                        defaultValue={field.value?.toString()}
                        disabled={showCustomVideoCodec}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a video codec" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">
                            Without video codec
                          </SelectItem>
                          <SelectItem value="h264">H.264</SelectItem>
                          <SelectItem value="h265">H.265</SelectItem>
                          <SelectItem value="vp8">VP8</SelectItem>
                          <SelectItem value="vp9">VP9</SelectItem>
                          <SelectItem value="av1">AV1</SelectItem>
                          <SelectItem value="mpeg4">MPEG-4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isCustomVideoCodec"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel className="mr-3">Custom Video Codec</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            const isChecked = checked === true;
                            if (!isChecked) {
                              form.setValue(
                                "videoCodec",
                                LastChoosedCustomVideoCodec
                              );
                            }
                            field.onChange(isChecked);
                            setShowCustomVideoCodec(isChecked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {showCustomVideoCodec && (
                  <FormField
                    control={form.control}
                    name="videoCodec"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Custom Video Codec</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="bitRate"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Choose Bitrate</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const numericValue = Number(value);
                          field.onChange(numericValue);
                          setLastChoosedCustomBitRate(numericValue);
                        }}
                        defaultValue={field.value?.toString()}
                        disabled={showCustomBitRate}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a bitrate you want" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="128">128 kbps</SelectItem>
                          <SelectItem value="192">192 kbps</SelectItem>
                          <SelectItem value="256">256 kbps</SelectItem>
                          <SelectItem value="320">320 kbps</SelectItem>
                          <SelectItem value="1000">1 Mbps</SelectItem>
                          <SelectItem value="2500">2.5 Mbps</SelectItem>
                          <SelectItem value="5000">5 Mbps</SelectItem>
                          <SelectItem value="10000">10 Mbps</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isCustomBitRate"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel className="mr-3">Custom bitrate</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            const isChecked = checked === true;
                            if (!isChecked) {
                              form.setValue(
                                "bitRate",
                                LastChoosedCustomBitRate
                              );
                            }

                            field.onChange(isChecked);
                            setShowCustomBitRate(isChecked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {showCustomBitRate && (
                  <FormField
                    control={form.control}
                    name="bitRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Custom Bit Rate (kbps)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="frameRate"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Choose Frame Rate</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const numericValue = Number(value);
                          field.onChange(numericValue);
                          setLastChoosedCustomFrameRate(numericValue);
                        }}
                        defaultValue={field.value?.toString()}
                        disabled={showCustomFrameRate}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a frame rate you want" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="128">128 kbps</SelectItem>
                          <SelectItem value="192">192 kbps</SelectItem>
                          <SelectItem value="256">256 kbps</SelectItem>
                          <SelectItem value="320">320 kbps</SelectItem>
                          <SelectItem value="1000">1 Mbps</SelectItem>
                          <SelectItem value="2500">2.5 Mbps</SelectItem>
                          <SelectItem value="5000">5 Mbps</SelectItem>
                          <SelectItem value="10000">10 Mbps</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isCustomFrameRate"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel className="mr-3">Custom frame rate</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            const isChecked = checked === true;
                            if (!isChecked) {
                              form.setValue(
                                "frameRate",
                                LastChoosedCustomFrameRate
                              );
                            }

                            field.onChange(isChecked);
                            setShowCustomFrameRate(isChecked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {showCustomFrameRate && (
                  <FormField
                    control={form.control}
                    name="frameRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Custom Frame Rate (kbps)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Choose Resolution</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a resolution" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="640x360">
                            640x360 (360p)
                          </SelectItem>
                          <SelectItem value="720x480">
                            720x480 (480p)
                          </SelectItem>
                          <SelectItem value="720x576">
                            720x576 (576p)
                          </SelectItem>
                          <SelectItem value="1280x720">
                            1280x720 (720p)
                          </SelectItem>
                          <SelectItem value="1920x1080">
                            1920x1080 (1080p)
                          </SelectItem>
                          <SelectItem value="2560x1440">
                            2560x1440 (1440p)
                          </SelectItem>
                          <SelectItem value="3840x2160">
                            3840x2160 (4K)
                          </SelectItem>
                          <SelectItem value="7680x4320">
                            7680x4320 (8K)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Type duration</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        <div>
                          <strong>e.g. 00:10:20</strong>
                        </div>
                        <div>
                          The copied audio/video file will last 00:10:00
                        </div>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
            </div>

            <div className="text-secondary-foreground h-full w-2/4 p-4">
              <FormField
                control={form.control}
                name="filePath2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filepath 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-secondary-foreground h-full w-2/4">
                <pre>{JSON.stringify(watchAllFields, null, 2)}</pre>
              </div>
              <Button type="submit" className="mt-4">
                Submit All
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Console;
