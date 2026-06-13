type CollectHeroImagesInput = {
  pageHero?: string
  settingsHero?: string
  galleryImages?: Array<string | undefined>
  fallbackImages?: string[]
}

export const fallbackHeroImages = [
  'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240522_130220.jpg?etag=%2239d36c-6652016f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=2400%2B1600&quality=92',
  'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20200101_010840(1).jpg?etag=%222c9cc5-5f08340e%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=2400%2B1600&quality=92',
  'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/IMG_20200706_0003.jpg?etag=%22b21ec-5f037055%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=2400%2B1600&quality=92',
  'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1594033487309-3673ee32-eb67-4713-8214-ebb1da48e841.jpg?etag=%22b11b9-5f037056%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=2400%2B1600&quality=92',
]

export function collectHeroImages({
  pageHero,
  settingsHero,
  galleryImages = [],
  fallbackImages = fallbackHeroImages,
}: CollectHeroImagesInput) {
  return [...new Set([pageHero, settingsHero, ...galleryImages, ...fallbackImages].filter(Boolean))] as string[]
}

export function optimizeHeroImageUrl(imageUrl: string) {
  if (!imageUrl.includes('impro.usercontent.one')) return imageUrl

  const url = new URL(imageUrl)
  url.searchParams.delete('extract')
  url.searchParams.set('resize', '2400+1600')
  url.searchParams.set('quality', '92')

  return url.toString()
}

export function cleanGalleryImageUrl(imageUrl: string) {
  if (!imageUrl.includes('impro.usercontent.one')) return imageUrl

  const url = new URL(imageUrl)
  url.searchParams.delete('extract')
  url.searchParams.delete('ignoreAspectRatio')
  url.searchParams.set('resize', '1800')
  url.searchParams.set('quality', '92')

  return url.toString()
}
