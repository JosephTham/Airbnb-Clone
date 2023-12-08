import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, setDoc, collection } from "firebase/firestore";

// This screen displays detailed information about a property.

const DetailScreen = ({ route, navigation }) => {
  const { property, fromExplore } = route.params;
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const handleBack = () => {
    navigation.goBack();
  };

  const standardizedProperty = {
    title: property.propertyTitle || property.title,
    location: property.propertyLocation || property.location,
    rating: property.propertyRating || property.rating,
    shortDescript: property.propertyshortDescript || property.shortDescript,
    accomodation: property.propertyAccomodation || property.accomodation,
    description: property.propertyAccomodation || property.description,
    hostName: property.propertyHostName || property.hostName,
    hostSince: property.propertyHostSince || property.hostSince,
    price: property.propertyPrice || property.price,
    image: property.image, 
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleReserve = async () => {
    if (currentUser) {
      const reservationRef = doc(collection(firestore, "reservations"));
      try {
        await setDoc(reservationRef, {
          userId: currentUser.uid,
          propertyId: property.id,
          ...standardizedProperty,
          dateReserved: new Date().toISOString(),
        });
        navigation.navigate('Trips');
        console.log('Reservation created');
      } catch (error) {
        console.error('Error creating reservation:', error);
      }
    } else {
      navigation.navigate('Profile');
      console.log('User not logged in');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: standardizedProperty.image }} style={styles.image} />
      <View style={styles.topBar}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image style={styles.categoryIcon} source={require('../images/back.png')}/>
        </TouchableOpacity>
        <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton}>
            <Image style={styles.categoryIcon} source={require('../images/share.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
            <Image style={styles.categoryIcon} source={require('../images/heart.png')}/>
            </TouchableOpacity>
        </View>
        </View>
      <View style={styles.content}>
        <Text style={styles.title}>{standardizedProperty.title}</Text>
        <Text style={styles.shortDescription}>{standardizedProperty.shortDescript}</Text>
        <Text style={styles.accomodation}>{standardizedProperty.accomodation}</Text>

        <Text style={styles.accommodationDescription}>★ {standardizedProperty.rating}</Text>
        <View style={styles.separator} />
        <View style={styles.hostInfo}>
          <View style={styles.hostIcon} />
          <View>
            <Text style={styles.hostedBy}>Hosted by {standardizedProperty.hostName}</Text>
            <Text style={styles.hostSince}>Since {standardizedProperty.hostSince}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <ScrollView style={styles.scroll}>
        <Text style={styles.fullDescription}>{standardizedProperty.description}</Text>

        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerSeparator} />
        <View style={styles.footerContent}>
          <Text style={styles.price}>{`$${standardizedProperty.price} / night`}</Text>
          {fromExplore && <TouchableOpacity onPress={handleReserve} style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: { height: 200 },
  rightButtons: { flexDirection: 'row' },
  categoryIcon: { width: 20, height: 20 },
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, top: 0 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 60, left: 10, right: 10 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  content: { marginTop: 20, paddingHorizontal: 20 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 10 },
  shortDescription: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  accomodation: { fontSize: 15, marginTop: 2, marginBottom: 2, color: '#000' },
  accommodationDescription: { fontSize: 15, color: 'black', marginTop: 2, fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: 'lightgray', marginVertical: 20 },
  hostInfo: { flexDirection: 'row', alignItems: 'center' },
  hostIcon: { width: 40, height: 40, borderRadius: 50, backgroundColor: 'black' },
  hostedBy: { fontSize: 14, marginLeft: 10, fontWeight: 'bold' },
  hostSince: { fontSize: 14, color: 'black', marginLeft: 10, fontWeight: 'bold' },
  fullDescription: { fontSize: 15, color: '#000' },
  footer: { paddingHorizontal: 20, bottom: 0 },
  footerSeparator: { height: 1, backgroundColor: 'gray', marginBottom: 20 },
  footerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  reserveButton: { backgroundColor: 'red', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 10 },
  reserveButtonText: { color: '#fff', fontWeight: 'bold' },
});
export default DetailScreen;
