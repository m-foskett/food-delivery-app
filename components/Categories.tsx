import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity';

// Reusable Component: Categories
//  - To be used in combination with CategoryCard component
const Categories = () => {
  // State Variables
  const [categories, setCategories] = useState([]);
  // GROQ Query to fetch the Menu Categories, store in state variable
  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "category"]
      `
    ).then(data => {
      setCategories(data);
    })
  }, [])

  return (
    <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
        {/* Map each element of the categories array into a CategoryCard component */}
        {categories?.map((category) => (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        ))}
    </ScrollView>
  )
}

export default Categories