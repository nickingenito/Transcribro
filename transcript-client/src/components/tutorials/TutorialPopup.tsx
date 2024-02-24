import { useState } from 'react';
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    Text
} from "@chakra-ui/react"
import { useTutorialContext } from 'src/context/TutorialContext';

const TutorialPopup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { tutorialList, toggleHelp } = useTutorialContext();

    const nextTutorial = () => {
        if (currentIndex < tutorialList.tutorials.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            onClose();
            setCurrentIndex(0);
        }
    }

    const displayTutorial = () => {
        const currentTutorial = tutorialList.tutorials[currentIndex];

        if(!currentTutorial){
            return null;
        }
        
        return (
            <Box sx={currentTutorial.position} width="350px" bg="white" borderRadius="8" mb="4" zIndex="1000" boxShadow="lg">
                <Box height="8px" bg="#557E4A" borderTopRadius="8"></Box>
                <Box p="2" textAlign="left" fontSize="md">
                    <Text>{currentTutorial.text}</Text>
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Button onClick={onOpen} ref={toggleHelp} id="toggleTutorial" variant="link" fontSize={{base: "xl", md: "lg"}} color="white">Help</Button>

            <Modal isOpen={isOpen} onClose={nextTutorial} size="sm" motionPreset="none">
                <ModalOverlay bg='blackAlpha.500'/>
                <ModalContent display={{base: "flex", md: "box"}} alignItems={{base: "center"}}>
                    {displayTutorial()}
                </ModalContent>
            </Modal>
        </>
    );
}

export default TutorialPopup