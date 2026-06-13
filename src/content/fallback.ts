import type { SiteData } from '../types'

const settings = {
  site_name: 'Voss Taxi SA',
  phone: '+4756511340',
  phone_display: '56 51 13 40',
  email: 'post@vosstaxi.no',
  address: 'Uttrågata 19, 5700 Voss, Norway',
  booking_url: 'https://web-page-voss-taxi.vercel.app/no',
  fare_calculator_url: 'http://voss-taxi-kalkulator.vercel.app',
  facebook_url: 'https://facebook.com/vosstaxi.no/',
  instagram_url: 'https://instagram.com/vosstaxi/',
  map_url:
    'https://www.google.com/maps/search/?api=1&query=%22Voss%20Taxi%20SA%2C%20Uttr%C3%A5gata%2019%2C%205700%20Voss%2C%20Norway%22',
  app_store_url: 'https://apps.apple.com/no/app/snappy-taxi/id6479620974',
  play_store_url: 'https://play.google.com/store/apps/details?id=no.snappy.snappy.taxi&hl=no',
  hero_media:
    'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240522_130220.jpg?etag=%2239d36c-6652016f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1160%2B870&extract=0%2B198%2B1160%2B395&quality=85',
}

const originalGalleryImages = [
  ['Voss Taxi Bilde 1', 'Galleri Bilde 1', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308'],
  ['Voss Taxi Bilde 2', 'Galleri Bilde 2', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1714421291589.jpg?etag=%221c33d-6648e8fd%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 3', 'Galleri Bilde 3', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1714421291592.jpg?etag=%222ba09-6648e8fe%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 4', 'Galleri Bilde 4', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/4.Desember.jpg?etag=%2237631-6648e8ff%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1070&extract=0,164,739,740'],
  ['Voss Taxi Bilde 5', 'Galleri Bilde 5', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/7.Desember.jpg?etag=%2239600-6648e8ff%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1078&extract=0,169,739,740'],
  ['Voss Taxi Bilde 6', 'Galleri Bilde 6', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.Desember.jpg?etag=%224b171-6648e900%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1116&extract=0,187,739,740'],
  ['Voss Taxi Bilde 7', 'Galleri Bilde 7', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1714421291595.jpg?etag=%223dd47-6648e901%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 8', 'Galleri Bilde 8', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/1714421291597.jpg?etag=%2237507-6648e901%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 9', 'Galleri Bilde 9', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/19.Desember.jpeg?etag=%22453e4-6648e902%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1315&extract=0,287,739,740'],
  ['Voss Taxi Bilde 10', 'Galleri Bilde 10', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/image0000001002.jpg?etag=%2247268-6648e903%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=636,1131&extract=0,247,636,636'],
  ['Voss Taxi Bilde 11', 'Galleri Bilde 11', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/15.Desember.jpg?etag=%227bf06-6648e903%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 12', 'Galleri Bilde 12', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Osa.jpg?etag=%22de699-6648e904%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,740'],
  ['Voss Taxi Bilde 13', 'Galleri Bilde 13', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/23.Desember___serialized1.jpg?etag=%222d13bb-6648e9af%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1272,740&extract=266,0,739,740'],
  ['Voss Taxi Bilde 14', 'Galleri Bilde 14', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/IMG_6539.jpg?etag=%222dec84-6648e906%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1315&extract=0,287,739,740'],
  ['Voss Taxi Bilde 15', 'Galleri Bilde 15', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185247___serialized1.jpg?etag=%22553a7d-6648ead7%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 16', 'Galleri Bilde 16', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/6.Desember___serialized1.jpg?etag=%22538b19-6648e9ca%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 17', 'Galleri Bilde 17', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190615___serialized1.jpg?etag=%227046fd-6648ea99%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 18', 'Galleri Bilde 18', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190618___serialized1.jpg?etag=%226e2bd6-6648ea8c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 19', 'Galleri Bilde 19', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190600___serialized1.jpg?etag=%226a7cf2-6648eab1%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 20', 'Galleri Bilde 20', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20231204_233333___serialized1.jpg?etag=%226ae24e-6648ea81%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 21', 'Galleri Bilde 21', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190601___serialized1.jpg?etag=%226aaaf7-6648eac9%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 22', 'Galleri Bilde 22', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20231205_044039___serialized1.jpg?etag=%226092c1-6648ea75%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 23', 'Galleri Bilde 23', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/8.Desember___serialized1.jpg?etag=%225b0bbb-6648eaa6%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 24', 'Galleri Bilde 24', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190544___serialized1.jpg?etag=%227a6610-6648eabc%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 25', 'Galleri Bilde 25', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_190414___serialized1.jpg?etag=%225c7b58-6648e9db%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 26', 'Galleri Bilde 26', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20230616_183634.jpg?etag=%224898a6-6648e911%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=813,740&extract=36,0,739,740'],
  ['Voss Taxi Bilde 27', 'Galleri Bilde 27', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185310___serialized1.jpg?etag=%226d7b5e-6648e9e7%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 28', 'Galleri Bilde 28', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_190412___serialized1.jpg?etag=%225b16c9-6648ea65%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 29', 'Galleri Bilde 29', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185340___serialized1.jpg?etag=%2257590a-6648ea53%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 30', 'Galleri Bilde 30', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190039.jpg?etag=%2251ce66-6648e918%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 31', 'Galleri Bilde 31', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190127___serialized1.jpg?etag=%22ac5a81-6648ea48%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 32', 'Galleri Bilde 32', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185431___serialized1.jpg?etag=%2259f802-6648e9f9%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 33', 'Galleri Bilde 33', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190055.jpg?etag=%2259c18c-6648e91d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 34', 'Galleri Bilde 34', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190121.jpg?etag=%225ab39c-6648e91e%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 35', 'Galleri Bilde 35', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190114.jpg?etag=%225c8a52-6648e91f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 36', 'Galleri Bilde 36', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190102.jpg?etag=%225dfed2-6648e920%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 37', 'Galleri Bilde 37', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190050.jpg?etag=%2260c2cc-6648e921%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 38', 'Galleri Bilde 38', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240507_190046.jpg?etag=%22610898-6648e923%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 39', 'Galleri Bilde 39', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185331___serialized1.jpg?etag=%226e206b-6648ea38%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 40', 'Galleri Bilde 40', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185013.jpg?etag=%227dc2f5-6648e929%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 41', 'Galleri Bilde 41', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185146.jpg?etag=%2290aac6-6648e92b%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 42', 'Galleri Bilde 42', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185225___serialized1.jpg?etag=%227d1909-6648ea0b%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 43', 'Galleri Bilde 43', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185206.jpg?etag=%2299e245-6648e92f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 44', 'Galleri Bilde 44', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240501_185210.jpg?etag=%229d62c3-6648e931%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 45', 'Galleri Bilde 45', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Bergo%20i%20ulvik.jpg?etag=%225946ad-6648e933%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 46', 'Galleri Bilde 46', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/16.Desember___serialized1.jpg?etag=%227fb03d-6648ea1a%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 47', 'Galleri Bilde 47', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20230805_214844___serialized1.jpg?etag=%225ce8fc-6648ea2c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 48', 'Galleri Bilde 48', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/160.1.jpg?etag=%222d8be7-5f35bc91%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1602,740&extract=431,0,739,740'],
  ['Voss Taxi Bilde 49', 'Galleri Bilde 49', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/160.3.jpg?etag=%222a9675-5f35bc8e%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1235,740&extract=247,0,739,740'],
  ['Voss Taxi Bilde 50', 'Galleri Bilde 50', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180523_114411.jpg?etag=%22526a49-5f083441%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 51', 'Galleri Bilde 51', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20161005_160420.jpg?etag=%225c6f26-5f083455%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 52', 'Galleri Bilde 52', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/160.5.jpg?etag=%2224c7fe-5f35bc89%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1602&extract=0,431,739,740'],
  ['Voss Taxi Bilde 53', 'Galleri Bilde 53', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180618_212754.jpg?etag=%223c5bfa-5f08341d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 54', 'Galleri Bilde 54', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180523_211231.jpg?etag=%2235d256-5f083415%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1315,740&extract=287,0,739,740'],
  ['Voss Taxi Bilde 55', 'Galleri Bilde 55', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214725.jpg?etag=%22591648-5f083451%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 56', 'Galleri Bilde 56', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214654.jpg?etag=%224a0a45-5f083436%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 57', 'Galleri Bilde 57', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214643.jpg?etag=%22573e5a-5f08344d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 58', 'Galleri Bilde 58', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214845.jpg?etag=%2254aadb-5f083443%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 59', 'Galleri Bilde 59', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180711_081817.jpg?etag=%225129be-5f083440%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 60', 'Galleri Bilde 60', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180623_214951.jpg?etag=%222d5882-5f083410%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 61', 'Galleri Bilde 61', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180627_120313.jpg?etag=%22283191-5f08340d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 62', 'Galleri Bilde 62', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180627_120309.jpg?etag=%222bd9ec-5f08340d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 63', 'Galleri Bilde 63', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180627_120230.jpg?etag=%2254054c-5f083445%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 64', 'Galleri Bilde 64', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180820_124336.jpg?etag=%223e25c4-5f083420%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 65', 'Galleri Bilde 65', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180716_133738.jpg?etag=%22576c33-5f08344f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1521,740&extract=390,0,739,740'],
  ['Voss Taxi Bilde 66', 'Galleri Bilde 66', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180715_000941.jpg?etag=%223ecf6c-5f083423%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 67', 'Galleri Bilde 67', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180711_084522.jpg?etag=%2277b789-5f08345f%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 68', 'Galleri Bilde 68', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180820_124458.jpg?etag=%22467420-5f08342d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 69', 'Galleri Bilde 69', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180820_124520.jpg?etag=%223ca2b4-5f08341c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 70', 'Galleri Bilde 70', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20200531_042600.jpg?etag=%222e15ae-5f083411%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 71', 'Galleri Bilde 71', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20200531_042738.jpg?etag=%2214119b-5f083404%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 72', 'Galleri Bilde 72', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Snapchat-449315587.jpg?etag=%22b5964-5f083402%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,1421&extract=0,340,739,740'],
  ['Voss Taxi Bilde 73', 'Galleri Bilde 73', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/R-40%20Stalheim.jpg?etag=%2253a319-602051a9%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=740,986&extract=0,123,739,740'],
  ['Voss Taxi Bilde 74', 'Galleri Bilde 74', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/sub___serialized1.jpg?etag=%22784d8e-5f09c03c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 75', 'Galleri Bilde 75', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/subb.jpg?etag=%22419958-5f083429%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 76', 'Galleri Bilde 76', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/r-161-1.png?etag=%22549f5-602051a5%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=500,429&extract=35,0,429,429'],
  ['Voss Taxi Bilde 77', 'Galleri Bilde 77', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/r-160-1.jpg?etag=%225e7f9-60204fc0%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=986,740&extract=123,0,739,740'],
  ['Voss Taxi Bilde 78', 'Galleri Bilde 78', 'https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200'],
]


const norwegianGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-no-${index + 1}`,
  locale: 'no',
  title,
  alt,
  image,
  sort: index + 1,
}))

const englishGallery: SiteData['gallery'] = originalGalleryImages.map(([title, alt, image], index) => ({
  id: `gallery-original-en-${index + 1}`,
  locale: 'en',
  title,
  alt,
  image,
  sort: index + 1,
}))

export const fallbackByLocale: Record<'no' | 'en', SiteData> = {
  no: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home', locale: 'no', label: 'Heim', href: '/', sort: 1 },
      { id: 'nav-om-oss', locale: 'no', label: 'Om Oss', href: '/om-oss', sort: 2 },
      { id: 'nav-services', locale: 'no', label: 'Tenester', href: '/tenester', sort: 3 },
      { id: 'nav-pakker', locale: 'no', label: 'Pakker', href: '/pakker', sort: 4 },
      { id: 'nav-maxi-taxi', locale: 'no', label: 'Maxi Taxi', href: '/maxi-taxi', sort: 6 },
      { id: 'nav-bli-sjafor', locale: 'no', label: 'Bli sjåfør', href: '/bli-sjafor', sort: 7 },
      { id: 'nav-gallery', locale: 'no', label: 'Galleri', href: '/galleri', sort: 8 },
      { id: 'nav-ris-ros', locale: 'no', label: 'Ris og Ros', href: '/ris-ros', sort: 9 },
      { id: 'nav-contact', locale: 'no', label: 'Kontakt', href: '/kontakt', sort: 10 },
    ],
    pages: [
      {
        id: 'home-no',
        locale: 'no',
        slug: 'home',
        eyebrow: 'Lokalt taxiselskap på Voss',
        title: 'Trygt fram på Voss, døgnet rundt.',
        summary:
          'Voss Taxi køyrer personbil, storbil, maxi-taxi, minibuss og rullestolbil for lokale, tilreisande og faste transportoppdrag.',
        hero_image: settings.hero_media,
        blocks: [
          {
            type: 'rich_text',
            title: 'Voss Taxi',
            body: 'Me har bilar til alle typar oppdrag og hjelper deg trygt frå tog, hotell, hytte, fjell og arrangement.',
          },
          {
            type: 'cta',
            title: 'Bestill med telefon, app eller kalkulator',
            body: 'Ring sentralen, bruk Snappy Taxi eller sjekk pris i kalkulatoren før turen.',
            href: settings.booking_url,
            label: 'Bestill taxi',
          },
        ],
      },
      {
        id: 'services-no',
        locale: 'no',
        slug: 'tenester',
        eyebrow: 'Tenester',
        title: 'Bilar til alle typar oppdrag.',
        summary:
          'Frå korte turar i sentrum til større grupper, rullestoltransport og førehandsbestilte oppdrag.',
        blocks: [],
      },
      {
        id: 'fares-no',
        locale: 'no',
        slug: 'takstar',
        eyebrow: 'Takstar',
        title: 'Tydelege takstar og rask prisoversikt.',
        summary: 'Bruk kalkulatoren for estimat, eller kontakt sentralen for turar som krev planlegging.',
        blocks: [],
      },
      {
        id: 'gallery-no',
        locale: 'no',
        slug: 'galleri',
        eyebrow: 'Galleri',
        title: 'Voss Taxi i kvardagen.',
        summary: 'Eit lite utval frå bilar, oppdrag og transportmiljøet på Voss.',
        blocks: [],
      },
      {
        id: 'contact-no',
        locale: 'no',
        slug: 'kontakt',
        eyebrow: 'Kontakt',
        title: 'Ta kontakt med Voss Taxi.',
        summary: 'Sentralen er klar for bestillingar, spørsmål om oppdrag og praktisk informasjon.',
        blocks: [],
      },
      {
        id: 'wheelchair-no',
        locale: 'no',
        slug: 'rullestol',
        eyebrow: 'Rullestol',
        title: 'Rullestolbil og tilrettelagt transport.',
        summary: 'Ta kontakt for planlegging av trygg og praktisk transport med rullestolbil.',
        blocks: [],
      },
      {
        id: 'feedback-no',
        locale: 'no',
        slug: 'ris-ros',
        title: 'Ris og Ros',
        blocks: [
          {
            type: 'rich_text',
            title: 'Ris og Ros',
            body: 'Her kan du sende formelle klager, eller ros til oss.\n\n## Send klage\n\nVisst du ynskjer å retta ein formell klage, skal denne framsettast skriftleg ved å nytte vala nedanfor, eller på e-post til post@vosstaxi.no.\nMe sender deg innan 14 dagar ein skriftleg beskjed på at klagen er motteken, og informasjon om forventa behandlingstid.\n\nFormelle klagar vil besvarast skriftleg. Dokumentasjon vedrørande klagen oppbevarast hjå oss i tre år etter at klagebehandlinga er avslutta.\n\n## Gje oss ros eller ris\n\nMe ønskjer dine synspunkt, tilbakemeldingar og tips til forbetringar. Det er den beste hjelpen du kan gje oss i arbeidet med å verta endå betre.'
          },
          {
            type: 'cta',
            title: 'Klage på sjåfør',
            body: 'Ynskjer du å sende ein klage på ein av våre sjåførar.',
            href: 'mailto:post@vosstaxi.no?subject=Klage%20på%20sjåfør',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Klage utført oppdrag',
            body: 'Ynskjer du å klage på eit oppdrag me har utført.',
            href: 'mailto:post@vosstaxi.no?subject=Klage%20utført%20oppdrag',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Generelle klager',
            body: 'Har du andre generelle klager på våre tenester.',
            href: 'mailto:post@vosstaxi.no?subject=Generell%20klage',
            label: 'Send klage'
          },
          {
            type: 'cta',
            title: 'Ros',
            body: 'Me set stor pris på ros når du har hatt ein god oppleving med oss!',
            href: 'mailto:post@vosstaxi.no?subject=Ros%20til%20Voss%20Taxi',
            label: 'Send ros'
          },
          {
            type: 'cta',
            title: 'Generell informasjon',
            body: 'Spørsmål eller generell informasjon som ikkje fell under klage eller ros.',
            href: 'mailto:post@vosstaxi.no?subject=Generell%20informasjon',
            label: 'Send e-post'
          }
        ],
      },
      {
        id: 'page-maxi-taxi-no',
        locale: 'no',
        slug: 'maxi-taxi',
        title: 'Maxi Taxi',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Maxi Taxi',
            body: `
![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308)

Tlf: (+47) 56 51 13 40


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/DJI_0168.JPG?etag=%226fb506-66495405%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1160%2B773&extract=0%2B174%2B1160%2B429&quality=85)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20240514_203506.jpg?etag=%225098a2-66495519%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=689%2B517&extract=0%2B0%2B689%2B479&quality=85)

Rullestolbil

Voss Taxi har lang erfaring med pasient og rullestoltransport. Me utfører dagleg rullestoloppdrag. Alle våre lokalkjente sjåførar er opplært og godkjent til å handtere ulike typar rullestolbrukarar. Og me har alltid fokus på brukarens sikkerheit under transporten.

Me har pr. dags dato 2 minibussar tilpassa for å ta med ein eller to rullestolar. Samt 3 stk 8 setar rullestolbil, alle med rampe for lett ombordstigning.

Me utfører kvart år eit stort antall transportar for Helse Bergen, og har mange års erfaring med å frakta passasjerar med behov for spesiell assistanse.

Noko som og gjer oss til en naturleg transportpartnar også for private omsorgsinstitusjonar og andre som treng sikker transport av eldre og bevegelseshemma.

Me er tilgjengelege kvar dag – heile året.

Ring 93 24 98 44 eller send ein epost til maxi@vosstaxi.no

## Ta kontakt

Her kan du sende ein forespørsel direkte til maxi taxiane våre.


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/handicap-39397_960_720.png?etag=W%2F%2293ba-664bb5cc%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=296%2B296&extract=0%2B0%2B296%2B291)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)

Scan QR Code and order

Copyright © Voss Taxi SA

`
          }
        ]
      },
      {
        id: 'page-bli-sjafor-no',
        locale: 'no',
        slug: 'bli-sjafor',
        title: 'Nyheter Og Praktisk Informasjon',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Nyheter Og Praktisk Informasjon',
            body: `
![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308)

Tlf: (+47) 56 51 13 40

### Lyst til å ha verdas beste kontor utsikt?

Me søkjer etter nye sjåførar til både heiltids og deltids stilling. Skift jobbing, dag, kveld og natt!


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Presentasjon1.jpg?etag=%2236c7e-64aee9ef%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=720%2B1040&extract=0%2B0%2B719%2B994&quality=85)

Er du vår nye sjåfør?

Voss Taxi er i vekst og søkjer sjåførar til oppdrag i Voss Herad og omegn.

Arbeidsoppgåver: Persontransport, køyring av skuleborn, pasientransport m.m

Me ser etter: Sjåfører som er blide og serviceinnstilte personar som likar å jobba med mennesker, og er glad i å køyra bil.

Voss Taxi tilbyr

Gratis sjåførkurs!

Tilbudet betinger at du oppfyller vanlige krav for å bli taxisjåfør, det vil sei at du må være over 20 år og ha hatt førerkort i minst to år. Du må også ha tilfredsstillende norsk- kunnskaper. Du må som sjåførkandidat betale for obligatorisk teoriprøve hos Statens Vegvesen  – men denne kostnaden får du refundert dersom du fullfører kurset og byrjer å jobba for ein av våre taxieigere.

Formelle krav til drosjesjåfører i Norge - Kjøreseddel

For å kunne kjøre drosje i Norge må man ha kjøreseddel i tillegg til førerkort. Kravene for at man skal kunne få kjøreseddel er at ein:

Må være fylt 20 år

Må ha hatt førerkort i minimum 2 år sammenhengende

Har bestått teoriprøve hos Statens vegvesen – eller YSK for persontransport

Oppfyller helsekravene for persontransport mot vederlag

Har en slik vandel at politiet ikkje finn vedkommande uegna til å føre drosje.

Søkere frå land utenfor EØS området må ha minimum fire års botid i Norge

I tillegg kommer Voss Taxi krav

Gjennomført sjåfør opplæring hjå oss

Kjenntmannsprøve

Beherske norsk skriftleg og muntleg på B2 nivå eller bedre.

Pliktar å utføre eventuelle kurs sentralen finn naudsynt. Som t.d. førstehjelp.

Underskreven tausheit og lojalitets avtalar med sentralen

Arbeidskontrakt med prøvetidsbestemmelsar

Bestått pasientreiser E Læring kurs.

## Send oss ein forespørsel på sjoff@vosstaxi.no

## Gå inn på lenka under for meir informasjon


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)

Scan QR Code and order

Copyright © Voss Taxi SA

`
          }
        ]
      },
      {
        id: 'page-om-oss-no',
        locale: 'no',
        slug: 'om-oss',
        title: 'Om Oss',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Om Oss',
            body: `
![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308)

Tlf: (+47) 56 51 13 40

## Takster

Jamførpris pr 15.04.2024


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Image.jpg?etag=%2279c22-66393eb6%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=1116%2B726&quality=85)

Betalingsløsninger

I tillegg til kontant betaling kan du selvsagt betale med kredittkort.

Alle våre biler tar imot VISA /Visa Electron, American Express, Diners, Eurocard og Mastercard.


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/mc_hrz_opt_pos_105_3x.png?etag=%22bac-5f09bf78%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=315%2B72&extract=0%2B0%2B313%2B72)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/AXP_BlueBoxLogo_EXTRALARGEscale_RGB_DIGITAL_1600x1600.png?etag=%228dd9-5f0836be%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=247%2B247&extract=0%2B0%2B247%2B247)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/contactless-indicator-vertical-800x450.png?etag=%22e1ed-5f0836bb%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=592%2B333&extract=189%2B0%2B211%2B333)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Diners-Club-Logo-1.png?etag=%22bc47-5f0836bc%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=310%2B247&extract=0%2B0%2B310%2B247)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/vipps-neg.png?etag=%223235-5f0836bd%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=371%2B222&extract=0%2B0%2B370%2B222)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Samsung_Pay-Logo.png?etag=%222fa5-6648d6e0%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=541%2B120&extract=0%2B0%2B541%2B112)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/applepay.png?etag=%22b3f-6648d6da%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=316%2B130&extract=0%2B0%2B316%2B123)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)

