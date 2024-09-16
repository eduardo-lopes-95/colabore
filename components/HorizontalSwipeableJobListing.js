import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Linking } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { Box, Text, Button, VStack, HStack, FlatList, Center, Heading } from 'native-base';

const { width } = Dimensions.get('window');

function HorizontalSwipeableJobListing() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch('https://apibr.com/vagas/api/v1/issues?page=1&per_page=100');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwipe = (job, direction) => {
    if (direction === 'right') {
      console.log('Gostei:', job.title);
    } else if (direction === 'left') {
      console.log('Não Gostei:', job.title);
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const renderSwipeableItem = ({ item, index }) => {
    if (index < currentIndex) return null;

    const translateX = new Animated.Value(0);
    const rotate = translateX.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-30deg', '0deg', '30deg'],
    });
    const animatedStyle = {
      transform: [{ translateX }, { rotate }],
    };

    const handleGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: true }
    );

    const handleStateChange = ({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        if (nativeEvent.translationX > 100) {
          Animated.timing(translateX, {
            toValue: width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => handleSwipe(item, 'right'));
        } else if (nativeEvent.translationX < -100) {
          Animated.timing(translateX, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => handleSwipe(item, 'left'));
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }
    };

    return (
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[{ width: width * 0.8, height: 300 }, animatedStyle]}>
          <Box flex={1} bg="white" borderRadius={10} shadow={3} mx={2}>
            <Center flex={1}>
              <Animated.View
                style={{
                  position: 'absolute',
                  opacity: translateX.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                }}
              >
                <Text fontSize="2xl" color="white" bg="rgba(0,0,0,0.5)" p={2} borderRadius={5}>
                  Gostei
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: 'absolute',
                  opacity: translateX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                }}
              >
                <Text fontSize="2xl" color="white" bg="rgba(0,0,0,0.5)" p={2} borderRadius={5}>
                  Não Gostei
                </Text>
              </Animated.View>
              <VStack space={4} alignItems="center" w="90%">
                <Heading size="lg" textAlign="center">{item.title}</Heading>
                <Text fontSize="md" color="gray.600">Local: {item.keywords.length ? item.keywords.join(', ') : '-'}</Text>
                <Button
                  onPress={() => Linking.openURL(item.url)}
                  colorScheme="teal"
                  borderRadius={5}
                  w="full"
                >
                  Candidatar-se
                </Button>
              </VStack>
            </Center>
          </Box>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <GestureHandlerRootView flex={1}>
      <FlatList
        data={jobs}
        renderItem={renderSwipeableItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        extraData={currentIndex}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </GestureHandlerRootView>
  );
}

export default HorizontalSwipeableJobListing;