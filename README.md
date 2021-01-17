
Gezi Rehberi Uygulaması
# GEZİ REHBERİ UYGULAMASI


`IONIC Projesi`

_Gözde Örgü_

_Kocaeli Üniversitesi Bilgisayar Mühendisliği_

### Özet


'Gezi Rehberi Uygulaması' projesi Türkiye için tasarlanmış bir rehber uygulamasıdır. 81 ile ait gezilecek yerlerin isimleri ve görselleri kullanıcıya sunulmaktadır.

#### 1. Giriş

- Bu şablonu kullanmaya başlamak için aşağıdaki seçeneklerden birini seçerek başlayın:

	- En son sürümü buradan indirin
    - Şu adresten klonlayın:   `$ git clone https://github.com/GozdeOrgu/170201005.git`
    - Fork the repo
    
- Projeyi kendi bilgisayarınızda açın.
- Projeyi çalıştırmadan önce npm bağımlılıklarının yüklenmesi için terminalden şu komutu yazın: `   $ npm install` Bu işlem biraz uzun sürebilir.
- Gezi Rehberi Uygulaması'nı başlatmak için terminal ekranına şu komutu yazın: `$ ionic cordova run browser`
- Komutu çalıştırdığınızda karşısına bu soru çıkacak: `
Platform browser is not installed! Would you like to install it? (Y/n)`

- Uygulama tarayıcı üzerinden başlatılacağı için bu soruya `y` cevabını vermeniz gerekmektedir.

	- **NOT : SQLite Porter dahil edildiği için proje** `$ ionic serve` **komutuyla çalışmamaktadır. Projenin başarılı bir şekilde çalışması için lütfen bu uyarıyı dikkate alın.**
- Bu komutları çalıştırınca kısa bir süre sonra uygulama tarayıcı üzerinde çalışmaya başlayacaktır. 
- Uygulama çalıştığında çıkan ilk ekran 'Anasayfa' ekranıdır. Burada uygulamanın amacına yönelik bazı illerden görseller bulunmaktadır.
- Kullanıcı sol üstte bulunan menü butonuna tıkladığında veya ekranı sağa kaydırdığında karşısına bir 'Menü' çıkacaktır. 
- Açılan menü ekranında 3 seçenek bulunmaktadır. Bunlar 'Anasayfa', 'Lokasyon' ve 'Arama' seçenekleridir.
- Kullanıcı 'Lokasyon' a tıkladığında karşısına 81 ilin listesi gelmektedir. Liste şehirleri temsil eden birer görsel ve şehir adlarından oluşmaktadır. 
- Kullanıcı bir ile tıkladığında başka bir sayfa açılmaktadır.
- Açılan sayfada tıkladığı ilin gezilecek yerlerine ait isim ve görsel bilgiler bulunmaktadır. 
- Sol üstte bulunan geri butonuna tıkladığında tekrar 'Lokasyon' ekranına geri dönebilir. 
- Kullanıcı menüden 'Arama' seçeneğine tıkladığında karşısına şehir aratabileceği bir sayfa çıkmaktadır. Listeden seçmek yerine istediği şehri yazarak ve çıkan sonuca tıklayarak istediği şehrin gezilecek yerler sayfasına ulaşabilir.
- Kullanıcı dilerse menü ile sayfalar arasında geçiş yapabilir.

#### 2. Temel Bilgiler

Program Ionic 5 kullanılarak yapılmıştır. Veri tabanı için SQLite Porter kullanılmıştır.

#### 3. Tasarım

##### 3.1 Veri Tabanı

Projede veri tabanı olarak SQLite Porter kullanılmaktadır. 

- Veritabanını kullanabilmek için öncelikle şu kodu yazarak bir service oluşturuldu:

`$ ionic g service services/database`

- Daha sonra sayfalar oluşturuldu.

```
$ ionic g page pages/anasayfa
$ ionic g page pages/lokasyon
$ ionic g page pages/arama
$ ionic g page pages/mekan
```

- SQLLite Porter kurulumu şu kodlar ile tamamlandı:

```
$ npm install @ionic-native/sqlite @ionic-native/sqlite-porter
 
$ ionic cordova plugin add cordova-sqlite-storage

$ ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
```

