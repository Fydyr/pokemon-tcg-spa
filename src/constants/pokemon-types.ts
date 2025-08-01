interface TypeStyle {
    color: string;
    textColor: string;
    gradient: string;
}

export interface PokemonTypeStyles {
    [key: string]: TypeStyle;
}

export const POKEMON_TYPES: PokemonTypeStyles = {
    'Grass': {
        color: '#78C850',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #78C850 0%, #4CAF50 100%)'
    },
    'Fire': {
        color: '#F08030',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #F08030 0%, #FF5722 100%)'
    },
    'Water': {
        color: '#6890F0',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #6890F0 0%, #2196F3 100%)'
    },
    'Normal': {
        color: '#A8A878',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #A8A878 0%, #9E9E9E 100%)'
    },
    'Electric': {
        color: '#F8D030',
        textColor: 'black',
        gradient: 'linear-gradient(135deg, #F8D030 0%, #FFC107 100%)'
    },
    'Ice': {
        color: '#98D8D8',
        textColor: 'black',
        gradient: 'linear-gradient(135deg, #98D8D8 0%, #80DEEA 100%)'
    },
    'Fighting': {
        color: '#C03028',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #C03028 0%, #F44336 100%)'
    },
    'Poison': {
        color: '#A040A0',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #A040A0 0%, #9C27B0 100%)'
    },
    'Ground': {
        color: '#E0C068',
        textColor: 'black',
        gradient: 'linear-gradient(135deg, #E0C068 0%, #795548 100%)'
    },
    'Flying': {
        color: '#A890F0',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #A890F0 0%, #9C27B0 100%)'
    },
    'Psychic': {
        color: '#F85888',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #F85888 0%, #E91E63 100%)'
    },
    'Bug': {
        color: '#A8B820',
        textColor: 'black',
        gradient: 'linear-gradient(135deg, #A8B820 0%, #8BC34A 100%)'
    },
    'Rock': {
        color: '#B8A038',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #B8A038 0%, #795548 100%)'
    },
    'Ghost': {
        color: '#705898',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #705898 0%, #673AB7 100%)'
    },
    'Dragon': {
        color: '#7038F8',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #7038F8 0%, #3F51B5 100%)'
    },
    'Dark': {
        color: '#705848',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #705848 0%, #424242 100%)'
    },
    'Steel': {
        color: '#B8B8D0',
        textColor: 'black',
        gradient: 'linear-gradient(135deg, #B8B8D0 0%, #9E9E9E 100%)'
    },
    'Fairy': {
        color: '#EE99AC',
        textColor: 'white',
        gradient: 'linear-gradient(135deg, #EE99AC 0%, #E91E63 100%)'
    }
};

export const getTypeColor = (type: string): string => {
    const typeStyle = POKEMON_TYPES[type] || POKEMON_TYPES['Normal'];
    return `background-color: ${typeStyle.color}; color: ${typeStyle.textColor};`;
};

export const getTypeBackgroundColor = (type: string): string => {
    const typeStyle = POKEMON_TYPES[type] || POKEMON_TYPES['Normal'];
    return `background: ${typeStyle.gradient};`;
};

export const getTypeHexColor = (type: string): string => {
    return POKEMON_TYPES[type]?.color || '#9E9E9E';
};

export const getTypeTextColor = (type: string): string => {
    return POKEMON_TYPES[type]?.textColor || 'white';
};

export const getTypeGradient = (type: string): string => {
    return POKEMON_TYPES[type]?.gradient || 'linear-gradient(135deg, #9E9E9E 0%, #616161 100%)';
};

export const DARK_TEXT_TYPES = ['Electric', 'Ice', 'Bug', 'Ground', 'Steel'];