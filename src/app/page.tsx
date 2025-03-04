import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Container from "@/components/container";
import { cx } from "@/utils/all";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Configuração do builder de imagens
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Query para buscar posts com categorias e autores
const POSTS_QUERY = `*[
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
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  
  // Separar posts - 2 para destaque, resto para grid tripla
  const featuredPosts = posts.slice(0, 2);
  const regularPosts = posts.slice(2, 8);

  return (
    <div>
      {/* Hero Section para branding - opcional */}
      <Container className="pt-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Prédios de Salvador
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explorando a arquitetura da primeira capital do Brasil
        </p>
      </Container>

      {/* Featured Posts - Grid de 2 colunas */}
      <Container className="mt-10">
        <div className="grid md:grid-cols-2 gap-10">
          {featuredPosts.map((post) => (
            <div key={post._id} className="group">
              <div className="overflow-hidden rounded-md">
                {post.mainImage ? (
                  <Link href={`/${post.slug.current}`}>
                    <Image 
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="object-cover h-64 w-full transition-all duration-300 group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Link href={`/${post.slug.current}`}>
                    <div className="bg-gray-200 dark:bg-gray-800 h-64 w-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Sem imagem</span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="mt-4">
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
                <h2 className="text-xl md:text-2xl font-semibold leading-tight">
                  <Link href={`/${post.slug.current}`} className="hover:text-blue-500 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    {post.author?.image ? (
                      <Image
                        src={urlFor(post.author.image).width(24).height(24).url()}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    )}
                    <span className="text-sm">{post.author?.name || "Autor desconhecido"}</span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                  <time className="text-sm">
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

      {/* Regular Posts - Grid tripla */}
      <Container className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post) => (
            <div key={post._id} className="group">
              <div className="overflow-hidden rounded-md">
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
                          "inline-block text-xs font-medium uppercase tracking-wider mr-2",
                          getCategoryColor(category, post.categoryColors?.[i])
                        )}>
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-lg font-medium leading-tight">
                  <Link href={`/${post.slug.current}`} className="hover:text-blue-500 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <div className="flex items-center mt-2 space-x-3 text-gray-500 dark:text-gray-400">
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
    "Moderno": "text-purple-600", 
    "Contemporâneo": "text-yellow-600",
    "Barroco": "text-red-600",
    "Neoclássico": "text-indigo-600",
    "Eclético": "text-pink-600"
  };

  return colorMap[category] || "text-blue-600"; // Cor padrão se não encontrar
}