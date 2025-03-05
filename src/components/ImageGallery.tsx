'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';

// Importações CSS completas
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-medium-image-zoom/dist/styles.css';

interface ImageGalleryProps {
  title: string;
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  columnsDesktop?: number;
}

export default function ImageGallery({ title, images, columnsDesktop = 2 }: ImageGalleryProps) {
  // Estado para controlar a montagem do Swiper
  const [mounted, setMounted] = useState(false);
  
  // Garantir que o componente só é renderizado no cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!images || images.length === 0) return null;
  if (!mounted) return null; // Não renderiza nada até que o componente esteja montado no cliente
  
  return (
    <div className="mb-10 border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      
      {/* Carrossel para desktop e tablets */}
      <div className="hidden sm:block">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: columnsDesktop }
          }}
          navigation={{
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          loop={images.length > columnsDesktop}
          grabCursor={true}
          className="mySwiper mb-12"
        >
          {images.map((img, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className="pb-12"> {/* Espaço para paginação */}
                <Zoom>
                  <figure className="relative">
                    <Image 
                      src={img.url}
                      alt={img.alt || `Imagem ${index + 1}`}
                      width={1080}
                      height={960}
                      className="rounded-lg w-full  object-cover transition-all cursor-pointer"
                    />
                    {img.caption && (
                      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                </Zoom>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
      
      {/* Grid para dispositivos móveis */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {images.map((img, index) => (
          <Zoom key={`mobile-${index}`}>
            <figure className="relative">
              <Image 
                src={img.url}
                alt={img.alt || `Imagem ${index + 1}`}
                width={600}
                height={400}
                className="rounded-lg w-full  object-cover transition-all cursor-pointer"
              />
              {img.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          </Zoom>
        ))}
      </div>
    </div>
  );
}