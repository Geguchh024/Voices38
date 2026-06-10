import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { PortfolioData } from '@/types/portfolio'

export function usePortfolio() {
  const data = useQuery(api.portfolio.get)

  return {
    data: data as PortfolioData | undefined,
    isLoading: data === undefined,
    isError: false,
  }
}
