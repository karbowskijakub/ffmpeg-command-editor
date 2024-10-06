import { Button } from "./ui/button";
import { CommandFieldProps } from "@/interfaces/Console";

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
  ${resolution ? `-t ${resolution}` : ""}

  ${FilePathOutput}`;
  return (
    <>
      {/* <div>
        <pre>{JSON.stringify(watchedFields, null, 2)}</pre>
      </div> */}

      <div className="w-full h-16 bg-primary rounded p-5 flex justify-between items-center">
        <p className="text-primary-foreground font-bold text-xl">
          {ffmpegCommand}
        </p>
        <div>
          <Button className="mr-3" variant="secondary">
            Copy
          </Button>
          <Button variant="secondary">Generate</Button>
        </div>
      </div>
    </>
  );
};

export default CommandField;
