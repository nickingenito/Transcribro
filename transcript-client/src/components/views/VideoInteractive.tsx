import { useEffect, useRef, useState } from "react";
import { useTranscription } from "src/context/TranscriptionContext";
import useProcessVTT from "src/hooks/useProcessVtt";

const VideoInteractiveView = () => {
  const {
    fontSize,
    fontStyle,
    fontColor,
    allHighlightColors,
    transcriptionVTT,
    videoFile,
    isBold,
    isItalic,
    isUnderline,
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({
    fontSize,
    fontStyle,
    fontColor,
  });
  const videoRef = useRef(null);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  useEffect(() => {
    processVTTString(transcriptionVTT!);
  }, [transcriptionVTT, processVTTString]);

  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
    ::cue {
      background-color: ${allHighlightColors[0]};
      color: ${fontColor};
      font-size: ${fontSize};
    }
    ::cue(bold) {
      font-weight: ${isBold};
    }
    ::cue(underline) {
      font-style: ${isUnderline};
    }
    ::cue(italic) {
      font-style: ${isItalic};
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontSize, fontStyle, fontColor]);

  useEffect(() => {
    if (processedVTT) {
      // Convert processed VTT string to a Blob URL for the <track> src
      const blob = new Blob([processedVTT], { type: "text/vtt" });
      const url = URL.createObjectURL(blob);
      setVttUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [processedVTT]);

  useEffect(() => {
    if (videoRef.current && vttUrl) {
      const trackElement = document.createElement("track");
      trackElement.kind = "subtitles";
      trackElement.label = "English";
      trackElement.src = vttUrl;
      trackElement.default = true;
      //@ts-ignore
      videoRef.current.appendChild(trackElement);

      //@ts-ignore
      videoRef.current.textTracks[0].mode = "showing"; // This might help in forcing the captions to display

      return () => {
        //@ts-ignore
        videoRef.current.removeChild(trackElement);
      };
    }
  }, [vttUrl]);
  return (
    <div>
      {videoFile && (
        <video controls ref={videoRef} style={{ width: "100%" }}>
          <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
          {/* {vttUrl && <track default kind="subtitles" src={vttUrl} label="English" />} */}
        </video>
      )}
    </div>
  );
};

export default VideoInteractiveView;