Scan QR Code and order

Copyright © Voss Taxi SA

`
          }
        ]
      },
      {
        id: 'page-pakker-no',
        locale: 'no',
        slug: 'pakker',
        title: 'Pakker',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Pakker',
            body: `
![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308)

Tlf: (+47) 56 51 13 40

Opplev Voss

Få mer ut av oppholdet ditt.

Sightseeing på Voss for 1-16 passasjerer med Voss Taxi.

Våre sjåfører kan vise deg de beste severdighetene her på Voss. Du kan stoppe undervegs for å besøke de ulike destinasjonene, og du bestemmer selv hvor du vil begynne å avslutte reisen.

Med Voss Taxi kan du skreddersy din egen sightseeing utflukt og gå akkurat der du vil gå i ditt eget tempo. Vi er glade for å gi forslag til ruter, men vil tilpasse ekskursjon til ønskene og interessene til deg og dine andre medreisende. Våre kjøretøyer kommer med profesjonelle og erfarne sjåfører med kjennskap til området.

Tvindefossen

Tvindefossen er den 98. høyeste fossen i Norge regnet ut i fra totalt fall. Fossen ligger ved Tvinde i Voss kommune, 12 km. nord for Voss sentrum like ved E-16. Fossen er en kjent turistattraksjon. Fossen har ett totalt fall på 110 meter hvor det lengste fallet er 85 meter. Vannet fra Tvindefossen kommer fra Kroelva og renner ut i Strandaelva.

