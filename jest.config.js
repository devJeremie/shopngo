// On importe la fonction 'getDefaultConfig' depuis 'jest-expo'.
// Cette fonction permet de récupérer la configuration de base de Jest optimisée 
// pour les projets Expo/React Native.
const { getDefaultConfig } = require('jest-expo');

// On exporte le module de configuration de Jest (l'objet qui contient tous les paramètres).
module.exports = {
    // ...getDefaultConfig(__dirname) :
    // On utilise l'opérateur de décomposition (spread operator) pour inclure TOUS
    // les paramètres par défaut fournis par 'jest-expo' pour votre environnement.
    // __dirname est passé pour indiquer le répertoire de base du projet.
    ...getDefaultConfig(__dirname),
    // setupFilesAfterEnv :
    // C'est un tableau de chemins d'accès vers des fichiers qui seront exécutés
    // APRÈS la configuration de chaque environnement de test, mais AVANT l'exécution des tests eux-mêmes.
    // C'est l'endroit typique pour :
    // 1. Importer des bibliothèques de mocking globales (comme jest-dom ou @testing-library/react-native).
    // 2. Configurer des mocks globaux pour des modules natifs.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // transformIgnorePatterns :
    // C'est un tableau d'expressions régulières (regex) de chemins de fichiers
    // que Jest ne doit PAS traiter (transformer) avec Babel ou d'autres outils.
    // Par défaut, Jest ignore tout ce qui se trouve dans 'node_modules'.
    transformIgnorePatterns: [
        // La regex ci-dessous est cruciale pour React Native/Expo.
        // Elle indique à Jest d'IGNORER la plupart des modules dans 'node_modules/',
        // MAIS de transformer (c'est-à-dire, de les compiler avec Babel) certains modules
        // spécifiques au mobile/Expo (comme 'react-native', 'expo', 'react-navigation', etc.).
        // Ces modules doivent être transformés car ils ne sont souvent pas publiés
        // sous une forme compatible avec Jest par défaut (par exemple, ils peuvent contenir
        // du code ES6 ou JSX qui doit être transpilé).
        'node_modules/(?!(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)'
    ],
};