export default function imageLoader({ src, width, quality }) {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/Gajendra' : ''
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`
} 