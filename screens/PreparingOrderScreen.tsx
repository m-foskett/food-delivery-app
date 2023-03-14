import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
// Animatable Import
import * as Animatable from 'react-native-animatable';
// Progress Bar Import
import * as Progress from 'react-native-progress';
// Custom Colour Palette Import
import colours from '../config/colours';

const PreparingOrderScreen = () => {
    // Navigation Prop
    const navigation = useNavigation();
    // After allocated time, navigate to the DeliveryScreen
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery");
        }, 4000);
    }, [])
    return (
        <SafeAreaView className='bg-primary flex-1 justify-center items-center'>
            {/* Preparaing Order Animation */}
            <Animatable.Image
                source={require("../assets/deliverooPreparingOrder.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />
            {/* Animated Text */}
            <Animatable.Text
                animation="slideInUp"
                iterationCount={2}
                className="text-lg my-10 text-white font-bold text-center"
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>
            {/* Progress Circle */}
            <Progress.Circle size={60} indeterminate={true} color={colours.white} />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen