import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Colors from '../../contants/colors'

const InstructionText = ({children, style}) => {
  return (
      <Text style={[styles.instructionText, style]}>{children}</Text>
  )
}

export default InstructionText

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});