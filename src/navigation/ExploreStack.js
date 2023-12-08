import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import DetailScreen from '../screens/DetailScreen';

const ExploreStack = createStackNavigator();
const ExploreStackNavigator = () => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Detail" component={DetailScreen} options={{ tabBarVisible: false }} />
    </ExploreStack.Navigator>
  );
};
export default ExploreStackNavigator;
