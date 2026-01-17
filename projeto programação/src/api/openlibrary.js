// URLS do Open Library — usa o proxy em desenvolvimento
const GET_URL = import.meta.env.DEV ? '/api/openlibrary/' : 'https://openlibrary.org/works/'
const FETCH_URL = import.meta.env.DEV ? '/api/openlibrary/search/' : 'https://openlibrary.org/search.json?'
const COVER_URL = import.meta.env.DEV ? '/api/covers/' : 'https://covers.openlibrary.org/b/'


export async function GetBook(endpoint) {
  try {
    const res = await fetch(`${GET_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return null;
  }
}

export async function GetCover(params) {
  try {
    const res = await fetch(`${COVER_URL}${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar capa:", error);
    return null;
  }
}