På slutten av 1990-tallet skapte også vatnet i Tvindefossen et rykte for foryngelse og gjenoppliving av seksuell styrke som gjorde det til et av de viktigste naturlige turistattraksjonene i Vest-Norge, med så mange som 200 000 mennesker i året fra USA, Japan og Russland besøker og fyller containere med vannet. På et tidspunkt var det Norges niende mest besøkte naturlige attraksjon, med 272 000 besøkende


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/TvindeFossen%2003.jpg?etag=%227fcb15-5f09c190%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=748%2B497&extract=0%2B0%2B748%2B490&quality=85)

Skjervsfossen

Skjervsfossen er en foss i Granvin kommune i Hordaland. Den ligger ved Skjervet, omtrent midt mellom Granvin og Voss. Riksvei 13 passerer på avsatsen mellom fossens øvre og nedre fall. R13 er en av Norges viktigste turist veier.

Fossen ligger 15 kilometer fra Voss sentrum, men pass på å ta gamle veien og ikke tunnelen! Skjervefossen er en tvillingfoss i elva Storelvi med en total høyde på 125 meter. Den øvre delen er den mest imponerende med et vertikal fall på 60 meter.


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/SkjerveFossen%2003.jpg?etag=%2279e57d-5f09c169%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=757%2B503&extract=0%2B0%2B748%2B503&quality=85)

