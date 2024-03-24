interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscriptionData {
  transcript: TranscriptionSegment[]
  vtt?: string;
}

interface TranscriptionContextType {
  video: boolean;
  setIsVideo: (isVideo: boolean) => void;
  transcriptionData: TranscriptionSegment[] | null; // Define the type for your transcription data appropriately
  setTranscriptionData: (data: TranscriptionSegment[] | null) => void;
  transcriptionVTT: string; 
  setTranscriptionVTT: (vtt: string) => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  fontStyle: string;
  setFontStyle: (fontStyle: string) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  allHighlightColors: string[];
  setAllHighlightColors: (color: string[]) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
  wordSpacing: string;
  setWordSpacing: (wordSpacing: string) => void;
  isBold: boolean;
  setIsBold: (isBold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (isUnderline: boolean) => void;
  resetStyles: () => void;
  audioFile: File | null;
  setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export {TranscriptionData, TranscriptionContextType, TranscriptionSegment}