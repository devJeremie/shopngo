// module.exports :
// C'est l'objet qui exporte la configuration de Jest pour votre projet.
module.exports = {

    // preset: 'jest-expo' :
    // Le 'preset' est un ensemble de configurations préétablies.
    // L'utilisation de 'jest-expo' garantit que Jest est configuré par défaut
    // pour fonctionner correctement avec l'environnement React Native et Expo,
    // en gérant automatiquement des aspects comme la transformation des fichiers
    // et l'environnement de test (comme nous l'avons vu dans la configuration précédente).
    preset: 'jest-expo',

    // setupFilesAfterEnv :
    // Ce tableau spécifie un ou plusieurs fichiers qui seront exécutés
    // pour mettre en place ou étendre l'environnement de test AVANT l'exécution des tests.
    // C'est l'endroit idéal pour :
    // 1. Charger des matchers personnalisés (comme ceux de @testing-library/jest-native).
    // 2. Configurer des mocks ou des variables globales nécessaires à tous les tests.
    // <rootDir> est une variable de Jest qui pointe vers la racine de votre projet.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};