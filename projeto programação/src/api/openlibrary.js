// URL base do Open Library — usa o proxy em desenvolvimento
const BASE_URL = import.meta.env.DEV ? '/api/openlibrary/' : 'https://openlibrary.org/works/'

export async function GetBook(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return null;
  }
}
