import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import TripCard from '../components/TripCard';

//Displays the upcoming trips

const TripsScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const q = query(collection(firestore, "reservations"), where("userId", "==", user.uid));
        const unsubscribeData = onSnapshot(q, (querySnapshot) => {
          const reservationsData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            propertyTitle: doc.data().title,
            dateReserved: doc.data().dateReserved,
            imageUrl: doc.data().image,
          }));
          setReservations(reservationsData);
          setLoading(false);
        });
        return () => unsubscribeData();
      } else {
        setReservations([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handlePress = (trip) => {
    navigation.navigate('Detail', { property: trip });
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trips</Text>
      <Text style={styles.subHeader}>Upcoming Reservations</Text>
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <TripCard trip={item} onPress={handlePress} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginVertical: 8, marginHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3, },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5, },
    date: { fontSize: 14, color: '#666', marginBottom: 5, },
    container: { flex: 1, paddingHorizontal: 10, backgroundColor: '#fff', },
    header: { fontSize: 18, fontWeight: 'bold', marginTop: 80, marginBottom: 10, textAlign: 'center', },
    subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginLeft: 10, },
  });
export default TripsScreen;
