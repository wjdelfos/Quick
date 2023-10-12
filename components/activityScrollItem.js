import { useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
  const color = item.id === selectedId ? "white" : "black";

  return (
    <Item
      item={item}
      onPress={() => setSelectedId(item.id)}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

export default renderItem;
