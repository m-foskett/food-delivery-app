import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Custom Screen Imports
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import BasketScreen from '../screens/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';

// Stack Navigator Declaration
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Adding Custom Screens within Root Stack Navigator */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
      />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{presentation: 'modal', headerShown: false}}
      />
      <Stack.Screen
        name="PreparingOrder"
        component={PreparingOrderScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
      <Stack.Screen
        name="Delivery"
        component={DeliveryScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator