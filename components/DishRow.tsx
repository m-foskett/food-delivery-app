import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { formatCurrency, } from "react-native-format-currency";
import { MinusCircleIcon,  PlusCircleIcon} from 'react-native-heroicons/solid';
// Custom Image Handling Function Import
import { urlFor } from '../sanity';
// Custom Colour Palette Import
import colours from '../config/colours';
// Redux useDispatch, useSelector Hook Import
import { useDispatch, useSelector} from "react-redux";
// Custom Redux Slice Actions Import
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({id, name, description, price, image }) => {
    // State Variables
    const [isPressed, setIsPressed] = useState(false);
    // Acquiring state of Redux Store to get the Dish items currently in the basket with given id
    const items = useSelector(state => selectBasketItemsWithId(state, id));
    // Format the dish price with Local Currency Symbol
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: price, code: "AUD" });
    // Dispatch Prop Declaration
    const dispatch = useDispatch();
    // Custom Function: addItemToBasket
    //  - Dispatches the addToBasket action with payload
    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}));
    }
    // Custom Function: removeItemToBasket
    //  - Dispatches the removeFromBasket action with payload
    const removeItemFromBasket = () => {
        if (!(items.length > 0)) return;
        dispatch(removeFromBasket({id}))
    }

    return (
        <>
            {/* TouchableOpacity: onPress set the state variable to render the additional item count component */}
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`
                    bg-white border p-4 border-gray-200 ${
                    isPressed && "border-b-0"
                }`}
            >
                {/* DishRow Base Container */}
                <View className='flex-row'>
                    {/* Dish Info */}
                    <View className='flex-1 pr-2'>
                        {/* Dish Name */}
                        <Text className='text-lg mb-1 font-bold'>{name}</Text>
                        {/* Dish Description */}
                        <Text className='text-gray-400'>{description}</Text>
                        {/* Dish Price */}
                        <Text className="text-gray-400 mt-2">{valueFormattedWithSymbol}</Text>
                    </View>
                    <View>
                        {/* Dish Image */}
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: colours.offgrey,
                            }}
                            source={{uri: urlFor(image).url()}}
                            className="h-20 w-20 bg-gray-300 p-4"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        {/* If the Component has been pressed, display item count and count adjustment buttons */}
        {isPressed && (
            <View className='bg-white px-4'>
                <View className='flex-row items-center space-x-2 pb-3'>
                    {/* Remove one count of the item from the Global Store */}
                    <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                        <MinusCircleIcon color={items.length > 0 ? colours.primary: colours.grey} size={40}/>
                    </TouchableOpacity>
                    {/* Current Item Count */}
                    <Text>{items.length}</Text>
                    {/* Add one count of the item to the Global Store */}
                    <TouchableOpacity onPress={addItemToBasket} >
                        <PlusCircleIcon
                            color={colours.primary}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </>
    );
};

export default DishRow