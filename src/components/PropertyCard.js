import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

//Displays the property image, title, rating, location, and price.

const PropertyCard = ({ property, onPress }) => (
<TouchableOpacity onPress={() => onPress(property)} style={styles.card}>
  <Image source={{ uri: property.image }} style={styles.image} />
  <View style={styles.infoContainer}>
    <View style={styles.titleAndRating}>
      <Text style={styles.title}>{property.title}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>★ {property.rating}</Text>
      </View>
    </View>
    <Text style={styles.location}>{property.location}</Text>
    <Text style={styles.price}>${property.price} / night</Text>
  </View>
</TouchableOpacity>
);
const styles = StyleSheet.create({
    titleAndRating: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, },
  card: { backgroundColor: '#fff', borderRadius: 8, marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1, overflow: 'hidden', },
  image: { width: '100%', height: 200, },
  infoContainer: { padding: 10, },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, },
  ratingText: { fontSize: 16, color: '#666', },
  location: { fontSize: 14, color: '#666', marginBottom: 5, },
  price: { fontSize: 16, fontWeight: 'bold', color: '#000', },
});
export default PropertyCard;
