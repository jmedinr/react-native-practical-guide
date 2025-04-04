import React from "react";
import { Text, StyleSheet } from "react-native";

function Title({children, color}) {
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
    fontSize: 18,
    textAlign: "center",
    borderWidth: 2,
    padding: 12,
    marginTop: 12,
  },
});
