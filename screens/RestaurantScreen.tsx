import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon,} from 'react-native-heroicons/outline';
import {StarIcon, MapPinIcon} from 'react-native-heroicons/solid';
// Custom Colour Palette Import
import colours from '../config/colours';
// Custom Image Handling Function Import
import { urlFor } from '../sanity';
// Custom Reusable Component Imports
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
// Redux useDispatch Hook Import
import { useDispatch, useSelector } from 'react-redux';
// Custom Redux Slice Actions Import
import { setRestaurant, selectRestaurant } from '../features/restaurantSlice';
import { clearBasket } from '../features/basketSlice';
import { RootStackScreenProps } from '../types/navigationTypes';

const RestaurantScreen = () => {
    // Navigation Prop Declaration
    const navigation = useNavigation();
    // Dispatch Prop Declaration
    const dispatch = useDispatch();
    // Acquire Restaurant from Redux Global Store
    const restaurant = useSelector(selectRestaurant);
    // Route Prop Declaration
    const {
        params:{
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        },
    } = useRoute<RootStackScreenProps<'Restaurant'>['route']>();
    // On page update,
    useEffect(() => {
        // If reselecting the same restaurant do nothing
        if (restaurant.id === id) {
            console.log("same restaurant")
        // Else dispatch the setRestaurant action to the Redux store and
        // dispatch the clearBasket action to the Redux store
        } else {
            dispatch(
                setRestaurant({
                    id,
                    imgUrl,
                    title,
                    rating,
                    genre,
                    address,
                    short_description,
                    dishes,
                    long,
                    lat,
                })
            );
            dispatch(clearBasket());
        }
    }, []);
    // Disable header on component render
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    return (
        <>
        {/* Custom Reusable Component: BasketIcon */}
        <BasketIcon />
        <ScrollView>
            {/* Restaurant Banner Image */}
            <View className="relative">
                <Image
                    source={{
                        uri: urlFor(imgUrl).url(),
                    }}
                    className='w-full h-44 bg-gray-300 p-4'
                />
            </View>
            {/* Back Button */}
            <TouchableOpacity onPress={navigation.goBack} className='absolute top-8 left-3 p-2 bg-gray-100 rounded-full'>
                <ArrowLeftIcon size={20} color={colours.primary} />
            </TouchableOpacity>
            <View className='bg-white'>
                {/* Restaurant Header */}
                <View className='px-4 pt-4'>
                    {/* Restaurant Title */}
                    <Text className='text-3xl font-bold'>{title}</Text>
                    <View className='flex-row space-x-2 my-1 mr-1'>
                        {/* Restaurant Rating */}
                        <View className='flex-row items-center space-x-1'>
                            <StarIcon color={colours.secondary} opacity={0.5} size={22} />
                            <Text className='text-xs text-gray-500'>
                                <Text className='text-green-500'>{rating}</Text> - {genre}
                            </Text>
                        </View>
                        {/* Restaurant Address */}
                        <View className='flex-row items-center space-x-1 flex-shrink'>
                            <MapPinIcon color={colours.grey} opacity={0.4} size={22} />
                            <Text className='text-xs text-gray-500'>Nearby - {address}</Text>
                        </View>
                    </View>
                    {/* Restaurant Description */}
                    <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                </View>
                {/* Food Allergy Row */}
                <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                    <QuestionMarkCircleIcon color={colours.grey} opacity={0.6} size={20} />
                    <Text className='pl-2 flex-1 text-md font-bold'>
                        Have a food allergy?
                    </Text>
                    <ChevronRightIcon color={colours.primary}/>
                </TouchableOpacity>
                {/* Menu */}
                <View className='pb-36'>
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
                    {/* Map each element of the dishes array into a DishRow component */}
                    {dishes.map(dish => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
        </>
    )
}

export default RestaurantScreen