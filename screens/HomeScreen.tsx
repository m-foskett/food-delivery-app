import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon, } from "react-native-heroicons/outline";
// Sanity Client Import
import sanityClient from '../sanity';
// Custom Colour Palette Import
import colours from '../config/colours';
// Custom Reusable Component Imports
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {
  // State Variables
  const [featuredCategories, setFeaturedCategories] = useState([]);
  // Navigation Prop
  const navigation = useNavigation();
  // Disable header on component render
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  // GROQ Query to fetch the Featured Restaurants, store in state variable
  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
          },
        }
      `
    ).then(data =>{
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-6 pb-10'>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        {/* Header Logo */}
        <Image
          source={require("../assets/motorbike.jpg")}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        {/* Location Dropdown */}
        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now</Text>
          <TouchableOpacity>
            <Text className='font-bold text-xl'>Current Location <ChevronDownIcon size={20} color={colours.primary} /></Text>
          </TouchableOpacity>
        </View>
        {/* Profile Icon */}
        <TouchableOpacity>
          <UserIcon size={35} color={colours.primary}/>
        </TouchableOpacity>
      </View>
      {/* Restaurant Search Bar */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3'>
          <MagnifyingGlassIcon color={colours.grey} size={20}></MagnifyingGlassIcon>
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default'/>
        </View>
        <TouchableOpacity>
          <AdjustmentsVerticalIcon color={colours.primary} />
        </TouchableOpacity>
      </View>
      {/* {Body} */}
      <ScrollView className='bg-gray-100' contentContainerStyle={{paddingBottom:100}}>
          {/* Custom Reusable Component: Categories (Horizontal Scroll Container) */}
          <Categories/>
          {/* Featured Categories - Queried from Sanity.io */}
          {featuredCategories?.map(category => (
            // Custom Reusable Component: FeaturedRow (Horizontal Scroll Container)
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen