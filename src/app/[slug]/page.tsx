/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import AuthorCard from "@/components/AuthorCard";
import ImageGallery from "@/components/ImageGallery";

// Consulta atualizada para incluir os novos campos
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
  
  // Novos campos adicionados
  additionalImages[] {
    asset->,
    caption,
    alt,
    imageType
  },
  galleries[] {
    title,
    description,
    images[] {
      asset->,
      caption,
      alt
    }
  },
  externalLinks[] {
    title,
    url,
    linkType
  },
  "author": author->{
    name, 
    image,
    bio,
    "slug": slug
  },
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

  // Função para agrupar imagens adicionais por tipo
  const getImagesByType = (type: string) => {
    return post.additionalImages?.filter(
      (img: any) => img.imageType === type
    ) || [];
  };

  // Preparar dados para o componente ImageGallery
  const prepareGalleryData = (images: any[]) => {
    return images.map((img: any) => ({
      url: urlFor(img).width(800).height(600).url(),
      alt: img.alt || 'Imagem',
      caption: img.caption
    }));
  };

  // Formatando dados para as diferentes seções de imagem
  const floorplanImages = prepareGalleryData(getImagesByType('floorplan'));
  const diagramImages = prepareGalleryData(getImagesByType('diagram'));
  const photoImages = prepareGalleryData(getImagesByType('photo'));
  const renderImages = prepareGalleryData(getImagesByType('render'));
  const otherImages = prepareGalleryData(getImagesByType('other'));

  return (
    <div>
      <Container>
        <div className="mx-auto max-w-screen-md">
          {/* Voltar a Pagina Inicial */}
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
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
                priority
              />
            </div>
          )}
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
          
          
          
          {/* Imagens adicionais agrupadas por tipo */}
          {post.additionalImages && post.additionalImages.length > 0 && (
            <div className="mt-12">
              
              {floorplanImages.length > 0 && (
                <ImageGallery 
                  title="Plantas Técnicas" 
                  images={floorplanImages} 
                  columnsDesktop={2} 
                />
              )}
              
              {diagramImages.length > 0 && (
                <ImageGallery 
                  title="Diagramas" 
                  images={diagramImages} 
                  columnsDesktop={2} 
                />
              )}
              
              {photoImages.length > 0 && (
                <ImageGallery 
                  title="Fotografias" 
                  images={photoImages} 
                  columnsDesktop={3} 
                />
              )}
              
              {renderImages.length > 0 && (
                <ImageGallery 
                  title="Renders" 
                  images={renderImages} 
                  columnsDesktop={2} 
                />
              )}
              
              {otherImages.length > 0 && (
                <ImageGallery 
                  title="Outras Imagens" 
                  images={otherImages} 
                  columnsDesktop={2} 
                />
              )}
            </div>
          )}
          
          {/* Galerias */}
          {post.galleries && post.galleries.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Galerias</h2>
              
              {post.galleries.map((gallery: any, galleryIndex: number) => {
                const galleryImages = gallery.images ? prepareGalleryData(gallery.images) : [];
                
                return (
                  <div key={`gallery-${galleryIndex}`} className="mb-12">
                    <h3 className="text-xl font-semibold mb-3">{gallery.title}</h3>
                    
                    {gallery.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {gallery.description}
                      </p>
                    )}
                    
                    <ImageGallery 
                      title="" 
                      images={galleryImages} 
                      columnsDesktop={2} 
                    />
                  </div>
                );
              })}
            </div>
          )}

          {post.author && <AuthorCard author={post.author} />}
          
          {/* Links externos */}
          {post.externalLinks && post.externalLinks.length > 0 && (
            <div className="mt-12 mb-8 p-6 items-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recursos Adicionais</h2>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                  Premium
                </span>
              </div>
              
              <ul className="space-y-3">
                {post.externalLinks.map((link: any, index: number) => {
                  // Determinar ícone com base no tipo de link
                  let icon;
                  switch(link.linkType) {
                    case 'gdrive':
                      icon = (
                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"/>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.96 7.96 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923.001.392-.131.723-.367.948zm3.807 1.355c-.56.493-1.325.728-2.257.728a4.87 4.87 0 0 1-.308-.012v-3.934a7.2 7.2 0 0 1 1.343-.106c.719 0 1.231.106 1.642.354.462.253.784.724.784 1.416 0 .709-.272 1.207-.831 1.554zM14 9h-1V4l5 5h-4z"/>
                        </svg>
                      );
                      break;
                    case 'document':
                      icon = (
                        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.667 14.385a1.888 1.888 0 0 1-.11-.425l-.607.145q.043.174.067.336zm-.774.74c.313 0 .582-.134.582-.4 0-.184-.163-.292-.52-.292h-.183v.692zm7.076.261c.26 0 .433-.056.542-.15v-.373c-.109.086-.26.15-.452.15-.268 0-.435-.174-.435-.426 0-.252.174-.435.435-.435.2 0 .346.067.452.15v-.376c-.1-.086-.28-.145-.51-.145-.5 0-.864.348-.864.809 0 .47.357.797.832.797zM14 9h-1V4l5 5h-4zm-2.038 6.119c-.184 0-.324.032-.407.056V16.5c.086.018.228.03.356.03.425 0 .704-.174.704-.518 0-.29-.213-.474-.653-.474zm.682-1.076v-.316h-.9v2.469h.933v-1.026l.81 1.026h1.155l-.961-1.185.84-1.103H12.9l-.746.878.49-.743z"/>
                        </svg>
                      );
                      break;
                    case 'video':
                      icon = (
                        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4z"/>
                          <path d="M9.5 6h5v1h-5zm0 11h5v1h-5z"/>
                          <path d="M20 5h-2v14h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM4 5H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2V5z"/>
                        </svg>
                      );
                      break;
                    default:
                      icon = (
                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 3a9 9 0 100 18 9 9 0 000-18zM6.734 15A7.001 7.001 0 0112 4.071V10h5.93A7.001 7.001 0 016.734 15z"/>
                          <path d="M19.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                      );
                  }
                  
                  return (
                    <li key={`link-${index}`}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <span className="flex-shrink-0 mr-3">
                          {icon}
                        </span>
                        <div>
                          <p className="font-medium">{link.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {link.url}
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}