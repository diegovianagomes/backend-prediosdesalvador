/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/client";

// Definição de tipos
export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
  bio: any[];
}

// Função para buscar autores
export async function getAuthors() {
  const authors = await client.fetch<Author[]>(`
    *[_type == "author"] {
      _id,
      name,
      slug,
      image,
      bio
    }
  `, {}, { next: { revalidate: 3600 } });
  
  return authors;
}

// Adicione outras consultas relacionadas aqui
export async function getSettings() {
  const settings = await client.fetch(`
    *[_type == "settings"][0]
  `, {}, { next: { revalidate: 3600 } });
  
  return settings;
}