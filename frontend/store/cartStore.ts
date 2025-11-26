import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/type";

// Représente un article dans le panier avec le produit et sa quantité
interface CartItem {
    product: Product;
    quantity: number;
}
// Définit la forme du store du panier et toutes les actions disponibles
interface CartState {
    items: CartItem[];                                               // Liste des articles dans le panier
    addItem: (product: Product, quantity?: number) => void;          // Ajouter un produit au panier
    removeItem: (productId: number) => void;                         // Supprimer un produit du panier
    updateQuantity: (productId: number, quantity: number) => void;   // Modifier la quantité d'un produit dans le panier
    clearCart: () => void;                                           // Vider complètement le panier
    getTotalPrice: () => number;                                     // Calculer le prix total des articles dans le panier
    getItemCount: () => number;                                      // Obtenir le nombre total d'articles dans le panier 
}
// Hook Zustand pour gérer l’état du panier avec persistance dans AsyncStorage
export const useCartStore=create<CartState>()(
    persist(
        (set, get) => ({
            // État initial : panier vide
            items: [],
            // Ajoute un produit au panier (par défaut quantity = 1)
            addItem: (product: Product, quantity: number = 1) => {
                set((state) => {
                    // Vérifie si le produit est déjà dans le panier
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    );
                    // Si le produit existe déjà, on incrémente simplement la quantité
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                            ),
                        };
                    } else {
                        // Sinon, on ajoute un nouvel élément dans le panier
                        return { 
                            items: [ ...state.items, { product, quantity}],
                        }
                    }
                });
            },
            // Supprime complètement un produit du panier à partir de son id
            removeItem: (productId: number) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },
            // Met à jour la quantité d’un produit donné
            updateQuantity: (productId: number, quantity: number) => {
                // Si la quantité est <= 0, on retire l’article du panier
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                // Sinon, on met à jour la quantité pour le produit ciblé
                set((state) =>({
                    items: state.items.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },
            // Vide complètement le panier
            clearCart: () => {
                set({ items: [] });
            },
            // Calcule le prix total du panier (somme des prix * quantités)
            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
            // Calcule le nombre total d’articles (somme des quantités)
            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            // Nom de la clé de stockage dans AsyncStorage
            name: "cart-storage",
            // Utilise AsyncStorage avec un stockage JSON pour persister le panier
            storage: createJSONStorage(() => AsyncStorage), 
        }
    )
);