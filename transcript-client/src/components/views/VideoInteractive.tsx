import { useEffect, useRef, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";

const VideoInteractiveView = () => {
  const {
    fontSize,
    fontStyle,
    fontColor,
    transcriptionVTT,
    videoFile,
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor,
  });
  const videoRef = useRef(null)
  const [vttUrl, setVttUrl] = useState<Blob| null>(null)
  useEffect(() => {
    processVTTString(transcriptionVTT!);
  }, [transcriptionVTT, processVTTString]);

    useEffect(() => {
      if (processedVTT) {
        // Convert processed VTT string to a Blob URL for the <track> src
        const blob = new Blob([processedVTT], { type: 'text/vtt' });
        
        setVttUrl(blob);

        // Cleanup
        // return () => {
        //   URL.revokeObjectURL(url);
        // };
      }
    }, [processedVTT]);
    console.log(vttUrl)
  return (
    <div>
      {videoFile && (
        <video controls ref={videoRef} style={{ width: "100%" }}>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          <track default kind="subtitles" src={vttUrl} label="English" />
        </video>
      )}
    </div>
  );
};

export default VideoInteractiveView;
