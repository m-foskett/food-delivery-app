import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
// Sanity Client Import
import sanityClient from '../sanity'
// Custom Colour Palette Import
import colours from '../config/colours'
// Custom Reusable Component Imports
import RestaurantCard from './RestaurantCard'

const FeaturedRow = ({id, title, description}) => {
    // State Variables
    const [restaurants, setRestaurants] = useState([]);
    // GROQ Query to fetch the Featured Restaurants, Dishes etc. Store data in state variable
    useEffect(() => {
        sanityClient.fetch(
            `
                *[_type == "featured" && _id == $id] {
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type-> {
                            name
                        }
                    },
                }[0]
            `,
            {id: id}
        ).then(data => {
            setRestaurants(data?.restaurants);
        });
    }, [id]);

    return (
        <View className='pt-1'>
            {/* Title Row */}
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <TouchableOpacity>
                    <ArrowRightIcon color={colours.primary}/>
                </TouchableOpacity>
            </View>
            {/* Description Row */}
            <Text className='text-xs text-gray-500 px-4'>{description}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
            >
                {/* RestaurantCard */}
                {restaurants?.map(restaurant => (
                    // Custom Reusable Component: RestaurantCard
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow