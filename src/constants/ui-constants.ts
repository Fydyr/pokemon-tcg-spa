// UI Text Constants
export const UI_TEXT = {
    PAGE_TITLE: 'Collection de Decks Pokémon',
    PAGE_SUBTITLE: 'Gérez votre collection de decks Pokémon',

    // Card titles
    DECKS_CARD_TITLE: 'Mes Decks',
    DECK_DETAILS_TITLE: 'Détails du deck',

    // Button labels
    BUTTON_DETAILS: 'Détails',
    BUTTON_DELETE: 'Supprimer',
    BUTTON_CLOSE: 'Fermer',
    BUTTON_LOGIN: 'Se connecter',
    BUTTON_CREATE_DECK: 'Créer un deck',

    // Confirmation dialog
    DELETE_CONFIRM_TITLE: 'Confirmer la suppression',
    DELETE_CONFIRM_MESSAGE: 'Êtes-vous sûr de vouloir supprimer ce deck?',
    DELETE_CONFIRM_WARNING: 'Cette action est irréversible.',
    DELETE_CONFIRM_ACCEPT: 'Supprimer',
    DELETE_CONFIRM_CANCEL: 'Annuler',

    // Empty states
    EMPTY_STATE_LOADING: 'Chargement de vos decks...',
    EMPTY_STATE_NOT_AUTHENTICATED: 'Veuillez vous connecter pour voir vos decks',
    EMPTY_STATE_NO_DECKS: 'Vous n\'avez pas encore créé de deck',
    EMPTY_STATE_NO_POKEMON: 'Ce deck ne contient aucun Pokémon',

    // Other UI text elements
    DECK_TYPES_LABEL: 'Types:',
    POKEMON_STATS_HEIGHT: 'Taille:',
    POKEMON_STATS_WEIGHT: 'Poids:'
};

export const MESSAGES = {
    SUCCESS_DECK_DELETED: (deckName: string) => `Deck "${deckName}" supprimé avec succès`,

    ERROR_LOAD_DECKS: 'Impossible de charger la liste des decks',
    ERROR_DELETE_DECK: 'Impossible de supprimer ce deck',
    ERROR_LOAD_DECK_DETAILS: 'Impossible de charger les détails du deck',
    ERROR_AUTHENTICATION: 'Token d\'authentification non trouvé',
    ERROR_POKEMON_LOAD: (id: number) => `Erreur lors du chargement du Pokémon ID ${id}`
};

export const LOADING_MESSAGES = {
    DECK_DETAILS: 'Chargement des Pokémon...'
};

export const CSS_CLASSES = {
    DECK_COLLECTION_CONTAINER: 'deck-collection-container',
    PAGE_HEADER: 'page-header',
    HEADER_CONTENT: 'header-content',
    POKEBALL_DECORATION: 'pokeball-decoration',
    DECKS_CARD: 'decks-card',
    CARD_HEADER: 'card-header',
    CARD_TITLE: 'card-title',
    TABLE_CONTAINER: 'table-container',
    DECKS_TABLE: 'decks-table',
    DECK_NAME: 'deck-name',
    ACTION_BUTTONS: 'action-buttons',
    EMPTY_STATE: 'empty-state',
    WARNING_ICON: 'warning-icon',
    DELETE_CONFIRMATION_CONTENT: 'delete-confirmation-content',
    WARNING_TEXT: 'warning-text',
    DECK_DETAILS_CONTENT: 'deck-details-content',
    DECK_TYPES_SUMMARY: 'deck-types-summary',
    TYPE_LABEL: 'type-label',
    TYPE_TAGS: 'type-tags',
    POKEMON_GRID: 'pokemon-grid',
    POKEMON_CARD: 'pokemon-card',
    POKEMON_CARD_INNER: 'pokemon-card-inner',
    POKEMON_HEADER: 'pokemon-header',
    POKEMON_ID: 'pokemon-id',
    POKEMON_HP: 'pokemon-hp',
    POKEMON_IMAGE_CONTAINER: 'pokemon-image-container',
    POKEMON_IMAGE: 'pokemon-image',
    POKEMON_INFO: 'pokemon-info',
    POKEMON_TYPE: 'pokemon-type',
    POKEMON_STATS: 'pokemon-stats',
    STAT: 'stat',
    STAT_LABEL: 'stat-label',
    STAT_VALUE: 'stat-value',
    MODAL_FOOTER: 'modal-footer'
};