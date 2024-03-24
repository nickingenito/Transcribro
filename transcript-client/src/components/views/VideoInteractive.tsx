
import { useEffect, useState } from 'react';
import { useTranscription } from 'src/context/TranscriptionContext';
import useProcessVTT from 'src/hooks/useProcessVtt';

const VideoInteractiveView = () => {
   const {
     fontSize,
     fontStyle,
     fontColor,
    transcriptionVTT
  } = useTranscription();
  const { processVTTString, processedVTT } = useProcessVTT({ fontSize, fontStyle, fontColor });

  useEffect(() => {
    processVTTString(transcriptionVTT);
  }, [transcriptionVTT, processVTTString]);

//   useEffect(() => {
//     if (processedVTT) {
//       // Convert processed VTT string to a Blob URL for the <track> src
//       const blob = new Blob([processedVTT], { type: 'text/vtt' });
//       const url = URL.createObjectURL(blob);
//       setVttUrl(url);

//       // Cleanup
//       return () => {
//         URL.revokeObjectURL(url);
//       };
//     }
//   }, [processedVTT]);

  return (
      <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoFile && (
        <video controls ref={videoRef} style={{ width: '100%' }}>
          <source src={videoFile} type="video/mp4" />
          {/* Process for adding track from processedVTT omitted for brevity */}
        </video>
      )}
    </div>
  );
};

export default VideoInteractiveView;
