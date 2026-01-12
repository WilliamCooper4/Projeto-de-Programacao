// URL base do JSON Server (alterar conforme necessário)
const BASE_URL = 'https://openlibrary.org/works/'

export async function GetBook(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json(); // returns only the parsed object
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return null; // or `throw error` if you prefer propagating errors
  }
}
