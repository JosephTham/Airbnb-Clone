import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import TripsScreen from '../screens/TripsScreen';
import ExploreStackNavigator from './ExploreStack';
import { View, FlatList, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Explore" 
      component={ExploreStackNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image source={require('../images/search.png')} style={[styles.notificationIcon, { tintColor: focused ? 'red' : 'black' }]}  />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : 'black' }}>Explore</Text>
          ),
      }}
    />
    <Tab.Screen 
      name="WishLists" 
      component={ExploreStackNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image source={require('../images/heart.png')} style={[styles.notificationIcon, { tintColor: focused ? 'red' : 'black' }]}  />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : 'black' }}>WishList</Text>
          ),
      }}
    />
    <Tab.Screen 
      name="Trips" 
      component={TripsScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image source={require('../images/airbnb.png')} style={[styles.notificationIcon, { tintColor: focused ? 'red' : 'black' }]} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : 'black' }}>Trips</Text>
          ),
      }}
    />
    <Tab.Screen 
      name="Inbox" 
      component={ExploreStackNavigator}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image source={require('../images/message.png')} style={[styles.notificationIcon, { tintColor: focused ? 'red' : 'black' }]} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'red' : 'black' }}>Inbox</Text>
          ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image source={require('../images/profile.png')} style={[styles.notificationIcon, { tintColor: focused ? 'red' : 'black' }]} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? 'red' : 'black' }}>Profile</Text>
        ),
      }}
    />
  </Tab.Navigator>
);
const styles = StyleSheet.create({
notificationIcon: { width: 30, height: 30, },
});
export default TabNavigator;