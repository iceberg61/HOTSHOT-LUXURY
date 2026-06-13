import { Helmet } from 'react-helmet-async'

function SEO({ title, description, image, url }) {
  const siteName = 'Hotshot Luxury'
  const defaultDescription = 'Where high-octane attitude meets timeless luxury. Shop limited drops and exclusive streetwear.'
  const defaultImage = '/images/hero-bg.jpg'
  const siteUrl = 'https://hotshot-luxury.vercel.app'

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Unapologetically Elite`
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Canonical */}
      <link rel="canonical" href={metaUrl} />
    </Helmet>
  )
}

export default SEO