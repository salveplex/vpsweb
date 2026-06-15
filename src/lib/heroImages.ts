export function cleanGalleryImageUrl(imageUrl: string) {
  if (!imageUrl.includes('impro.usercontent.one')) return imageUrl

  const url = new URL(imageUrl)
  url.searchParams.delete('extract')
  url.searchParams.delete('ignoreAspectRatio')
  url.searchParams.set('resize', '1800')
  url.searchParams.set('quality', '92')

  return url.toString()
}
