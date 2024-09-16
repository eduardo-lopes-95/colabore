import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.type === "success") {
      setFile(result);
      toast.show({
        title: "Sucesso",
        status: "success",
        description: "Documento recebido com sucesso!",
      });
    }
    navigation.navigate('JobListing');
  };

  return (
    <Center flex={1} bg="gray.100">
      <Box w="100%" bg="teal.600" p={4} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Colabore
        </Text>
      </Box>
      <Box w="90%" bg="white" p={6} borderRadius="lg" mt={5} alignItems="center">
        <VStack space={4} w="100%">
          <HStack justifyContent="center" alignItems="center" mb={4}>
            <Center
              w={6}
              h={6}
              borderRadius="full"
              borderWidth={2}
              borderColor="gray.500"
              mr={2}
              justifyContent="center"
              alignItems="center"
            >
              <Text color="gray.500">1</Text>
            </Center>
            <Text fontSize="md" color="gray.500">
              Upload document
            </Text>
          </HStack>
          <Button 
            variant="outline"
            borderStyle="dashed"
            borderColor="gray.400"
            onPress={handleUpload}
            w="100%"
            p={5}>
            <Text color="blue.500">Upload PDF</Text>
          </Button>
          {file && (
            <Text mt={2} fontSize="md" color="gray.600">
              {file.name}
            </Text>
          )}
          <HStack alignItems="center" mt={5}>
            <Switch
              value={isChecked}
              onValueChange={setIsChecked}
              colorScheme="teal"
              mr={2}
            />
            <Text fontSize="sm" color="gray.600">
              I confirm this document is valid.
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Resume;
