import { Product } from "@/type";

const API_URL = "https://fakestoreapi.com";

//All products
// Récupérer tous les produits
const getProducts = async (): Promise<Product[]> => {
    try {
        // Appel API à endpoint /products
       const response = await fetch(`${API_URL}/products`);
       if (!response.ok) {
        // Gestion de l'erreur si la réponse n'est pas OK (status >= 400)
        throw new Error('Network response was not ok');
       }
        // Conversion du corps de réponse JSON en tableau de produits typés
       return await response.json();
    } catch (error) {
        // Log de l'erreur en console puis relance de l'erreur
        console.log('Error fetching products:', error);
        throw error;
    }
};

// Single Product
// Récupère un produit unique par son identifiant (id)
export const getProduct = async (id:number): Promise<Product> => {
    try {
        // Effectue une requête fetch vers l'API pour récupérer un produit spécifique
        const response = await fetch(`${API_URL}/products/${id}`);
        // Vérifie si la réponse est OK (code HTTP 200-299)
        if (!response.ok) {
            // Lance une erreur si la réponse n'est pas correcte
            throw new Error('Network response was not ok');
        }
        // Retourne les données JSON converties en objet Product
        return await response.json();
    } catch (error) {
        // Affiche une erreur dans la console en indiquant l'id du produit concerné
        console.error('Error fetching product with id ${id}:', error);
        // Relance l'erreur pour être gérée ailleurs
        throw error;
    }
};

//All Categories
// Récupère toutes les catégories de produits disponibles
const getCategories = async (): Promise<string[]> => {
    try {
        // Effectue une requête fetch pour obtenir la liste des catégories
        const response = await fetch(`${API_URL}/products/categories`);
        // Vérifie la validité de la réponse
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Retourne la liste des catégories sous forme de tableau de chaînes
        return await response.json();
    } catch (error) {
        // Affiche une erreur lors de la récupération des catégories
        console.log('Error fetching products:', error);
        // Relance l'erreur
        throw error;
    }
};
// Récupère les produits appartenant à une catégorie spécifique
const getProductsByCategory = async ( category: string ): Promise<Product[]> => {
    try {
        // Effectue une requête fetch vers l'API pour obtenir les produits d'une catégorie donnée
        const response = await fetch(`${API_URL}/products/category/${category}`);
        // Vérifie que la réponse est correcte
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        // Retourne le tableau des produits récupérés
        return await response.json();
    } catch (error) {
        // Affiche une erreur si la récupération échoue, en affichant la catégorie concernée
        console.error(`Failed to fetch products in category ${category}:`, error);
        // Relance l'erreur
        throw error;
    }
};
// Recherche des produits dont le titre, la description ou la catégorie correspondent à un terme donné
const searchProductsApi = async (query: string): Promise<Product[]> => {
    try {
        // Effectue une requête fetch pour obtenir tous les produits
        const response = await fetch (`${API_URL}/products`);
        // Vérifie la validité de la réponse
        if (!response.ok) {
           throw new Error("Network response was not ok");
        }
        // Récupère la liste des produits
        const products = await response.json();
        // Prépare le terme de recherche en minuscule et sans espaces superflus
        const searchTerm = query.toLowerCase().trim();
        // Filtre les produits dont le titre, la description ou la catégorie contient le terme recherché
        return products.filter(
            (product :Product) => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
        );
    } catch (error) {
        // Affiche une erreur en cas d'échec de la recherche
        console.error("Failed to search  products:", error);
        // Relance l'erreur
        throw error;
    }
};

// Export des fonctions pour qu'elles soient utilisables dans d'autres modules
export { getProducts, getCategories, getProductsByCategory, searchProductsApi };

