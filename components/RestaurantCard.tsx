import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
// Custom Colour Palette Import
import colours from '../config/colours'
// Custom Image Handling Function Import
import { urlFor } from '../sanity'

const RestaurantCard = ({
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
}) => {
    // Navigation Prop Declaration
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Restaurant", {
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
                });
            }}
            className='bg-white shadow mr-3 mt-1'
        >
            {/* Restaurant Image */}
            <Image
                source={{
                    uri: urlFor(imgUrl).width(800).url(),
                }}
                className='h-36 w-64 rounded-sm'
            />
            {/* Restaurant Information Tab */}
            <View className='px-3 w-60'>
                {/* Restaurant Title */}
                <Text className='font-bold text-lg pt-2'>{title}</Text>
                {/* Restaurant Rating */}
                <View className='flex-row items-center space-x-1'>
                    <StarIcon color={colours.secondary} opacity={0.5} size={22}/>
                    <Text className='text-xs text-gray-500'>
                        <Text className='text-green-500'>{rating}</Text> - {genre}
                    </Text>
                </View>
                {/* Restaurant Address */}
                <View className='flex-row items-center space-x-1'>
                    <MapPinIcon color={colours.grey} opacity={9.4} size={22} />
                    <Text className='text-xs text-gray-500'>Nearby - {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard