import '@testing-library/jest-native/extend-expect';
// Ceci est une instruction d'importation (généralement utilisée en dehors d'un module/fichier de code
// où elle n'a pas besoin d'être assignée à une variable).
// Son objectif est d'exécuter le code de la librairie '@testing-library/jest-native/extend-expect'.

// Rôle de cette ligne :
// Elle importe et active un ensemble de 'matchers' personnalisés (fonctions d'assertion)
// spécifiques à l'environnement de React Native Testing Library.
//
// Qu'est-ce qu'un 'matcher' ? C'est ce que vous utilisez après la fonction 'expect()'.
//
// Grâce à cette ligne, vous pouvez utiliser des assertions comme :
// - 'toBeOnTheScreen()' : Vérifie si un élément est visible à l'écran.
// - 'toBeDisabled()' : Vérifie si un bouton est désactivé.
// - 'toHaveTextContent()' : Vérifie si un élément contient un certain texte.
//
// Sans cette ligne dans votre setup global, Jest ne reconnaîtrait pas ces fonctions spécifiques
// lors de l'exécution de vos tests React Native.