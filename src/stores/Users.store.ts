import { defineStore } from "pinia";
import { ref } from 'vue';
import { PostUser, PostUserLogin } from '../apis/Users.api';
import type { IUserPayload } from '../types/Users.type';

export const useUserStore = defineStore('User', () => {
    const isAuthenticated = ref(false);
    const currentUserEmail = ref('');

    // Vérifier si l'utilisateur est déjà connecté au chargement de l'application
    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            isAuthenticated.value = true;
            currentUserEmail.value = localStorage.getItem('userEmail') || '';
        }
    };

    const register = async (userPayload: IUserPayload) => {
        try {
            const response = await PostUser(userPayload);
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            throw error;
        }
    };

    const login = async (userPayload: IUserPayload) => {
        try {
            const response = await PostUserLogin(userPayload);

            // Vérifier la structure de la réponse
            console.log('Structure de la réponse de connexion:', response);

            // Vérifier si le token existe dans la réponse
            if (!response.token) {
                console.error('Token manquant dans la réponse de connexion:', response);
                throw new Error('Token d\'authentification non trouvé dans la réponse');
            }

            // Stocker le token dans le localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userEmail', userPayload.email);

            // Mettre à jour l'état
            isAuthenticated.value = true;
            currentUserEmail.value = userPayload.email;

            return response;
        } catch (error) {
            console.error('Erreur détaillée lors de la connexion:', error);
            throw error;
        }
    };

    const logout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');

        // Mettre à jour l'état
        isAuthenticated.value = false;
        currentUserEmail.value = '';
    };

    // Initialiser l'état d'authentification
    checkAuth();

    return {
        isAuthenticated,
        currentUserEmail,
        register,
        login,
        logout,
        checkAuth
    };
});