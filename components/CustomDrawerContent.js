import React from 'react';
import { Box, VStack, Avatar, Pressable, Text } from 'native-base';
import avatarImage from '../assets/favicon.png'; 

const CustomDrawerContent = ({ navigation }) => (
  <Box flex={1} p={4}>
    <Box alignItems="center" mt={15} mb={5}>
      <Avatar 
        size="xl"
        source={avatarImage}
      />
    </Box>
    <VStack space={3}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Box borderBottomWidth={1} borderBottomColor="gray.200" py={3}>
          <Text>Home</Text>
        </Box>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('JobListing')}>
        <Box borderBottomWidth={1} borderBottomColor="gray.200" py={3}>
          <Text>Lista de Vagas</Text>
        </Box>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Job')}>
        <Box borderBottomWidth={1} borderBottomColor="gray.200" py={3}>
          <Text>Publicar Vagas</Text>
        </Box>
      </Pressable>
    </VStack>
  </Box>
);

export default CustomDrawerContent;
