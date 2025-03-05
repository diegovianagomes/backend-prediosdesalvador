/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AuthorCard.tsx
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Configuração do builder de imagens
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface AuthorProps {
  author: {
    name: string;
    image?: any;
    bio?: any[];
    slug?: {
      current: string;
    };
  };
}

export default function AuthorCard({ author }: AuthorProps) {
  // Se não tiver autor, não renderiza nada
  if (!author) return null;
  
  const authorImageUrl = author.image 
    ? urlFor(author.image).width(100).height(100).url() 
    : null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Imagem do autor */}
        <div className="flex-shrink-0 items-center justify-center">
          {authorImageUrl ? (
            <Image
              src={authorImageUrl}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          )}
        </div>
        
        {/* Informações do autor */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-lg font-bold">{author.name}</h3>
          
          {/* Bio do autor (se existir) */}
          {author.bio && author.bio.length > 0 && (
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm font-light prose-sm prose dark:prose-invert">
              {/* Se você quiser renderizar a bio como PortableText */}
              {/* <PortableText value={author.bio} /> */}
              
              {/* Alternativa simples para texto */}
              <p>
                {author.bio.map((block: any) => 
                  block.children ? block.children.map((child: any) => child.text).join('') : ''
                ).join(' ')}
              </p>
            </div>
          )}
          
          {/* Link para página do autor (se você tiver) */}
          {author.slug && (
            <div className="mt-3">
              <Link 
                href={`/autor/${author.slug.current}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Ver todos os artigos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}