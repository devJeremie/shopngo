import { Product } from '@/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ProductsState {
    products: Product[];
    categories: string[];
}

export const useProductStore = create<ProductsState>()(
    persist((set, get)=>({
        products: [],
        categories: [],
    }), {
    name: 'product-storage',
    storage: createJSONStorage(() => AsyncStorage),
    })
);