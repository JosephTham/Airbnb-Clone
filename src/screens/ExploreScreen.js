import React from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

import PropertyCard from '../components/PropertyCard';

//available bookings

const properties = [
    { 
      id: '1', 
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-54386876/original/ddef738a-da4a-41ea-be99-3a20c26b4c68.jpeg?im_w=1200', 
      title: 'Lake City Views', 
      location: 'Chicago',
      shortDescript:'Entire rental unit in Chicago, Illinois',
      accomodation: '8 guests - 3 bedrooms - 4 beds - 2 bathrooms.',
      description: 'Imagine yourself in PH#1, a one-of-a-kind rental 55 stories above Chicago. With dramatic living spaces and a charming fireplace, its an elevated experience that immerses you in the citys essence. Unparalleled panoramic views of the skyline await. PH#1 is nestled between North Michigan Avenue and the River North District, two of the citys most thrilling neighborhoods. Dont miss out - book now and immerse yourself in the vibrant energy of Chicago. Your ultimate city living adventure awaits',
      rating: '5.0', 
      hostName: 'James',
      price: '696',
      hostSince: '2021-07-07'
    },
      { 
        id: '2', 
        image: 'https://a0.muscache.com/im/pictures/miso/Hosting-883137402588150429/original/963ae834-fbc5-44d1-aa97-f9dd41cd5e46.jpeg?im_w=720', 
        title: 'The Central Sanctuary', 
        location: 'Chicago',
        shortDescript: 'Entire rental unit in Chicago',
        accomodation: '6 guests - 2 bedrooms - 3 beds - 2 bathrooms',
        description: 'Located at the epicenter of Chicagos cultural historial and business attractions. This luxurious 2 bedroom apartment offers guests all the comforts of home, whether on the road for work or play.',
        rating: '5.0', 
        hostName: 'Stephanie',
        price: '152',
        hostSince: '2008-09-15'
      },
      { 
        id: '3', 
        image: 'https://a0.muscache.com/im/pictures/fb63d52e-c5cf-4969-8559-0ea3d72c0e80.jpg?im_w=720', 
        title: 'Lake Views', 
        location: 'Middlebury, Indiana',
        shortDescript: 'Entire cottage in Middlebury, Indiana',
        accomodation: '8 guests - 3 bedrooms - 7 beds - 2 bathrooms',
        description: 'Beautifully restored 1906 lake cottage located on Stone Lake just North of Middlebury and in the heart of Amish Country in the Northern Indiana.',
        rating: '4.9', 
        hostName: 'Kent',
        price: '250',
        hostSince: '2019-05-21'
      },
]
const ExploreScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.searchSection}>
        <TextInput 
            style={styles.searchInput} 
            placeholderTextColor="#000"
        >   
        </TextInput>
        <Image style={styles.categoryIcon1} source={require('../images/search.png')}/>
        <View style={styles.searchinputtext}>
         <Text style={styles.searchPlaceholder1}>Where to?</Text>
         <Text style={styles.searchPlaceholder}>Anywhere - Any week</Text>
         </View>
        <TouchableOpacity style={styles.settingsButton}>
            <Image source={require('../images/filter.png')} style={styles.categoryIcon} />
        </TouchableOpacity>
        </View>
  
        <View style={styles.categorySection}>
        <View style={styles.category}>
        <Image  source={require('../images/cabin.png')}  style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>Cabins</Text>
            <View style={styles.underline}></View>
        </View>
        <View style={styles.category}>
        <Image  source={require('../images/trending.png')}  style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>Trending</Text>
        </View>
        <View style={styles.category}>
        <Image  source={require('../images/play.png')}  style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>Play</Text>
        </View>
        <View style={styles.category}>
        <Image  source={require('../images/city.png')}  style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>City</Text>
        </View>
        <View style={styles.category}>
        <Image  source={require('../images/beach.png')}  style={styles.categoryIcon} />
            <Text style={styles.categoryLabel}>Beachfront</Text>
        </View>
        </View>
        <FlatList
          data={properties}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => navigation.navigate('Detail', { property: item, fromExplore: true })}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    searchinputtext: { left: 50, top: 16, position: 'absolute', flexDirection: 'column' },
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    searchSection: { flexDirection: 'row', alignItems: 'center', marginTop: 50, marginBottom: 10 },
    inputIcon: { position: 'relative', left: -40, top: 40, width: 40, height: 40 },
    searchInput: { flex: 3, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 30, paddingLeft: 40, fontSize: 16, height: 60, marginRight: 5 },
    searchPlaceholder1: { fontSize: 14, fontWeight: 'bold', color: 'black' },
    searchPlaceholder: { fontSize: 12, color: 'gray' },
    settingsButton: { borderWidth: 1.5, borderColor: 'black', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 50 },
    categorySection: { flexDirection: 'row', justifyContent: 'space-around', padding: 5 },
    category: { alignItems: 'center' },
    categoryLabel: { marginTop: 5 },
    underline: { marginTop: 2, height: 2, width: 60, backgroundColor: '#000' },
    categoryIcon1: { position: 'absolute', top: 20, left: 12, width: 24, height: 24, marginBottom: 5 },
    categoryIcon: { width: 24, height: 24, marginBottom: 5 },
  });  
  export default ExploreScreen;