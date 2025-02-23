import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";
import colors from "../styles/colors";

const GoalInput = ({ onPress, isVisibleModal, setIsVisibleModal }) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    onPress(enteredGoalText);
    setEnteredGoalText("");
    cancelModal();
  };

  const cancelModal = () => {
    setIsVisibleModal(false);
  };

  return (
    <Modal visible={isVisibleModal} animationType="fade">
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/goal.png')} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={cancelModal} color={colors.pink} />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color={colors.lavender} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    width: "70%",
    borderColor: colors.pastelPurple,
    backgroundColor: colors.pastelPurple,
    color: colors.deepIndigo,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 8,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
