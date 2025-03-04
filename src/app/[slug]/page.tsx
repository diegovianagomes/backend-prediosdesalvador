import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "categories": categories[]->title,
  "categoryColors": categories[]->color,
  "author": author->{name, image}
}`;

// Configuração do builder de imagens
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Await the params object before accessing the slug property
  const resolvedParams = await params;
  
  const post = await client.fetch<SanityDocument>(
    POST_QUERY, 
    { slug: resolvedParams.slug },
    options
  );
  
  // Preparar URLs de imagens com verificações de nulo
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(500).url()
    : null;
    
  const authorImageUrl = post.author?.image 
    ? urlFor(post.author.image)?.width(30).height(30).url() 
    : null;

  return (
    <div>
      <Container>
        <div className="mx-auto max-w-screen-md">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar para a página inicial
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center mt-3 mb-6 space-x-3 text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              {authorImageUrl ? (
                <Image
                  src={authorImageUrl}
                  alt={post.author?.name || "Autor"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ) : (
                <span className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700"></span>
              )}
              <span>{post.author?.name || "Autor desconhecido"}</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
          
          {postImageUrl && (
            <div className="mb-8">
              <Image
                src={postImageUrl}
                alt={post.title}
                width={800}
                height={500}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </div>
      </Container>
    </div>
  );
}