import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function Title({ children, color }) {
  return (
    <Text
      style={{
        ...styles.title,
        ...{
          color: color || "white",
          borderColor: color || "white",
        },
      }}
    >
      {children}
    </Text>
  );
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: Platform.select({
      ios: 0.5,
      android: 1,
    }),
    padding: 12,
    marginTop: 12,
    maxWidth: "80%",
    with: 300,
  },
});
