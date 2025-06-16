'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
    children: ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                experimental_prefetchInRender: true
            }
        }
    }));
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    ) 
}