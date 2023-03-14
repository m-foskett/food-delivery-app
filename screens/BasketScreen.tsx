import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency, } from "react-native-format-currency";
import { XCircleIcon } from 'react-native-heroicons/solid';
// Redux useDispatch, useSelector Hook Import
import { useDispatch, useSelector } from 'react-redux';
// Custom Redux Slice Actions Import
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
// Custom Colour Palette Import
import colours from '../config/colours';
// Custom Image Handling Function Import
import { urlFor } from '../sanity';

const BasketScreen = () => {
  // Navigation Prop
  const navigation = useNavigation();
  // Acquire Restaurant from Redux Global Store
  const restaurant = useSelector(selectRestaurant);
  // Acquire the basket total from Redux Global Store
  const basketTotal = Number(useSelector(selectBasketTotal).toFixed(2));
  // Acquire all the basket items from the Redux Global Store
  const items = useSelector(selectBasketItems);
  // State Variables
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  // Dispatch Prop Declaration
  const dispatch = useDispatch();
  // If value of 'items' hasn't changed, don't recompute the memoized value
  useMemo(() => {
    // Groups the basket items based on their id and returns the grouped results
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  // Delivery Fee Declaration
  const deliveryFee = 9.00;

  return (
    <SafeAreaView className='flex-1 bg-white pt-6'>
      <View className='flex-1 bg-gray-100'>
        {/* Basket Header */}
        <View className='p-5 border-b border-secondary bg-white shadow-xs'>
          <View>
            {/* Heading */}
            <Text className='text-lg font-bold text-center'>Basket</Text>
            {/* Restaurant Title */}
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>
          {/* Back Button */}
          <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5">
            <XCircleIcon color={colours.primary} height={50} width={50} />
          </TouchableOpacity>
        </View>
        {/* Estimated Time To Delivery Banner */}
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          {/* Delivery Image */}
          <Image
            source={require("../assets/motorbike.jpg")}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          {/* Time to Delivery */}
          <Text className='flex-1'> Deliver in 35 - 45 minutes </Text>
          {/* Change Delivery Time Button */}
          <TouchableOpacity>
            <Text className='text-secondary'>Change</Text>
          </TouchableOpacity>
        </View>
        {/* Items */}
        <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                // Grouped Item Container
                <View className='flex-row items-center space-x-3 bg-white py-2 px-5' key={key}>
                  {/* Quantity of Item */}
                  <Text className='text-secondary'>{items.length} x</Text>
                  {/* Item Image */}
                  <Image
                    source={{ uri: urlFor(items[0]?.image).url() }}
                    className="h-12 w-12 rounded-full"
                  />
                  {/* Item Name */}
                  <Text className='flex-1'>{items[0]?.name}</Text>
                  {/* Item Price */}
                  <Text className='text-gray-600'>{formatCurrency({ amount: items[0]?.price, code: "AUD" })[0]}</Text>
                  {/* Remove one count of Item from the basket Button */}
                  <TouchableOpacity>
                    <Text className='text-secondary text-sm' onPress={() => dispatch(removeFromBasket({ id: key}))}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
        {/* Cost Container */}
        <View className='p-5 bg-white mt-5 space-y-4'>
          {/* Subtotal Row */}
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>
              {formatCurrency({ amount: basketTotal, code: "AUD" })[0]}
            </Text>
          </View>
          {/* Delivery Fee Row */}
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              {formatCurrency({ amount: deliveryFee, code: "AUD" })[0]}
            </Text>
          </View>
          {/* Order Total Row */}
          <View className='flex-row justify-between'>
            <Text className='font-bold'>Order Total</Text>
            <Text className='font-extrabold'>
              {formatCurrency({ amount: basketTotal + deliveryFee, code: "AUD" })[0]}
            </Text>
          </View>
          {/* Place Order Button: Navigate to PreparingOrder Screen onPress */}
          <TouchableOpacity className='rounded-lg bg-primary p-4' onPress={() => navigation.navigate("PreparingOrder")}>
            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen