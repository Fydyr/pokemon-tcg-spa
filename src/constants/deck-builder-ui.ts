// UI text constants pour DeckBuilder
export const DECK_BUILDER_UI = {
    // Titres et sous-titres
    DECK_TITLE: 'Mon Deck de Pokémon',
    COLLECTION_TITLE: 'Collection de Pokémon',

    // Authentification
    AUTH_CONNECTED_AS: 'Connecté en tant que',
    AUTH_NOT_CONNECTED: 'Non connecté - Connectez-vous pour sauvegarder votre deck',
    AUTH_LOGIN_BUTTON: 'Se connecter',

    // Deck header
    DECK_NAME_PLACEHOLDER: 'Nom du deck',
    SAVE_DECK_BUTTON: 'Sauvegarder le deck',
    POKEMON_COUNT_LABEL: 'Pokémon',
    TYPES_COUNT_LABEL: 'Types',

    // Empty states
    EMPTY_DECK: 'Aucun Pokémon dans le deck',
    EMPTY_SEARCH: 'Aucun Pokémon trouvé',

    // Search
    SEARCH_PLACEHOLDER: 'Rechercher un Pokémon',

    // Buttons
    DETAILS_BUTTON: 'Voir les détails',
    ADD_TO_DECK_BUTTON: 'Ajouter au deck',

    // Messages
    ALREADY_IN_DECK: (name: string) => `${name} est déjà dans votre deck!`,
    ADDED_TO_DECK: (name: string) => `${name} ajouté à votre deck!`,
    REMOVED_FROM_DECK: (name: string) => `${name} retiré de votre deck`,
    EMPTY_DECK_NAME: 'Le nom du deck ne peut pas être vide',
    EMPTY_DECK_POKEMON: 'Vous devez ajouter au moins un Pokémon au deck',
    INVALID_POKEMON_IDS: 'Certains Pokémon ont des identifiants invalides',
    DECK_SAVED_SUCCESS: (name: string) => `Deck "${name}" sauvegardé avec succès!`,
    MISSING_DECK_NAME: 'Veuillez nommer votre deck et ajouter au moins un Pokémon',
    MUST_BE_LOGGED_IN: 'Vous devez être connecté pour sauvegarder un deck',
    POKEMON_LOADING_ERROR: 'Une erreur est survenue lors du chargement des Pokémon'
};