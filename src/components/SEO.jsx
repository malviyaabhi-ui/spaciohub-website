import { Helmet } from 'react-helmet-async'

const SITE = 'SpacioHub'
const BASE_URL = 'https://www.spaciohub.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-default.png`
const DEFAULT_DESC = 'SpacioHub replaces chaotic email chains with intelligent room booking, door displays, visitor management and analytics. Free 14-day trial.'

export default function SEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Smart Workspace Management`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={url} />
      <meta property="og:site_name"   content={SITE} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Extra */}
      <meta name="theme-color" content="#00c07a" />
    </Helmet>
  )
}