- `/assets/` içine `seed.sql` adında bir dosya eklendi. Bu dosyanın içinde **lokasyon** ve **mekan** tabloları oluşturuldu. 'lokasyon' tablosunda integer olarak otomatik oluişturulan bir id, text tipinde isim alınan sehir ve yine text tipinde görüntünün dosya yolunun alındığı img sütunları bulunmaktadır. 'mekan' tablosunda ise integer olarak otomatik oluişturulan bir id, text tipinde isim alınan mekan, text tipinde görüntünün dosya yolunun gösterildiği img ve integer olarak şehri tanımlayan bir sehirID sütunu bulunmaktadır. 
- Dosyayı yüklemek için `app/app.module.ts` içine `HttpClientModule` ekledim.
- `services/database.service.ts` dosyasında gerekli değişiklikleri yaptım.
- `uygulama.db` adında bir sqlite yarattım. 
- Sayfalara veri yükleyebilmek adına SQL sorgularının olduğu fonksiyonları oluşturdum.
	- `loadsehirler()` lokasyon tablosundan şehir bilgileri alınıyor.
	- `loadYerler(id)` fonksiyona gelen id bilgisi(ile ait tanımlayıcı) koşuluyla mekan tablosundan o ile ait gezilecek yerler bilgileri alınıyor.
	- `loadSehirAdi(shr)` gelen shr bilgisi(il ismi) koşuluyla lokasyon tablosundan ile ait isim ve tanımlayıcı bilgileri alınıyor.
	- `getSehirler()` şehir bilgilerinin olduğu nesne sonuç olarak döndürülüyor.
	- `getYerler(id)` loadYerler(id) fonksiyonu çağırılıyor daha sonra gezilecek yerler nesnesi sonuç olarak döndürülüyor.
	- `getSehirAdi(shr)` loadSehirAdi(shr) fonksiyonu çağırılıyor daha sonra şehir ismi ve id bilgilerinin olduğu nesne sonuç olarak döndürülüyor.

- Yukarıdaki fonksiyonlarda kullanmak üzere üç nesne tanımladım. Bunlar: `Seh, Yer, SehAd` .
- Veri tabanı bağlantısının sağlanması için bağlantıyı yapacağım sayfaların .ts dosyalarına `DatabaseService` i ve çekeceğim veri türüne ait nesneyi `./../../services/database.service` ile import ettim. (Örnek: `import { DatabaseService, Seh } from './../../services/database.service' `


##### 3.2 Sayfaların Özellikleri

Projede anasayfa, lokasyon, mekan ve arama olmak üzere dört sayfa bulunmaktadır. Sayfalar projenin src > app > pages klasörü altında yer almaktadır. 

- **Anasayfa:** Bu sayfa uygulama başlatıldığında ortaya çıkan ilk sayfadır. Bazı illere ait birer fotoğraf uygulamayı tanıtmak amacıyla burada gösterilmektedir. Sol üstteki menü yardımıyla diğer sayfalara geçiş yapılabilmektedir.
- **Lokasyon:** Bu sayfa illerin listelendiği sayfadır.  Veri tabanından verilerin çekilebilmesi için yukarıda anlatlan `getSehirler()` fonksiyonu çağırılır. Böylece herhangi bir ilin üstüne tıklandığında uygulama kullanıcıyı o şehre ait gezilecek yerlerin listelendiği sayfaya yönlendirmektedir.Bunun için lokasyon sayfasından mekan sayfasına bir id bilgisi gönderilmektedir. id bilgisi gönderebilmek için `app-routing.module.ts` üzerinde lokasyon sayfasını şöyle tanımladım:
```
const routes: Routes = [
...

{ path: 'lokasyon', loadChildren: './pages/lokasyon/lokasyon.module#LokasyonPageModule' },
{ path: 'lokasyon/:id', loadChildren: './pages/mekan/mekan.module#MekanPageModule' },

...
];
```

- **Mekan:** Seçilen ile ait verilerin gösterildiği sayfadır. Bu veriler gezilecek yerlerin isimleri ve görsellerinden oluşmaktadır. Lokasyon sayfasından alınan id bilgisiyle yukarıda tanımlanan `getYerler(id)` fonksiyonu çağırılarak ilgili verilerin alınması sağlanır. 
- **Arama:** Ekranda search bar bulunmaktadır. Buraya merak edilen ilin tam adı yazılarak arama yapılabilir. Çıkan sonuca tıklandığında uygulama kullanıyıcı mekan sayfasına yönlendirmektedir. Bu arama sayfasından mekan sayfasına bir id bilgisi gönderilerek sağlanır. Bilgiyi gönderebilmek için `app-routing.module.ts` üzerinde lokasyon sayfasını şöyle tanımladım:
```
const routes: Routes = [
...

{ path: 'arama', loadChildren: './pages/arama/arama.module#AramaPageModule' },
{ path: 'arama/:id', loadChildren: './pages/mekan/mekan.module#MekanPageModule' },

...
];
```

#### 4. Ekran Görüntüleri

`Anasayfa Ekranı`

![](/img/MP1.PNG)

`Menü Ekranı`

![](/img/MP3.PNG)

`Lokasyon Ekranı`

![](/img/MP4.PNG)

`Mekan Ekranı`

![](/img/MP5.PNG)

![](/img/MP6.PNG)

`Arama Ekranı`

![](/img/MP7.PNG)










