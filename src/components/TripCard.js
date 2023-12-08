import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

//Shows the number of days, property title, reservation date, and an image if available.

const TripCard = ({ trip, onPress }) => (
  <TouchableOpacity onPress={() => onPress(trip)} style={styles.card}>
          <Text style={styles.days}>2 days</Text>
        {trip.imageUrl && <Image source={{ uri: trip.imageUrl }} style={styles.image} />}
    <Text style={styles.title}>{trip.propertyTitle}</Text>
    <Text style={styles.date}>Reserved on: {new Date(trip.dateReserved).toLocaleDateString()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 15, marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, },
  days: { backgroundColor: 'white', color: 'black', fontSize: 14, fontWeight: 'bold', padding: 5, borderRadius: 5, position: 'absolute', top: 30, left: 30, zIndex: 1, borderRadius: 10 },
  title: { marginTop: 10, fontSize: 18, fontWeight: 'bold', },
  date: { marginTop:5, fontSize: 14, color: '#666', },
  image: { width: '100%', height: 150, borderRadius: 8, },
});
export default TripCard;
