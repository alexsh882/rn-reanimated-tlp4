import { StyleSheet, Button, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, FadingTransition, FadeOut  } from "react-native-reanimated";
import { useEffect } from "react";

export default function HomeScreen() {
  const translateX = useSharedValue<number>(0);

  const displayTitle = useSharedValue<boolean>(true);

  const pressed = useSharedValue<boolean>(false);


  const animatedTitleStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateX.value * 2) }],
    opacity: withTiming(displayTitle.value ? 1 : 0),
  }));

  const animatedViewStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#111B21' : '#202C33',
    transform: [{ scale: withTiming(1) }],
  }));

  const handlePress = () => {
    pressed.value = !pressed.value;
    displayTitle.value = !displayTitle.value;
  };

  useEffect(() => {
    translateX.value = 250;
  }, []);


  return (
    <Animated.View layout={FadingTransition} style={[styles.view, animatedViewStyles]}>
      <Animated.View  exiting={FadeOut} style={[styles.titleContainer, animatedTitleStyles ]}>        
        <ThemedText type="title">Bienvenidos!</ThemedText>
        <HelloWave />
      </Animated.View>
      <View style={styles.buttonContainerStyle}>
        <Button title="Iniciar" onPress={handlePress} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",  
    justifyContent: "space-between",
  },
  titleContainer: {    
    justifyContent: "center",
    alignItems: "center",    
    marginTop: -50,
    gap: 20,
    opacity: 1,
  },
  buttonContainerStyle: {
    width: "90%",
    alignSelf: "center",
  },
});