Bordalsgjelet

Bordalsgjelet er en spektakulær naturattraksjon i gangavstand frå sentrum. Det djupe og dramatiske Bordalsgjelet er tilrettelagt for publikum med, utsiktspunkt og benker.

Når det ikke er snø og is er det òg en tilrettelagt sti du kan følge innover gjelet. Her får du god utsikt til de fantastiske jettegrytene som is og elven har formet gjennom årtusen, men hugs, for din egen sikkerhet: Hold deg til de merkede stiene!


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/Bordalsgjelet%2002.jpg?etag=%226cd4e7-5f09c189%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=748%2B497&extract=0%2B0%2B748%2B497&quality=85)

Mølstertunet

Voss Folkemuseum ble grunnlagt i 1917. Museets første oppgåve var å kjøpe gårdstun på Mølster, som i dag er en av tre autentiske gårdstun som eies og konservert av museet. I disse tre gårdstun er alle bygningene fortsatt plassert akkurat der de var da folk bodde der.

På Mølster gård, som lett kan sees i åssiden ovenfor Vossevangen, er det en nyere museums bygning, hvor permanente og midlertidige utstillinger gir den besøkende større kunnskap om den lokale kulturen. Det er og en museumsbutikk, og om sommeren har de vanligvis høner og sauer på gården. Det er mulig å nå museet til fots eller med bil.


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/M%C3%B8lster,_Voss_folkemuseum,_Hordaland_-_Riksantikvaren-T280_01_0036.jpg?etag=%22913613-5f09c170%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=762%2B519&extract=0%2B0%2B762%2B443&quality=85)

