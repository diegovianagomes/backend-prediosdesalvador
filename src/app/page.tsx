/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Container from "@/components/container";
import { cx } from "@/utils/all";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Pagination from "@/components/Pagination";

interface Post extends SanityDocument {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string | any[];
  mainImage?: any;
  categories?: string[];
  categoryColors?: string[];
  author?: { name: string; image?: any };
}
// Configuração do builder de imagens
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const POSTS_PER_PAGE = 6; // 6 posts per page (showing 2 featured + 6 regular)

// Query para buscar posts com categorias e autores
const POSTS_QUERY = `{
  "posts": *[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...8]{
    _id, 
    title, 
    slug, 
    publishedAt,
    excerpt,  
    mainImage,
    "categories": categories[]->title,
    "categoryColors": categories[]->color,
    "author": author->{name, image}
  },
  "total": count(*[_type == "post" && defined(slug.current)])
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const pageNumber = parseInt(searchParams.page || '1');
  const { posts, total } = await client.fetch(POSTS_QUERY, {}, options);
  
  // Calculate total pages
  const totalPages = Math.ceil((total - 2) / POSTS_PER_PAGE) + 1; // First page has 2 featured posts
    
  // Separar posts - 2 para destaque, resto para grid tripla
  const featuredPosts = pageNumber === 1 ? posts.slice(0, 2) : [];
  const regularPosts = pageNumber === 1 ? posts.slice(2) : posts;

  return (
    <div className="font-[Poppins]">
      {/* Hero Section para branding - opcional
      <Container className="pt-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Prédios de Salvador
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explorando a arquitetura da primeira capital do Brasil
        </p>
      </Container>*/}

      {/* Featured Post - Product Card Style */}
      <Container className="mt-10 pb-4">
        {featuredPosts.length > 0 && (
          <div className="pb-8 max-w mx-auto">
            {(() => {
              const post = featuredPosts[0];
              return (
                <div key={post._id} className="group border-2 border-black  rounded-lg overflow-hidden flex flex-col md:flex-row bg-white dark:bg-gray-900 dark:border-gray-800 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-shadow duration-300">
                  {/* Left side - Image */}
                  <div className="w-full md:w-1/2">
                    {post.mainImage ? (
                      <Link href={`/${post.slug.current}`} className="block h-full  md:border-r-2">
                        <Image 
                          src={urlFor(post.mainImage).width(600).height(600).url()}
                          alt={post.title}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full min-h-[300px]"
                        />
                      </Link>
                    ) : (
                      <Link href={`/${post.slug.current}`} className="block h-full">
                        <div className="bg-gray-200 dark:bg-gray-800 h-full min-h-[300px] w-full flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">Sem imagem</span>
                        </div>
                      </Link>
                    )}
                  </div>
                  
                  {/* Right side - Content */}
                  <div className="w-full md:w-full p-6 flex flex-col justify-between">

                    <div>
                      {post.categories && (
                        <div className="mb-2">
                          {post.categories.map((category: string, i: number) => (
                            <span 
                              key={i}
                              className={cx(
                                "inline-block text-xs font-medium uppercase tracking-wider mr-2",
                                getCategoryColor(category, post.categoryColors?.[i])
                              )}>
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-[32px] mb-2 font-[Abril_Fatface] tracking-wider">
                        <Link href={`/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Updated excerpt handling */}
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mt-4 mb-4  text-sm line-clamp-3">
                          {typeof post.excerpt === 'string' 
                            ? post.excerpt 
                            : Array.isArray(post.excerpt) 
                              ? post.excerpt.map((block: any) => block.children?.map((child: any) => child.text).join(' ')).join(' ')
                              : ''}
                        </p>
                      )}
                      
                      
                      
                      
                    </div>
                    
                    <div className="mt-6">
                      {/* Author and date in one line */}
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        {post.author?.image ? (
                          <Image
                            src={urlFor(post.author.image).width(24).height(24).url()}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                          />
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></span>
                        )}
                        <span className="font-medium">{post.author?.name || "Autor desconhecido"}</span>
                        <span className="mx-2">•</span>
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </Container>

      <Container>
        <div>
          <h2 className="text-2xl font-semi tracking-tight mb-4">
            Ultimas postagens
          </h2>
        </div>
      </Container>

      {/* Regular Posts - Grid tripla */}
      <Container >
        <div className="pt-4 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post: Post) => (
            <div key={post._id} className="group border-2 rounded bg-[#FFFFFF] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-shadow duration-300">
              <div className="overflow-hidden rounded-t-sm border-b-2">
                {post.mainImage ? (
                  <Link href={`/${post.slug.current}`}>
                    <Image 
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="object-cover h-48 w-full transition-all duration-300 group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link href={`/${post.slug.current}`}>
                    <div className="bg-gray-200 dark:bg-gray-800 h-48 w-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Sem imagem</span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="mt-3">
                {post.categories && (
                  <div className="mb-2">
                    {post.categories.map((category: string, i: number) => (
                      <span 
                        key={i}
                        className={cx(
                          "ml-4 inline-block text-xs  uppercase tracking-wider mr-2",
                          getCategoryColor(category, post.categoryColors?.[i])
                        )}>
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="ml-4 font-[Abril_Fatface] tracking-wider text-[18px] leading-tight">
                  <Link href={`/${post.slug.current}`} className="hover:text-blue-500 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <div className="ml-4 pb-4 flex items-center mt-2 space-x-3 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    {post.author?.image ? (
                      <Image
                        src={urlFor(post.author.image).width(20).height(20).url()}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    )}
                    <span className="text-xs">{post.author?.name || "Autor desconhecido"}</span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                  <time className="text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Pagination - Updated to use client component */}
      <Container className="mt-8 mb-16">
        <div className="flex justify-center">
          <Pagination totalPages={totalPages} currentPage={pageNumber} />
        </div>
      </Container>
    </div>
  );
}

// Função para determinar as cores das categorias
function getCategoryColor(category: string, definedColor?: string): string {
  if (definedColor) return definedColor;
  
  // Mapeamento de categorias para cores (pode personalizar)
  const colorMap: Record<string, string> = {
    "Histórico": "text-blue-600",
    "Colonial": "text-green-600",
    "Modernista": "text-purple-600", 
    "Contemporâneo": "text-yellow-600",
    "Barroco": "text-red-600",
    "Neoclássico": "text-indigo-600",
    "Eclético": "text-pink-600"
  };

  return colorMap[category] || "text-blue-600"; // Cor padrão se não encontrar
}