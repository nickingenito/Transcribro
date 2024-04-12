import { Center, Button, Text, Flex, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUploader from "src/hooks/useUploader";
import Progress from "src/components/uploads/Progress";
import UploadedFileInfo from "src/components/uploads/UploadedFileInfo";
import FileUploadArea from "src/components/uploads/FileUploadArea";
import { useTranscription } from "src/hooks/useTranscription";
import { useAudioContext } from "src/context/AudioContext";
import { useTutorialContext } from "src/context/TutorialContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateTranscript } from "src/utils/backendCalls";

const uploadTutorials = {
  id: "upload",
  tutorials: [
    {
      position: {
        pos: "fixed",
        top: { base: "130px", md: "50%" },
        right: { md: "15%" },
      },
      text: "Upload an audio file in a variety of formats (mp3, mp4, mpeg, mpga, mp4a, wav, webm). Once uploaded, select the transcript language from the dropdown menu and click 'Transcribe'.",
    },
  ],
};

function Upload() {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0);
  const { getInputProps, getRootProps } = useUploader(setUploaded);
  const navigate = useNavigate();
  const { setTranscriptionData, setTranscriptionVTT, isVideo, setVideoFile, setIsVideo } =
    useTranscription();
  const [languageCode, setLanguageCode] = useState("en");
  const { updateTutorialList } = useTutorialContext();

  useEffect(() => {
    updateTutorialList(uploadTutorials);
  }, [updateTutorialList]);

  
  
  const { setAudioFile } = useAudioContext();
  const passTranscript = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (uploaded) {
      try {
        // add file format and size checks before making request
        const allowedFormats = [
          ".mp3",
          ".wav",
          ".m4a",
          ".mpga",
          ".mp4",
          ".webm",
          ".mpeg",
        ];
        const maxFileSize = 300; // max file size in MB

        if (
          !allowedFormats.some((format) =>
            uploaded.name.toLowerCase().endsWith(format)
          )
        ) {
          toast.error("File format not supported");
          return;
        } // file size too large error
        else if (uploaded.size > maxFileSize * 1000000) {
          toast.error(
            "File size is too large. Please upload file smaller than 300 MB."
          );
          return;
        }

        // const data = await generateTranscript(
        //   uploaded,
        //   languageCode,
        //   isVideo,
        //   setProgress
        // );

        const data = `WEBVTT

        00:00:00.000 --> 00:00:01.180
        of having electricity,
        
        00:00:01.200 --> 00:00:03.540
        and you get to the light bulbs and the appliances
        
        00:00:03.560 --> 00:00:05.260
        that we all take for granted.
        
        00:00:05.280 --> 00:00:07.820
        But the amazing thing, in a way,
        
        00:00:07.840 --> 00:00:10.940
        is that there's a revolution happening in the villages and towns
        
        00:00:10.960 --> 00:00:13.180
        all around us here in East Africa.
        
        00:00:13.200 --> 00:00:17.840
        And the revolution is an echo of the cell phone revolution.
        
        00:00:18.760 --> 00:00:20.299
        It's wireless.
        
        00:00:20.320 --> 00:00:22.100
        And that revolution is about solar,
        
        00:00:22.120 --> 00:00:23.860
        and it's about distributed solar.
        
        00:00:23.879 --> 00:00:25.219
        Photons are wireless,
        
        00:00:25.240 --> 00:00:27.299
        they fall on every rooftop,
        
        00:00:27.340 --> 00:00:29.440
        and they generate enough power
        
        00:00:29.459 --> 00:00:32.139
        to be sufficient for every household need.
        
        00:00:33.419 --> 00:00:34.860
        So that's an incredible thing.
        `
       
     
        toast.success("File successfully uploaded");
        setTimeout(() => {
          if (isVideo) {
            //@ts-ignore
            setTranscriptionVTT(data);
            setVideoFile(uploaded)
            navigate("/transcription", { state: { uploadedFile: uploaded } });
          } else {
            //@ts-ignore
            setTranscriptionData(data.transcript);
          }
          navigate("/transcription", { state: { uploadedFile: uploaded } });
        }, 1000); // Pass the uploaded file to the TranscriptionPage
      } catch (err: any) {
        setIsLoading(false);
        if (err.message) {
          toast.error(err.message); // get error message from server
        } else {
          toast.error(
            "Error uploading file. Please ensure file is an acceptable format."
          );
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setAudioFile(null); // Clear the audio file from the audio context
        setUploaded(null);
      }
    }
  };

  return (
    <Center textAlign="center" height="100%">
      {isLoading ? (
        <Progress value={progress} />
      ) : uploaded ? (
        <UploadedFileInfo
          file={uploaded}
          onChange={(value) => setLanguageCode(value)}
          onVideoFlagChange ={(isVideo) => setIsVideo(isVideo)} 
          
        >
          <Button width="100%" onClick={passTranscript}>
            Transcribe
          </Button>
          <Flex alignItems="center" justifyContent="center" mt={4}>
              <Checkbox isChecked={isVideo} onChange={(e) => setIsVideo(e.target.checked)}>
                Is this file in video format?
              </Checkbox>
              <Text ml={2}>Video File</Text>
            </Flex>
        </UploadedFileInfo>
      ) : (
        <FileUploadArea
          getInputProps={getInputProps}
          getRootProps={getRootProps}
        />
      )}
    </Center>
  );
}

export default Upload;
