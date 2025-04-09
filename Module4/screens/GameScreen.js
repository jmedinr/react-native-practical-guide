import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  if (min === max) {
    onGameOver(true);
    return;
  }

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
}

function GameScreen({ userChoice, onGameOver }) {
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width: deviceWidth } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userChoice) {
      const numberOfRounds = guessRounds.length;
      console.log("Game Over", numberOfRounds);
      onGameOver(numberOfRounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary.current = currentGuess;
    } else {
      minBoundary.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, nextNumber]);
  };

  const guessRoundsLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.introductionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="remove-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (deviceWidth > 500) {
    content = (
      <>
        <InstructionText style={styles.introductionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="white"
                />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                <Ionicons name="add-circle-outline" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundsLength - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  introductionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 1,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
