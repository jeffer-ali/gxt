export default function getHost() {
  switch (process.env.VERCEL_ENV) {
    case 'production':
    case 'preview':
      return 'https://gxt-six.vercel.app'
    case 'development':
    default:
      return 'http://localhost:3000'
  }
}