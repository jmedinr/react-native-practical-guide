import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import colors from "./styles/colors";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const addGoalHandler = (enteredGoalText) => {
    const id = Math.random().toString();
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id, value: enteredGoalText },
    ]);
  };

  const deleteGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const showModal = () => { 
    setIsVisibleModal(true);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={colors.violet}
          onPress={showModal}
        />
        <GoalInput
          onPress={addGoalHandler}
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  goal={itemData.item.value}
                  onDeleteItem={() => deleteGoalHandler(itemData.item.id)}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
