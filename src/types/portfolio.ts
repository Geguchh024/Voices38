export interface Release {
  id: string
  title: string
  format: string
  releaseDate: string
  genre: string
  protection: string
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
  projects: Project[]
  supporters: Supporter[]
  cryptoWallets: CryptoWallet[]
  isoImage: string
  blake3Hash: string
  installationSteps: string[]
  installationNote: string
  notes: string
}
