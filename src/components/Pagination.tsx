'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function Pagination({ 
  totalPages, 
  currentPage 
}: { 
  totalPages: number, 
  currentPage: number 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Create a function to update the URL without full page refresh
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    
    // Update URL without full page reload
    router.push(`/?${createQueryString('page', page.toString())}`, { scroll: false })
  }

  return (
    <nav className="flex items-center font-[Poppins]">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md mr-2 
                  ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} 
                  transition-colors duration-200`}
        disabled={currentPage <= 1}
      >
        <span className="sr-only">Página anterior</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Generate page buttons dynamically */}
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const pageNum = i + 1;
        // Logic to show proper range of page numbers when current page is high
        const showPage = totalPages <= 5 || pageNum === 1 || pageNum === totalPages || 
                        (currentPage - 2 <= pageNum && pageNum <= currentPage + 2);
        
        if (!showPage) {
          if ((pageNum === 2 && currentPage > 4) || (pageNum === totalPages - 1 && currentPage < totalPages - 3)) {
            return <span key={pageNum} className="mx-1">...</span>;
          }
          return null;
        }
        
        return (
          <button 
            key={pageNum} 
            onClick={() => handlePageChange(pageNum)}
            className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md mx-1 
                      ${currentPage === pageNum ? 'bg-black text-white' : 'hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]'} 
                      transition-shadow duration-300`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md ml-2 
                  ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} 
                  transition-colors duration-200`}
        disabled={currentPage >= totalPages}
      >
        <span className="sr-only">Próxima página</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </nav>
  )
}