Sightseeing – Voss Taxi (2026)

Mandag – fredag

1–4 personar (opptil 1 time): NOK 900

5–6 personar (opptil 1 time): NOK 1000

7–8 personar (opptil 1 time): NOK 1100

9–16 personar (opptil 1 time): NOK 1150

Laurdag – sundag

1–4 personar (opptil 1 time): NOK 1000

5–6 personar (opptil 1 time): NOK 1100

7–8 personar (opptil 1 time): NOK 1200

9–16 personar (opptil 1 time): NOK 1250

Eventuelle bompengar kjem i tillegg.

Vilkår

Tida startar ved avtalt oppmøte og vert rekna fortløpande.

Eventuell ventetid under stopp er inkludert i timen. Lengre stopp vert belasta ekstra.

Turen må starte og avsluttast i Voss sentrum (Vossevangen).

Turar utanfor dette området vert køyrde etter ordinær takst.

Sightseeing gjeld lokal køyring i Voss-området. Lengre turar må avtalast på førehand.

Pris vert fastsett etter faktisk tal passasjerar ved turstart.

Ved forseinka oppmøte vert tida rekna frå avtalt tidspunkt.

Manglande oppmøte kan verte fakturert.

Avbestilling må skje seinast 12 timar før avtalt tid.

Laurdag-/søndagspris gjeld òg for heilagdagar.

