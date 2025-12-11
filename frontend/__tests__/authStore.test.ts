// frontend/__tests__/authStore.test.ts

// `act` permet d'encapsuler les appels asynchrones afin que les mises à jour
// de state soient correctement appliquées avant nos assertions.
import { act } from '@testing-library/react-native';

// On importe le store Zustand que l'on souhaite tester.
import { useAuthStore } from '../store/authStore';

// On MOCK le module Supabase pour ne jamais appeler le vrai backend pendant les tests.
// Chaque méthode est remplacée par une fonction mockable (jest.fn()).
jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(), // simulera la connexion
      signUp: jest.fn(),             // simulera l'inscription
      signOut: jest.fn(),            // simulera la déconnexion
      getSession: jest.fn(),         // simulera la récupération de session
    },
  },
}));

// On importe ensuite la version mockée de Supabase pour configurer les retours de ces fonctions.
import { supabase } from '../lib/supabase';

// Bloc de tests principal pour le store `useAuthStore`.
describe('useAuthStore', () => {
  // Ce hook s'exécute avant CHAQUE test.
  beforeEach(() => {
    // On récupère les helpers internes du store Zustand.
    const { getState, setState } = useAuthStore;

    // On réinitialise l'état du store pour que chaque test parte d'une base propre.
    setState({
      ...getState(),      // on garde les actions (login, signup, logout, checkSession)
      user: null,         // aucun utilisateur connecté
      isLoading: false,   // pas de chargement en cours
      error: null,        // aucune erreur active
    });

    // On remet à zéro tous les mocks Jest (compteurs d'appels + config).
    jest.clearAllMocks();
  });

  // Vérifie que l'état initial du store correspond bien à ce qui est attendu.
  it('état initial', () => {
    const state = useAuthStore.getState();

    // Au démarrage, il ne doit pas y avoir d'utilisateur connecté.
    expect(state.user).toBeNull();
    // Aucune opération en cours.
    expect(state.isLoading).toBe(false);
    // Aucun message d'erreur.
    expect(state.error).toBeNull();
  });

  // Teste le scénario d’un login qui se passe bien.
  it('login succès', async () => {
    // On configure le mock Supabase pour qu'il renvoie un utilisateur valide.
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@test.com' } },
      error: null,
    });

    // On récupère l'action `login` et l'état courant.
    const { login, user } = useAuthStore.getState();

    // Avant la connexion, il ne doit pas y avoir d'utilisateur.
    expect(user).toBeNull();

    // On lance la fonction de login et on garde la promesse pour l'attendre plus tard.
    const promise = login('test@test.com', 'password');

    // Juste après l'appel, le store doit être en mode chargement.
    expect(useAuthStore.getState().isLoading).toBe(true);

    // On attend la fin de l'opération dans un `act` pour laisser Zustand mettre
    // correctement à jour le state.
    await act(async () => {
      await promise;
    });

    // On récupère l'état final après la tentative de connexion.
    const state = useAuthStore.getState();

    // L'utilisateur du store doit correspondre à celui renvoyé par Supabase.
    expect(state.user).toEqual({ id: '123', email: 'test@test.com' });
    // Le chargement doit être terminé.
    expect(state.isLoading).toBe(false);
    // Aucune erreur ne doit être présente.
    expect(state.error).toBeNull();
  });

  // Teste le scénario d’un login qui échoue (mauvais identifiants, etc.).
  it('login erreur', async () => {
    // On configure Supabase pour renvoyer une erreur et aucun utilisateur.
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: { message: 'Bad credentials' },
    });

    // On récupère seulement l'action `login`.
    const { login } = useAuthStore.getState();

    // On exécute le login dans un `act` pour laisser le temps au state de se mettre à jour.
    await act(async () => {
      await login('bad@test.com', 'wrong');
    });

    // On récupère l'état après l'échec de la connexion.
    const state = useAuthStore.getState();

    // L'utilisateur doit rester null.
    expect(state.user).toBeNull();
    // Plus de chargement en cours.
    expect(state.isLoading).toBe(false);
    // Le message d'erreur doit correspondre à celui de Supabase.
    expect(state.error).toBe('Bad credentials');
  });

  // Teste le scénario d’une déconnexion réussie.
  it('logout succès', async () => {
    // On prépare un état où l'utilisateur est déjà connecté.
    useAuthStore.setState({
      user: { id: '123', email: 'test@test.com' }, // utilisateur fictif
      isLoading: false,
      error: null,
      // On réinjecte les actions existantes pour ne pas les perdre lors du setState.
      login: useAuthStore.getState().login,
      signup: useAuthStore.getState().signup,
      logout: useAuthStore.getState().logout,
      checkSession: useAuthStore.getState().checkSession,
    });

    // On configure Supabase pour que la déconnexion se passe bien (aucune erreur).
    (supabase.auth.signOut as jest.Mock).mockResolvedValueOnce({
      error: null,
    });

    // On récupère l'action `logout`.
    const { logout } = useAuthStore.getState();

    // On lance la déconnexion et on conserve la promesse.
    const promise = logout();

    // Juste après l'appel, isLoading doit passer à true.
    expect(useAuthStore.getState().isLoading).toBe(true);

    // On attend la fin de la déconnexion dans un `act`.
    await act(async () => {
      await promise;
    });

    // On récupère l'état final après la déconnexion.
    const state = useAuthStore.getState();

    // L'utilisateur doit être complètement réinitialisé.
    expect(state.user).toBeNull();
    // Le chargement doit être terminé.
    expect(state.isLoading).toBe(false);
    // Aucune erreur ne doit être présente.
    expect(state.error).toBeNull();
  });
});
