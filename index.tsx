import { Link } from 'expo-router';
import {View, Text, FlatList, Button, StyleSheet,ActivityIndicator} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import FoodLogListItem from '../components/FoodLogListItem';

const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      label
      kcal
      id
    
    
}
    KcalTotalForDate(date: $date, user_id: $user_id) {
      total_kcal
    }
  }
`;

export default function HomeScreen() {
  const user_id = 'Amos'; //This will come from the authentication system in future
  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  const totalKcal = data?.KcalTotalForDate?.total_kcal || 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}> Total Calories</Text>
        <Text style={styles.caloriesText}>{totalKcal} kcal</Text>
        
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Today's food</Text>
        <Link href="/search" asChild>
          <Button title="ADD FOOD" />
        </Link>
      </View>
      <FlatList
        data={data.foodLogsForDate}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
      />
      
    </View>
  );
  
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C3C3C', 
    flex: 1,
    padding: 10,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    color: 'white', 
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F7B32B', 
  },
  
});
