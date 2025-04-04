import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';



const mutation = gql`

   mutation MyMutation($food_id: String! $kcal: Int! $label: String! $user_id: String!
  ) {
insertFood_log(food_id: $food_id kcal: $kcal label: $label user_id: $user_id) {created_at 
food_id
id
kcal
label
user_id

}
}
`;

interface FoodItem {

  food: {label: string; nutrients: {ENERC_KCAL: number;};
brand: string;
foodId: string;
};}

const FoodListItem = ({ item }: { item: FoodItem }) => {
const [logFood] = useMutation(mutation, {
refetchQueries: ['foodLogsForDate'],
});
const router = useRouter();





const onPlusPressed = async () => {

    try {

      await logFood({

        variables: {

          food_id: item.food.foodId,

          kcal: item.food.nutrients.ENERC_KCAL,

          label: item.food.label,

          user_id: 'Amos'

        },

      });
       

      Alert.alert('Success', 'Food logged successfully!');
      router.back();
    } catch (error) {

      Alert.alert('Error', 'Failed to log food. Please try again.');

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.textContainer}>

        <Text style={styles.foodLabel}>{item.food.label}</Text>

        <Text style={styles.foodDetails}>

          {item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}

        </Text>

      </View>

      <AntDesign onPress={onPlusPressed} name="pluscircleo" size={24} color="royalblue" />

    </View>

  );

};



const styles = StyleSheet.create({

  container: {

    backgroundColor: 'gainsboro',

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

    color: 'dimgray',

  },

});

export default FoodListItem;