Sightseeing omfattar transport med sjåfør. Guiding er ikkje inkludert med mindre anna er avtalt.

Betaling skjer ved turstart eller etter avtale.

Bestilling og kontakt

Voss Taxi

Uttrågata 19

Tlf: +47 56 51 13 40

Maxi-Taxi: +47 93 24 98 44

post@vosstaxi.no

www.vosstaxi.no


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)

Scan QR Code and order

Copyright © Voss Taxi SA

`
          }
        ]
      },
      {
        id: 'page-trygt-heim-no',
        locale: 'no',
        slug: 'trygt-heim',
        title: 'Trygt Heim',
        eyebrow: 'Voss Taxi SA',
        summary: '',
        blocks: [
          {
            type: 'rich_text',
            title: 'Trygt Heim',
            body: `
![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/2.3___serialized1.png?etag=W%2F%22b9762-66313ecf%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=543%2B308)

Tlf: (+47) 56 51 13 40

TRYGT HEIM

Voss Taxi startar opp med skyss for ungdom kvar onsdag. Desse rutene vil gå ifrå Voss Stasjon kl.21:15. Det vert køyrd i følgjande retningar:

Voss Stasjon – Bolstad

Voss Stasjon – Tinghuset – Palmafossen – Tvinde

For meir informasjon gå til:

SKYSS

https://www.skyss.no/reise/aktuelt/trygt-heim-voss-5.-februar

VOSS HERAD

https://voss.herad.no/aktuelt-fra-kommunen/nytt-transporttilbod-til-ungdom-trygt-heim-fra-vangen.11503.aspx


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/20180618_212754.jpg?etag=%223c5bfa-5f08341d%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=590%2B443&extract=6%2B0%2B577%2B392&quality=85)

Du kjøper vanleg bussbillett i appen Skyss Billett, om bord med kontantar eller bankkort, på SMS eller i nettbutikken.

Trygt Heim er eit tilbod for dei mellom 13 og 24, men kan også nyttast av andre dersom det er ledig plass. Så om det er reisande, uavhengig av alder så går tilbodet, men ungdom er prioritert.

