import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { PhoneIcon, XCircleIcon } from 'react-native-heroicons/solid';
// Custom Colour Palette Import
import colours from '../config/colours';
// Progress Bar Import
import * as Progress from 'react-native-progress';
// Redux useSelector Hook Import
import { useSelector } from 'react-redux';
// Custom Redux Slice Actions Import
import { selectRestaurant } from '../features/restaurantSlice';
import { clearBasket } from '../features/basketSlice';
// Redux useDispatch Hook Import
import { useDispatch } from 'react-redux';
// React Native Maps Import
import MapView, {Marker} from "react-native-maps";

const DeliveryScreen = () => {
    // Navigation Prop
    const navigation = useNavigation();
    // Acquire Restaurant from Redux Global Store
    const restaurant = useSelector(selectRestaurant);
    // Dispatch Prop Declaration
    const dispatch = useDispatch();
    // On dispatch update, dispatch action of clearBasket to Redux Store
    useEffect(() => {
        dispatch(clearBasket());
    }, [dispatch]);
    return (
        // DeliveryScreen Base Container
        <View className='bg-primary flex-1 pt-6'>
            <SafeAreaView className='z-50'>
                {/* DeliveryScreen Header */}
                <View className='flex-row justify-between items-center p-5'>
                    {/* Home Button */}
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XCircleIcon color={colours.white} size={30} />
                    </TouchableOpacity>
                    {/* Order Help Button */}
                    <TouchableOpacity>
                        <Text className='font-light text-white text-lg'>Order Help</Text>
                    </TouchableOpacity>
                </View>
                {/* Estimated Delivery Card */}
                <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
                    <View className='flex-row justify-between'>
                        {/* Estimated Arrival Time */}
                        <View>
                            <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
                            <Text className='text-4xl font-bold'>44-55 minutes</Text>
                        </View>
                        {/* Delivery Animation */}
                        <Image
                            source={require("../assets/deliveryAnimation.webp")}
                            className="h-20 w-20"
                        />
                    </View>
                    {/* Progress Bar */}
                    <Progress.Bar color={colours.primary} indeterminate={true} />
                    {/* Order Notice */}
                    <Text className='mt-3 text-gray-500'>
                        Your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>
            {/* Imported MapView component displaying the restaurant location using Google Maps */}
            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                className="flex-1 -mt-10 z-0"
                mapType='mutedStandard'
            >
                <Marker
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier="origin"
                    pinColor={colours.primary}
                    flat={true}
                />
            </MapView>
            {/* Rider Banner */}
            <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
                {/* Rider Icon */}
                <Image
                    source={require("../assets/motorbike.jpg")}
                    className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
                />
                <View className='flex-1'>
                    {/* Rider Name */}
                    <Text className='text-lg'>
                        Bob Bobson
                    </Text>
                    <Text className='text-gray-400'>Your Rider</Text>
                </View>
                {/* Call Rider Button */}
                <TouchableOpacity>
                    <Text className='text-secondary text-lg mr-5 font-bold'> <PhoneIcon size={20} color={colours.primary} /> Call</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen