import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = (props) => {
  const { goal, onDeleteItem } = props;
  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={() => onDeleteItem()}
        android_ripple={{ color: "#210644" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{goal}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
