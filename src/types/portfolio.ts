export interface Release {
  id: string
  title: string
  format: string
  releaseDate: string
  crackDate?: string
  releaseType?: string
  genre: string
  protection: string
  developer?: string
  installNote?: string
  releaseSupporters?: string[]
  testers?: string[]
  downloadUrl?: string
}

export interface Project {
  id: string
  name: string
  version: string
  progress: number
  eta: string
}

export interface Supporter {
  name: string
}

export interface CryptoWallet {
  symbol: string
  address: string
}

export interface PortfolioData {
  releases: Release[]
  archiveReleases: Release[]
  projects: Project[]
  supporters: Supporter[]
  cryptoWallets: CryptoWallet[]
  installationSteps: string[]
  notes: string
  contactEmail?: string
}
