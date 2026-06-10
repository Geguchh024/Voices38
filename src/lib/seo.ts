const SITE_NAME = 'VOICES38'
const SITE_TAGLINE = 'SECURE_TERMINAL_V1.0'
const DEFAULT_DESCRIPTION =
  'VOICES38 is an independent retro-terminal game release hub. Browse current releases, development progress, and the full archive.'

export const siteConfig = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  defaultTitle: `${SITE_NAME} | ${SITE_TAGLINE}`,
  defaultDescription: DEFAULT_DESCRIPTION,
  locale: 'en_US',
  twitterHandle: '@voices38',
} as const

function trimTrailingSlash(url: string) {
  return url.replace(/\/$/, '')
}

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined
  if (configured) {
    return trimTrailingSlash(configured)
  }
  if (typeof window !== 'undefined') {
    return trimTrailingSlash(window.location.origin)
  }
  return ''
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath
}

export function createPageHead(options: {
  title: string
  description?: string
  path?: string
  robots?: string
}) {
  const title = options.title.includes(SITE_NAME)
    ? options.title
    : `${options.title} | ${SITE_NAME}`
  const description = options.description ?? siteConfig.defaultDescription
  const url = options.path ? absoluteUrl(options.path) : getSiteUrl() || undefined
  const image = absoluteUrl('/og-preview.svg')

  type HeadMeta =
    | Record<string, string>
    | { title: string }

  const meta: HeadMeta[] = [
    { title },
    { name: 'description', content: description },
    { name: 'author', content: SITE_NAME },
    { name: 'theme-color', content: '#000000' },
    { name: 'robots', content: options.robots ?? 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: `${SITE_NAME} terminal preview` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: siteConfig.locale },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: `${SITE_NAME} terminal preview` },
  ]

  if (url) {
    meta.push({ property: 'og:url', content: url })
    meta.push({ name: 'twitter:url', content: url })
  }

  if (siteConfig.twitterHandle) {
    meta.push({ name: 'twitter:site', content: siteConfig.twitterHandle })
  }

  const links: Array<{ rel: string; href: string }> = []
  if (url) {
    links.push({ rel: 'canonical', href: url })
  }

  return { meta, links }
}
