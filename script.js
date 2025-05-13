const BASE_URL = 'http://localhost:3000';

// İl-ilçe eşleşmeleri
const districts = {
     "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
     "Adıyaman": ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
     "Afyonkarahisar": ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Merkez", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
     "Ağrı": ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
     "Aksaray": ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi"],
     "Amasya": ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
     "Ankara": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
     "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
     "Ardahan": ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
     "Artvin": ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Kemalpaşa", "Merkez", "Murgul", "Şavşat", "Yusufeli"],
     "Aydın": ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
     "Balıkesir": ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
     "Bartın": ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
     "Batman": ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
     "Bayburt": ["Aydıntepe", "Demirözü", "Merkez"],
     "Bilecik": ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
     "Bingöl": ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
     "Bitlis": ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
     "Bolu": ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
     "Burdur": ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
     "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
     "Çanakkale": ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
     "Çankırı": ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
     "Çorum": ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
     "Denizli": ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
     "Diyarbakır": ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
     "Düzce": ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"],
     "Edirne": ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
     "Elazığ": ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
     "Erzincan": ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
     "Erzurum": ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
     "Eskişehir": ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
     "Gaziantep": ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
     "Giresun": ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
     "Gümüşhane": ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
     "Hakkari": ["Çukurca", "Merkez", "Şemdinli", "Yüksekova"],
     "Hatay": ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
     "Iğdır": ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
     "Isparta": ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
     "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
     "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
     "Kahramanmaraş": ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
     "Karabük": ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
     "Karaman": ["Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Merkez", "Sarıveliler"],
     "Kars": ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
     "Kastamonu": ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Küre", "Merkez", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
     "Kayseri": ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
     "Kilis": ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
     "Kırıkkale": ["Bahşili", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
     "Kırklareli": ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
     "Kırşehir": ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
     "Kocaeli": ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Körfez", "Derbent"],
     "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
     "Kütahya": ["Altıntaş", "Aslanapa", "Çavdarhisar", "Dumlupınar", "Emet", "Gediz", "Merkez", "Pazarlar", "Şaphane", "Simav", "Tavşanlı"],
     "Malatya": ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
     "Manisa": ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
     "Mardin": ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
     "Mersin": ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
     "Muğla": ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
     "Muş": ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
     "Nevşehir": ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
     "Niğde": ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
     "Ordu": ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
     "Osmaniye": ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
     "Rize": ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Merkez", "Pazar"],
     "Sakarya": ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
     "Samsun": ["Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Ondokuzmayıs", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
     "Siirt": ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
     "Sinop": ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
     "Sivas": ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Gürün", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Merkez", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
     "Şanlıurfa": ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
     "Şırnak": ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
     "Tekirdağ": ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
     "Tokat": ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"],
     "Trabzon": ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
     "Tunceli": ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
     "Uşak": ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
     "Van": ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
     "Yalova": ["Altınova", "Armutlu", "Çiftlikköy", "Çınarcık", "Merkez", "Termal"],
     "Yozgat": ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
     "Zonguldak": ["Alaplı", "Çaycuma", "Devrek", "Ereğli", "Gökçebey", "Kilimli", "Kozlu", "Merkez"]
};

document.addEventListener('DOMContentLoaded', () => {
     const loginButton = document.getElementById('loginButton');
     const showRegisterButton = document.getElementById('showRegisterButton');
     const registerButton = document.getElementById('registerButton');
     const showLoginButton = document.getElementById('showLoginButton');
     const logoutButton = document.getElementById('logoutButton');
     const errorDiv = document.getElementById('error');
     const loginUsername = document.getElementById('loginUsername');
     const loginPassword = document.getElementById('loginPassword');
     const registerUsername = document.getElementById('registerUsername');
     const registerPassword = document.getElementById('registerPassword');
     const video = document.getElementById('video');
     const canvas = document.getElementById('canvas');
     const toggleButton = document.getElementById('toggleButton');
     const nameInput = document.getElementById('nameInput');
     const ageInput = document.getElementById('ageInput');
     const ocukInput = document.getElementById('ocukInput');
     const jobInput = document.getElementById('jobInput');
     const universityInput = document.getElementById('universityInput');
     const livingCityInput = document.getElementById('livingCityInput');
     const livingDistrictInput = document.getElementById('livingDistrictInput');
     const studyingCityInput = document.getElementById('studyingCityInput');
     const studyingDistrictInput = document.getElementById('studyingDistrictInput');
     const departmentInput = document.getElementById('departmentInput');
     const faceImage = document.getElementById('faceImage');
     const personRegisterButton = document.getElementById('personRegisterButton');
     let isAnalysisActive = false;
     let database = [];
     let stream = null;
     
     console.log('DOM yüklendi:', { loginButton, registerButton, toggleButton });
     
     function showMessage(message, isError = true) {
          if (!errorDiv) return console.error('errorDiv bulunamadı');
          errorDiv.textContent = message;
          errorDiv.classList.remove('hidden', 'bg-green-600', 'bg-red-400');
          errorDiv.classList.add(isError ? 'bg-red-400' : 'bg-green-600');
          setTimeout(() => errorDiv.classList.add('hidden'), 5000);
     }
     
     // İl-ilçe güncelleme fonksiyonu
     function updateDistricts(citySelect, districtSelect) {
          const city = citySelect.value;
          districtSelect.innerHTML = '<option value="" disabled selected>İlçe seçin</option>';
          if (city && districts[city]) {
               districts[city].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
               });
          }
     }
     
     // İl seçimine bağlı ilçe güncelleme
     if (livingCityInput) {
          livingCityInput.addEventListener('change', () => updateDistricts(livingCityInput, livingDistrictInput));
     }
     if (studyingCityInput) {
          studyingCityInput.addEventListener('change', () => updateDistricts(studyingCityInput, studyingDistrictInput));
     }
     
     async function checkLogin() {
          const token = localStorage.getItem('authToken');
          const currentPath = window.location.pathname;
          console.log('checkLogin:', { token, currentPath });
          
          if (!token) {
               if (currentPath !== '/login.html' && currentPath !== '/register.html') {
                    console.log('Token yok, login.html’e yönlendiriliyor');
                    window.location.href = '/login.html';
               }
               return;
          }
          
          try {
               const response = await fetch(`${BASE_URL}/verify-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
               });
               if (response.ok) {
                    if (currentPath !== '/index.html') {
                         console.log('Token geçerli, index.html’e yönlendiriliyor');
                         window.location.href = '/index.html';
                    } else {
                         await initializeApp();
                    }
               } else {
                    localStorage.removeItem('authToken');
                    console.log('Token geçersiz, login.html’e yönlendiriliyor');
                    window.location.href = '/login.html';
               }
          } catch (err) {
               showMessage('Oturum kontrolü başarısız: ' + err.message);
               localStorage.removeItem('authToken');
               window.location.href = '/login.html';
          }
     }
     
     if (loginButton) {
          loginButton.addEventListener('click', async () => {
               console.log('Giriş butonuna tıklandı');
               const username = loginUsername.value.trim();
               const password = loginPassword.value.trim();
               if (!username || !password) {
                    showMessage('Kullanıcı adı ve şifre boş olamaz.');
                    return;
               }
               
               try {
                    console.log('Giriş isteği:', { username });
                    const response = await fetch(`${BASE_URL}/login-user`, {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ username, password })
                    });
                    console.log('Giriş yanıtı:', response.status);
                    const result = await response.json();
                    if (!response.ok) throw new Error(result.error || 'Giriş başarısız.');
                    localStorage.setItem('authToken', result.token);
                    showMessage('Giriş başarılı!', false);
                    window.location.href = '/index.html';
               } catch (err) {
                    showMessage('Giriş hatası: ' + err.message);
                    console.error('Giriş hatası:', err);
               }
          });
     }
     
     if (showRegisterButton) {
          showRegisterButton.addEventListener('click', () => {
               console.log('Kayıt ol butonuna tıklandı');
               window.location.href = '/register.html';
          });
     }
     
     if (registerButton) {
          registerButton.addEventListener('click', async () => {
               console.log('Kayıt butonuna tıklandı');
               const username = registerUsername.value.trim();
               const password = registerPassword.value.trim();
               if (!username || !password) {
                    showMessage('Kullanıcı adı ve şifre boş olamaz.');
                    return;
               }
               if (username.length < 3 || username.length > 20) {
                    showMessage('Kullanıcı adı 3-20 karakter olmalı.');
                    return;
               }
               if (password.length < 6) {
                    showMessage('Şifre en az 6 karakter olmalı.');
                    return;
               }
               
               try {
                    console.log('Kayıt isteği:', { username });
                    const response = await fetch(`${BASE_URL}/register-user`, {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ username, password })
                    });
                    console.log('Kayıt yanıtı:', response.status);
                    const result = await response.json();
                    if (!response.ok) throw new Error(result.error || 'Kayıt başarısız.');
                    showMessage('Kayıt başarılı! Giriş yapabilirsiniz.', false);
                    registerUsername.value = '';
                    registerPassword.value = '';
                    window.location.href = '/login.html';
               } catch (err) {
                    showMessage('Kayıt hatası: ' + err.message);
                    console.error('Kayıt hatası:', err);
               }
          });
     }
     
     if (showLoginButton) {
          showLoginButton.addEventListener('click', () => {
               console.log('Giriş yap butonuna tıklandı');
               window.location.href = '/login.html';
          });
     }
     
     if (logoutButton) {
          logoutButton.addEventListener('click', () => {
               console.log('Çıkış yap butonuna tıklandı');
               localStorage.removeItem('authToken');
               stopWebcam();
               showMessage('Oturum kapatıldı.', false);
               window.location.href = '/login.html';
          });
     }
     
     async function loadDatabase() {
          try {
               const response = await fetch(`${BASE_URL}/data.json`, { cache: 'no-store' });
               if (!response.ok) throw new Error(`Veri tabanı dosyası bulunamadı: ${response.status}`);
               database = await response.json();
               console.log('Veri tabanı yüklendi:', database);
          } catch (err) {
               showMessage('Veri tabanı yüklenemedi: ' + err.message);
               console.error('Veri tabanı yükleme hatası:', err);
          }
     }
     
     async function saveDatabase() {
          try {
               const response = await fetch(`${BASE_URL}/save-database`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(database, null, 2)
               });
               if (!response.ok) throw new Error(`Sunucu hatası: ${response.status}`);
               console.log('Veri tabanı kaydedildi');
          } catch (err) {
               showMessage('Veri tabanı kaydedilemedi: ' + err.message);
               console.error('Veri tabanı kaydetme hatası:', err);
          }
     }
     
     async function loadModels() {
          try {
               console.log('Modeller yükleniyor...');
               await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/weights/'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/weights/'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/weights/')
               ]);
               console.log('Modeller yüklendi');
          } catch (err) {
               showMessage('Modeller yüklenemedi. weights/ klasörünü kontrol edin.');
               console.error('Model yükleme hatası:', err);
               throw err;
          }
     }
     
     async function startWebcam() {
          try {
               console.log('Kamera başlatılıyor...');
               stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
               video.srcObject = stream;
               video.play();
               console.log('Web kamerası başlatıldı');
          } catch (err) {
               showMessage('Web kamerasına erişilemedi. Kamera izinlerini kontrol edin.');
               console.error('Web kamerası hatası:', err);
               isAnalysisActive = false;
               toggleButton.textContent = 'Analizi Başlat';
               toggleButton.classList.add('bg-green-600', 'hover:bg-green-700');
               toggleButton.classList.remove('bg-red-600', 'hover:bg-red-700');
               throw err;
          }
     }
     
     function stopWebcam() {
          if (stream) {
               stream.getTracks().forEach(track => track.stop());
               stream = null;
               console.log('Web kamerası durduruldu');
          }
          if (canvas) {
               const context = canvas.getContext('2d');
               context.clearRect(0, 0, canvas.width, canvas.height);
          }
     }
     
     async function analyzeWebcam() {
          if (!isAnalysisActive || !stream) return;
          
          canvas.width = video.width;
          canvas.height = video.height;
          const context = canvas.getContext('2d');
          
          const detect = async () => {
               if (!isAnalysisActive) return;
               
               try {
                    const detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
                    .withFaceLandmarks()
                    .withFaceDescriptors();
                    
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    detections.forEach(detection => {
                         const box = detection.detection.box;
                         const landmarks = detection.landmarks;
                         const descriptor = detection.descriptor;
                         
                         const bestMatch = database.reduce((best, person) => {
                              if (!person.descriptor) return best;
                              const distance = faceapi.euclideanDistance(descriptor, person.descriptor);
                              return distance < best.distance ? { person, distance } : best;
                         }, { person: null, distance: 0.6 });
                         
                         context.strokeStyle = 'blue';
                         context.lineWidth = 2;
                         context.beginPath();
                         const jawline = landmarks.positions.slice(0, 17);
                         jawline.forEach((point, index) => {
                              if (index === 0) context.moveTo(point.x, point.y);
                              else context.lineTo(point.x, point.y);
                         });
                         context.stroke();
                         
                         context.strokeStyle = 'red';
                         context.lineWidth = 2;
                         const leftEye = landmarks.getLeftEye();
                         const rightEye = landmarks.getRightEye();
                         context.beginPath();
                         context.moveTo(leftEye[0].x, leftEye[0].y);
                         leftEye.forEach(point => context.lineTo(point.x, point.y));
                         context.closePath();
                         context.stroke();
                         
                         context.beginPath();
                         context.moveTo(rightEye[0].x, rightEye[0].y);
                         rightEye.forEach(point => context.lineTo(point.x, point.y));
                         context.closePath();
                         context.stroke();
                         
                         context.font = '16px Arial';
                         context.fillStyle = 'white';
                         context.strokeStyle = 'black';
                         context.lineWidth = 1;
                         if (bestMatch.person) {
                              const text = `${bestMatch.person.name}, ${bestMatch.person.age}, ${bestMatch.person.ocuk}, ${bestMatch.person.job}, ${bestMatch.person.university}, ${bestMatch.person.department}`;
                              context.strokeText(text, box.x, box.y - 10);
                              context.fillText(text, box.x, box.y - 10);
                         } else {
                              context.strokeText('Bilinmiyor', box.x, box.y - 10);
                              context.fillText('Bilinmiyor', box.x, box.y - 10);
                         }
                    });
                    
                    requestAnimationFrame(detect);
               } catch (err) {
                    showMessage('Yüz analizi sırasında hata oluştu: ' + err.message);
                    console.error('Analiz hatası:', err);
               }
          };
          
          video.addEventListener('play', () => detect(), { once: true });
     }
     
     function validatePersonInputs() {
          if (!nameInput.value.trim()) return 'İsim alanı boş olamaz.';
          if (!ageInput.value || ageInput.value < 0 || isNaN(ageInput.value)) return 'Geçerli bir yaş girin (0 veya pozitif sayı).';
          if (!ocukInput.value || ocukInput.value < 0 || isNaN(ocukInput.value)) return 'Geçerli bir çocuk sayısı girin (0 veya pozitif sayı).';
          if (!jobInput.value.trim()) return 'Meslek alanı boş olamaz.';
          if (!universityInput.value) return 'Üniversite seçilmedi.';
          if (!livingCityInput.value) return 'Yaşadığı il seçilmedi.';
          if (!livingDistrictInput.value) return 'Yaşadığı ilçe seçilmedi.';
          if (!studyingCityInput.value) return 'Okuduğu il seçilmedi.';
          if (!studyingDistrictInput.value) return 'Okuduğu ilçe seçilmedi.';
          if (!departmentInput.value.trim()) return 'Bölüm alanı boş olamaz.';
          if (!faceImage.files[0]) return 'Lütfen bir yüz fotoğrafı yükleyin.';
          return null;
     }
     
     if (personRegisterButton) {
          personRegisterButton.addEventListener('click', async () => {
               const validationError = validatePersonInputs();
               if (validationError) {
                    showMessage(validationError);
                    return;
               }
               
               const img = new Image();
               img.src = URL.createObjectURL(faceImage.files[0]);
               img.onload = async () => {
                    try {
                         if (img.width < 50 || img.height < 50) {
                              showMessage('Fotoğraf çok küçük. Minimum 50x50 piksel olmalı.');
                              return;
                         }
                         
                         const detection = await faceapi
                         .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
                         .withFaceLandmarks()
                         .withFaceDescriptor();
                         
                         if (!detection) {
                              showMessage('Fotoğrafta yüz tespit edilemedi. Net, tek bir yüz içeren bir fotoğraf yükleyin.');
                              return;
                         }
                         
                         database.push({
                              id: database.length + 1,
                              name: nameInput.value.trim(),
                              age: parseInt(ageInput.value),
                              ocuk: parseInt(ocukInput.value),
                              job: jobInput.value.trim(),
                              university: universityInput.value,
                              livingCity: livingCityInput.value,
                              livingDistrict: livingDistrictInput.value,
                              studyingCity: studyingCityInput.value,
                              studyingDistrict: studyingDistrictInput.value,
                              department: departmentInput.value.trim(),
                              descriptor: Array.from(detection.descriptor)
                         });
                         
                         await saveDatabase();
                         nameInput.value = '';
                         ageInput.value = '';
                         ocukInput.value = '';
                         jobInput.value = '';
                         universityInput.value = '';
                         livingCityInput.value = '';
                         livingDistrictInput.value = '';
                         studyingCityInput.value = '';
                         studyingDistrictInput.value = '';
                         departmentInput.value = '';
                         faceImage.value = '';
                         livingDistrictInput.innerHTML = '<option value="" disabled selected>Önce il seçin</option>';
                         studyingDistrictInput.innerHTML = '<option value="" disabled selected>Önce il seçin</option>';
                         showMessage('Kişi başarıyla kaydedildi!', false);
                    } catch (err) {
                         showMessage('Kişi kaydedilirken hata oluştu: ' + err.message);
                         console.error('Kayıt hatası:', err);
                    } finally {
                         URL.revokeObjectURL(img.src);
                    }
               };
               img.onerror = () => {
                    showMessage('Fotoğraf yüklenemedi. Geçerli bir görüntü dosyası seçin (JPG/PNG).');
                    URL.revokeObjectURL(img.src);
               };
          });
     }
     
     if (toggleButton) {
          toggleButton.addEventListener('click', async () => {
               console.log('Analiz butonuna tıklandı:', isAnalysisActive ? 'Durdur' : 'Başlat');
               isAnalysisActive = !isAnalysisActive;
               toggleButton.textContent = isAnalysisActive ? 'Analizi Durdur' : 'Analizi Başlat';
               toggleButton.classList.toggle('bg-green-600', !isAnalysisActive);
               toggleButton.classList.toggle('bg-red-600', isAnalysisActive);
               toggleButton.classList.toggle('hover:bg-green-700', !isAnalysisActive);
               toggleButton.classList.toggle('hover:bg-red-700', isAnalysisActive);
               
               if (isAnalysisActive) {
                    try {
                         await startWebcam();
                         if (stream) await analyzeWebcam();
                    } catch (err) {
                         isAnalysisActive = false;
                         toggleButton.textContent = 'Analizi Başlat';
                         toggleButton.classList.add('bg-green-600', 'hover:bg-green-700');
                         toggleButton.classList.remove('bg-red-600', 'hover:bg-red-700');
                    }
               } else {
                    stopWebcam();
                    errorDiv.classList.add('hidden');
               }
          });
     }
     
     async function initializeApp() {
          try {
               await loadModels();
               await loadDatabase();
               console.log('Uygulama başlatıldı');
          } catch (err) {
               showMessage('Uygulama başlatılamadı: ' + err.message);
               console.error('Başlatma hatası:', err);
          }
     }
     
     checkLogin();
});