Tidlegare avgangar med Trygt heim natt til laurdag vert ikkje køyrd lenger.


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/tinywow_Student%20rabatt_54313707_1.jpg?etag=%225280e-662d516c%22&sourceContentType=image%2Fjpeg&ignoreAspectRatio&resize=701%2B991&extract=0%2B0%2B701%2B987&quality=85)


![image](https://impro.usercontent.one/appid/oneComWsb/domain/vosstaxi.no/media/vosstaxi.no/onewebmedia/QR-Kode%20bestilling%20Voss%20Taxi.png?etag=%22333-5f09be43%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=200%2B200)

Scan QR Code and order

Copyright © Voss Taxi SA

`
          }
        ]
      }

    ],
    services: [
      {
        id: 'service-no-1',
        locale: 'no',
        title: 'UT Å FLY',
        description: 'Skal du ut å fly så køyrer me og til og i frå Flesland Lufthavn. Ring eller send oss ein mail for meir informasjon og fastpris.',
        capacity: '1-16 passasjerar',
        sort: 1,
      },
      {
        id: 'service-no-2',
        locale: 'no',
        title: 'RULLESTOL',
        description: 'Voss Taxi har ein variert bilpark med plass til samanleggbare rullestolar, men ved behov for å ha med elektrisk rullestol, eller behov for å sitte i rullestolen under transport har me to 16 setar MaxiTaxiar med plass til 2 brukarar samtidig. Samt 3 stk 8 setar rullestolbil, alle med rampe for lett ombordstigning.',
        capacity: 'Inntil 2 rullestolar',
        sort: 2,
      },
      {
        id: 'service-no-3',
        locale: 'no',
        title: 'HITTEGODS',
        description: 'Har du mista noko? Ta kontakt med oss. Me får stadig inn mobilar, hanskar, huer, vesker, briller, skjerf og paraplyar. Alle gjenstandar som vert funne i våre bilar vert bevart på sentralen vår.',
        capacity: '',
        sort: 3,
      },
      {
        id: 'service-no-4',
        locale: 'no',
        title: 'BORN I BIL',
        description: 'Me har barnestolar med IsoFix og støttebase for born i alle aldrar. I tillegg har me eit breitt utval i belteputer og beltestolar.',
        capacity: '',
        sort: 4,
      },
      {
        id: 'service-no-5',
        locale: 'no',
        title: 'SYKKEL?',
        description: 'Me har og moglegheit for å ta med sykkel. Vennligst opplys om dette på førehand, så tek me med oss stativ.',
        capacity: '',
        sort: 5,
      },
      {
        id: 'service-no-6',
        locale: 'no',
        title: 'FØRARHUND',
        description: 'Alle våre bilar og sjåførar tar med seg hund.',
        capacity: '',
        sort: 6,
      },
    ],
    fares: [
      { id: 'fare-phone-no', locale: 'no', label: 'Sentral', value: '56 51 13 40', note: 'Ring for bestilling og pris', sort: 1 },
      { id: 'fare-calc-no', locale: 'no', label: 'Kalkulator', value: 'Online', note: 'Sjekk estimert pris før turen', sort: 2 },
      { id: 'fare-app-no', locale: 'no', label: 'App', value: 'Snappy Taxi', note: 'Bestill via app frå App Store eller Google Play', sort: 3 },
    ],
    gallery: norwegianGallery,
    quickLinks: [
      { id: 'ql-book-no', locale: 'no', title: 'Bestill taxi', description: 'Gå rett til bestilling.', href: settings.booking_url, label: 'Bestill', sort: 1 },
      { id: 'ql-calc-no', locale: 'no', title: 'Priskalkulator', description: 'Få eit estimat før turen.', href: settings.fare_calculator_url, label: 'Opne kalkulator', sort: 2 },
      { id: 'ql-vy-no', locale: 'no', title: 'Vy Taxi', description: 'Bestill via Vy der det passar.', href: 'https://www.vy.no/reis-med-vy/taxi', label: 'Vy taxi', sort: 3 },
    ],
  },
  en: {
    settings,
    source: 'fallback',
    navigation: [
      { id: 'nav-home-en', locale: 'en', label: 'Home', href: '/en', sort: 1 },
      { id: 'nav-om-oss-en', locale: 'en', label: 'About Us', href: '/en/om-oss', sort: 2 },
      { id: 'nav-services-en', locale: 'en', label: 'Services', href: '/en/tenester', sort: 3 },
      { id: 'nav-pakker-en', locale: 'en', label: 'Packages', href: '/en/pakker', sort: 4 },
      { id: 'nav-maxi-taxi-en', locale: 'en', label: 'Maxi Taxi', href: '/en/maxi-taxi', sort: 6 },
      { id: 'nav-bli-sjafor-en', locale: 'en', label: 'Become a driver', href: '/en/bli-sjafor', sort: 7 },
      { id: 'nav-gallery-en', locale: 'en', label: 'Gallery', href: '/en/galleri', sort: 8 },
      { id: 'nav-ris-ros-en', locale: 'en', label: 'Feedback', href: '/en/ris-ros', sort: 9 },
      { id: 'nav-contact-en', locale: 'en', label: 'Contact', href: '/en/kontakt', sort: 10 },
    ],
    pages: [
      {
        id: 'home-en',
        locale: 'en',
        slug: 'home',
        eyebrow: 'Local taxi company in Voss',
        title: 'Drive safe with us, from Voss.',
        summary:
          'Voss Taxi provides sedans, minivans, maxi-taxis, minibuses and wheelchair transport for locals and visitors.',
        hero_image: settings.hero_media,
        blocks: [
          {
            type: 'rich_text',
            title: 'Book with confidence',
            body: 'Use phone, app or fare calculator to plan your trip from Voss.',
          },
        ],
      },
      {
        id: 'services-en',
        locale: 'en',
        slug: 'services',
        eyebrow: 'Services',
        title: 'Vehicles for every kind of trip.',
        summary: 'Transport for groups, luggage, wheelchair users, tourists and everyday travel.',
        blocks: [],
      },
      {
        id: 'fares-en',
        locale: 'en',
        slug: 'fares',
        eyebrow: 'Fares',
        title: 'Clear fares and quick estimates.',
        summary: 'Use the calculator or call dispatch for trips that need planning.',
        blocks: [],
      },
      {
        id: 'gallery-en',
        locale: 'en',
        slug: 'gallery',
        eyebrow: 'Gallery',
        title: 'Voss Taxi on the road.',
        summary: 'A small selection from the fleet and everyday taxi service in Voss.',
        blocks: [],
      },
      {
        id: 'contact-en',
        locale: 'en',
        slug: 'contact',
        eyebrow: 'Contact',
        title: 'Contact Voss Taxi.',
        summary: 'Call dispatch, send an email or find us in Uttrågata.',
        blocks: [],
      },
      {
        id: 'page-wheelchair-en',
        locale: 'en',
        slug: 'wheelchair',
        title: 'Wheelchair',
        blocks: [
          {
            type: 'rich_text',
            title: 'Wheelchair',
            body: 'We have vehicles adapted for wheelchairs.'
          }
        ]
      },
      {
        id: 'page-ris-ros-en',
        locale: 'en',
        slug: 'ris-ros',
        title: 'Feedback',
        blocks: [
          {
            type: 'rich_text',
            title: 'Feedback',
            body: 'Here you can send formal complaints or praise to us.\n\n## Send a complaint\n\nIf you wish to submit a formal complaint, this must be submitted in writing by using the options below, or by email to post@vosstaxi.no.\nWe will send you a written confirmation within 14 days that the complaint has been received, along with information about the expected processing time.\n\nFormal complaints will be answered in writing. Documentation regarding the complaint is kept with us for three years after the complaint processing has concluded.\n\n## Give us praise or criticism\n\nWe welcome your views, feedback, and tips for improvement. It is the best help you can give us in our efforts to become even better.'
          },
          {
            type: 'cta',
            title: 'Complaint regarding driver',
            body: 'If you wish to submit a complaint about one of our drivers.',
            href: 'mailto:post@vosstaxi.no?subject=Complaint%20regarding%20driver',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'Complaint regarding service',
            body: 'If you wish to complain about a service we have provided.',
            href: 'mailto:post@vosstaxi.no?subject=Complaint%20regarding%20service',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'General complaints',
            body: 'If you have other general complaints about our services.',
            href: 'mailto:post@vosstaxi.no?subject=General%20complaint',
            label: 'Send complaint'
          },
          {
            type: 'cta',
            title: 'Praise',
            body: 'We greatly appreciate praise when you have had a good experience with us!',
            href: 'mailto:post@vosstaxi.no?subject=Praise%20for%20Voss%20Taxi',
            label: 'Send praise'
          },
          {
            type: 'cta',
            title: 'General information',
            body: 'Questions or general information that does not fall under complaints or praise.',
            href: 'mailto:post@vosstaxi.no?subject=General%20information',
            label: 'Send email'
          }
        ]
      },
    ],
    services: [
      {
        id: 'service-maxi-en',
        locale: 'en',
        title: 'Maxi-Taxi & wheelchair',
        description: 'Minibuses with room for up to 16 passengers or 2 wheelchairs at the same time.',
        capacity: '16 passengers',
        sort: 1,
      },
      {
        id: 'service-van-en',
        locale: 'en',
        title: 'MiniVan',
        description: 'Minivans with room for 7-8 passengers and luggage.',
        capacity: '7-8 passengers',
        sort: 2,
      },
      {
        id: 'service-car-en',
        locale: 'en',
        title: 'Sedans',
        description: 'Sedans for 1-4 passengers and everyday taxi trips.',
        capacity: '1-4 passengers',
        sort: 3,
      },
    ],
    fares: [
      { id: 'fare-phone-en', locale: 'en', label: 'Dispatch', value: '56 51 13 40', note: 'Call to book or ask for fares', sort: 1 },
      { id: 'fare-calc-en', locale: 'en', label: 'Calculator', value: 'Online', note: 'Check an estimate before travelling', sort: 2 },
      { id: 'fare-app-en', locale: 'en', label: 'App', value: 'Snappy Taxi', note: 'Download from App Store or Google Play', sort: 3 },
    ],
    gallery: englishGallery,
    quickLinks: [
      { id: 'ql-book-en', locale: 'en', title: 'Book taxi', description: 'Go straight to booking.', href: settings.booking_url, label: 'Book', sort: 1 },
      { id: 'ql-calc-en', locale: 'en', title: 'Fare calculator', description: 'Get an estimate before the trip.', href: settings.fare_calculator_url, label: 'Open calculator', sort: 2 },
    ],
  },
}
