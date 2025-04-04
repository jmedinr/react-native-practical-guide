import React, { useState, useCallback } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./contants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const backgroundImage = require("./assets/images/background.png");
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pickNumberHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const screen =
    gameIsOver && userNumber ? (
      <GameOverScreen
        key="gameOver"
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={() => startNewGameHandler()}
      />
    ) : userNumber && !gameIsOver ? (
      <GameScreen
        key="gameScreen"
        userChoice={userNumber}
        onGameOver={(guessRoundsLength) => gameOverHandler(guessRoundsLength)}
      />
    ) : (
      <StartGameScreen
        key={"startGame"}
        onPickNumber={(number) => pickNumberHandler(number)}
      />
    );

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary800, Colors.accent500]}
    >
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <SafeAreaView style={[styles.rootScreen, { marginTop: 30 }]}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
  },
});
