import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency, } from "react-native-format-currency";
// Redux useDispatch, useSelector Hook Import
import { useSelector } from "react-redux";
// Custom Redux Slice Actions Import
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'

const BasketIcon = () => {
    // Acquiring state of Redux Store to get all Dish items currently in the basket
    const items = useSelector(selectBasketItems);
    // Acquiring state of Redux Store to get the total amount of Dish items in the basket
    const basketTotal = useSelector(selectBasketTotal);
    // Navigation Prop
    const navigation = useNavigation();
    // Format the basket total price with Local Currency Symbol
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: basketTotal, code: "AUD" });
    // If the basket is currently empty, then don't display the component
    if (items.length === 0) return null;

    return (
      // BasketIcon Container
      <View className='absolute bottom-10 w-full z-50'>
        {/* Navigate to the BasketScreen onPress */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Basket")}
          className="mx-5 p-4 rounded-lg flex-row items-center space-x-1 bg-primary"
        >
          {/* Total amount of items in the basket */}
          <Text className="text-white font-extrabold text-lg bg-secondary py-1 px-2">{items.length}</Text>
          {/* View Basket Caption */}
          <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text>
          {/* Total price of all items in the basket */}
          <Text className='text-lg text-white font-extrabold'>{valueFormattedWithSymbol}</Text>
        </TouchableOpacity>
      </View>
    );
};

export default BasketIcon;

