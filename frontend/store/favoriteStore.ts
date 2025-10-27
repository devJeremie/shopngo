import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { Product } from "../lib/api";

interface FavoriteState {
    favoriteItems: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: number) => void;
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: number) => boolean;
    resetFavorite: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
    
)
