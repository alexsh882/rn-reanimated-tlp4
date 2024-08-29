import { StyleSheet, Button, View, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadingTransition,
  FadeOut,
  FadeIn,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function HomeScreen() {

  // declaración de variable para la animación de título y display del título
  const translateX = useSharedValue<number>(0);
  const displayTitle = useSharedValue<boolean>(true);

  // declaración de variable para la animación de botón "Iniciar"
  const pressed = useSharedValue<boolean>(false);

  // declaración de estilos animados para el título
  const animatedTitleStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateX.value * 2) }],
    opacity: withTiming(displayTitle.value ? 1 : 0),
  }));

  // declaración de estilos para el fondo, color y animación.
  const animatedViewStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? "#111B21" : "#202C33",
    transform: [{ scale: withTiming(1) }],
  }));


  // función para manejar el evento de presionar el botón
  const handlePress = () => {
    pressed.value = !pressed.value;
    displayTitle.value = !displayTitle.value;
  };

  // useEffect para iniciar la animación del título cuando se monta el componente.
  useEffect(() => {
    translateX.value = 250;
  }, []);

  return (
    <Animated.View
      layout={FadingTransition}
      style={[styles.view, animatedViewStyles]}
    >
      <Animated.View
        exiting={FadeOut}
        entering={FadeIn}
        style={[styles.titleContainer, animatedTitleStyles]}
      >
        <ThemedText type="title">Bienvenidos!</ThemedText>
        <HelloWave />
      </Animated.View>
      <TouchableOpacity
        
        onPress={handlePress}
      >
        <ThemedText style={styles.buttonStyle} type="subtitle">Iniciar</ThemedText>
      </TouchableOpacity>
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
  buttonStyle: {
    width: "100%",
    textAlign: "center",
    padding: 20,
  },
});
