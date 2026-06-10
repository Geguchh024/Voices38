import type { PortfolioData } from '@/types/portfolio'

export async function fetchPortfolio(): Promise<PortfolioData> {
  const response = await fetch('/data/portfolio.json')
  if (!response.ok) {
    throw new Error('Failed to load portfolio data')
  }
  return response.json() as Promise<PortfolioData>
}
