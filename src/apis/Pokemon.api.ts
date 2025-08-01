import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const GetAllPokemon = async () => {
  const response: any = await api.get("/pokemon-cards");
  console.log(response.data);
  return response.data;
}

export const GetPokemonById = async (id: number) => {
  const response: any = await api.get(`/pokemon-cards/${id}`);
  console.log(response.data);
  return response.data;
}

export const getDeckList = async () => {
  const response: any = await api.get("/decks");
  console.log(response.data);
  return response.data;
}

export const postDeck = async (deck: { name: string, pokemonIds: number[] }) => {
  const token = localStorage.getItem('authToken');

  const response: any = await api.post("/decks", deck, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(response.data);
  return response.data;
}