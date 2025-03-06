/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Configuração do builder de imagens
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Definição de tipos
interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
  bio: any[];
}

// Função para buscar autores
async function getAuthors() {
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

export default async function Sobre() {
  const authors = await getAuthors();
  
  return (
    <Container>

      {authors && authors.length > 0 && (
        <div className="mt-8 mb-8 md:mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 mx-auto mt-12 max-w-3xl">
            {authors.map(author => {
              const imageUrl = author?.image ? urlFor(author.image).width(500).height(500).url() : null;
              
              return (
                <div key={author._id} className="flex flex-col items-center rounded-lg p-6 ">
                  <div className="relative w-full h-48 overflow-hidden rounded-8 mb-4 bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-700">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={author?.name || "Membro da equipe"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-4 text-left text-gray-800 dark:text-white">{author.name}</h3>
                  
                  {/* Bio com tratamento adequado para PortableText */}
                  <div className="text-sm text-gray-600  text-left dark:text-gray-300 mb-4">
                    {Array.isArray(author.bio) 
                      ? author.bio.map((block: any) => 
                          block.children 
                            ? block.children.map((child: any) => child.text).join(' ')
                            : ''
                        ).join(' ').substring(0, 150) + (author.bio.length > 0 ? '...' : '')
                      : typeof author.bio === 'string'
                        ? author.bio
                        : 'Membro da equipe do projeto Prédios de Salvador'}
                  </div>
                  
                  {/* Ícones de redes sociais alinhados à esquerda */}
                  <div className="w-full flex justify-start mt-2 space-x-3">
                    {/* Ícone LinkedIn */}
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#D7E9F3] hover:text-[#9CC0E9] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      aria-label={`LinkedIn de ${author.name}`}
                    >
                      <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.223 0h.002z" />
                      </svg>
                    </a>
                    
                    {/* Ícone de e-mail */}
                    <a 
                      href={`mailto:contato@prediosdesalvador.com.br`}
                      className="text-[#D7E9F3] hover:text-[#9CC0E9] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      aria-label={`Email de ${author.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto mt-12 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="block w-full  p-6 ">
            
            <h2 className="mb-4 text-xl font-bold text-pretty ">Nossa Missão</h2>
            <p className="mt-6 text-base/7">
              O projeto <strong>Prédios de Salvador</strong> nasceu da paixão pela rica história 
              arquitetônica da cidade. Nossa missão é documentar, preservar e compartilhar o 
              patrimônio edificado de Salvador, primeira capital do Brasil e cidade com um dos 
              mais importantes conjuntos arquitetônicos coloniais das Américas.

              
            </p>
            <p className="mt-6 text-base/7">
              Através de fotografias detalhadas, plantas arquitetônicas, dados históricos e 
              análises técnicas, buscamos criar um acervo digital acessível a pesquisadores, 
              estudantes, arquitetos e entusiastas da história de Salvador.
              Através de fotografias detalhadas, plantas arquitetônicas, dados históricos e 
              análises técnicas, buscamos criar um acervo digital acessível a pesquisadores, 
              estudantes, arquitetos e entusiastas da história de Salvador.
            </p>
            
            
              
            
          </div>
          
          <div className="block w-full p-6 ">
            
            <h2 className="mb-4 text-xl font-bold">Objetivos</h2>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 sm:mt-10">
              <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-[#9CC0E9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
                
                Documentar edifícios históricos e contemporâneos relevantes para a paisagem urbana de Salvador</li>
              <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-[#9CC0E9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
                Criar um catálogo interativo acessível a todos os públicos</li>
              <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-[#9CC0E9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
                
                Promover a conscientização sobre a importância da preservação do patrimônio</li>
              <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-[#9CC0E9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
                
                Servir como fonte de pesquisa para estudantes e profissionais da arquitetura e urbanismo</li>
              <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-[#9CC0E9]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                 </svg>
                
                Colaborar com instituições e iniciativas dedicadas à preservação do patrimônio</li>
            </ul>
          </div>
          
        </div>

        {/*<div className="mt-8 block p-6 ">
          <div className="mb-4 text-xl font-bold ">
            <h2 className=" text-xl font-bold">Parcerias</h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <Image
                src="/pds-logo.svg"
                alt=""
                width={240}
                height={240}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />

              <Image
                src="/pds-logo.svg"
                alt=""
                width={240}
                height={240}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />

              <Image
                src="/pds-logo.svg"
                alt=""
                width={240}
                height={240}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />

              <Image
                src="/pds-logo.svg"
                alt=""
                width={240}
                height={240}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />  

              <Image
                src="/pds-logo.svg"
                alt=""
                width={240}
                height={240}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />            
            </div>
            
          </div>
        </div>*/}

        <div className="mt-8 block p-6 ">
          <h2 className="mb-4 text-xl font-bold ">Colabore Conosco</h2>
          <p>
            Acreditamos no poder da colaboração. Se você tem conhecimentos, fotografias ou 
            documentos históricos sobre edificações de Salvador e gostaria de contribuir com 
            o projeto, entre em contato conosco.
          </p>
        </div>
        
        
        <div className="mt-8 flex justify-center">
          <Link 
            href="/contato" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Entre em Contato
          </Link>
        </div>
      </div>
    </Container>
  );
}