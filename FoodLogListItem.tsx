import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FoodItem {
  label: string;
  kcal: number;
  brand: string;
}

const FoodLogListItem: React.FC<{ item: FoodItem }> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.foodLabel}>{item.label}</Text>
        <Text style={styles.foodDetails}>
          {item.kcal} cal, {item.brand}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  foodLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  foodDetails: {
    color: 'black',
    fontWeight: 'bold'
  },
});

export default FoodLogListItem;
