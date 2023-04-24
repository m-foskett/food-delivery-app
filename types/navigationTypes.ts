// See the RN Navigation Docs for implementation details
// https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Dish = {
    _id: string;
    name: string;
    short_description: string;
    price: string;
    image: string;
}

export type RootStackParamList = {
    Home: undefined;
    Restaurant: {
        id: string;
        imgUrl: string;
        title: string;
        rating: string;
        genre: string;
        address: string;
        short_description: string;
        dishes: Dish[],
        long: number;
        lat: number;
    };
    Basket: undefined;
    PreparingOrder: undefined;
    Delivery: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}