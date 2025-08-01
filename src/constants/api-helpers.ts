import axios from "axios";

export const API_ENDPOINTS = {
    DECKS: '/decks',
    DECK_BY_ID: (id: number) => `/decks/${id}`
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const deleteDeck = async (id: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}${API_ENDPOINTS.DECK_BY_ID(id)}`;

    const headers = getAuthHeaders();

    return await axios.delete(url, headers);
};