import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const supportedLngs = {
  en: "English",
  ru: "Russian",
  tr: "Turkish",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    supportedLngs: Object.keys(supportedLngs),
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          intro_title: "<0>Enjoy</0> premium coffee at our charming cafe",
          intro_description:
            "With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.",
          header_fav_coffee: "Favorite coffee",
          header_about: "About",
          header_mob_app: "Mobile App",
          header_contact_us: "Contact us",
          menu: "Menu",
          cart: "Cart",

          fav_coffee: "Choose your <1>favorite</1> coffee",
          about:
            "Resource is <1>the perfect and cozy place</1> where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.",
          mob_app: "<0>Download</0> our apps to start ordering",
          mob_app_description:
            "Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are",

          mob_app_apple: "Available on the <1>App Store</1>",
          mob_app_google: "Available on the <1>Google Play</1>",

          footer_title: "Sip, Savor, Smile. <1>It’s coffee time!</1>",
          contact_title: "Contact us",
          time: "Mon–Sat: 9:00 AM – 23:00 PM",
          error: "⚠️ Something went wrong. Please, refresh the page",
          load_error: "Failed to load products. Please try again.",
          order_response:
            "Thank you for your order! Our manager will contact you shortly.",

          menu_title:
            "Behind each of our cups hides an <1>amazing surprise</1>",

          coffee_cat: "Coffee",
          tea_cat: "Tea",
          dessert_cat: "Dessert",

          sign: "Sign In",
          registration: "Registration",
          confirm: "Confirm",

          placeholder: "Type",
          city_placeholder: "Select your city",
          street_placeholder: "Select your street",

          login: "Login",
          password: "Password",
          confirm_password: "Confirm Password",
          city: "City",
          street: "Street",
          house: "House Number",
          pay_by: "Pay by",
          cash: "Cash",
          card: "Card",
          total: "Total",
          size: "Size",
          additives: "Additives",
          alert:
            "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.",
          add_to_cart: "Add to cart",

          address: "Address",
          validation: {
            login_short: "Login must be at least 3 characters long.",
            login_start_letter: "Login must start with a letter.",
            login_only_letters:
              "Login can contain only English letters (A–Z, a–z).",

            password_short: "Password must be at least 6 characters long.",
            password_special:
              "Password must contain at least one special character.",

            password_mismatch: "Passwords must match",
            required: "{{field}} must be filled",
            house_number: "House number must be greater than 1",
          },

          change_password: "Change Password",

          update_info: "Confirm",
          cancel: "Cancel",

          welcome: "Welcome back",
          orders: "Your orders",

          order_id: "Order ID",

          lng_setting: "Choose Your language:",
        },
      },
      ru: {
        translation: {
          intro_title: "<0>Насладись</0> премиальным кофе в нашем уютном кафе",
          intro_description:
            "Coffee House Resource — это популярное место для любителей кофе и тех, кто ищет уютную атмосферу, чтобы насладиться любимым напитком.",
          header_fav_coffee: "Любимый кофе",
          header_about: "О нас",
          header_mob_app: "Мобильное приложение",
          header_contact_us: "Связаться с нами",
          menu: "Меню",
          cart: "Корзина",

          fav_coffee: "Выбери свой <1>любимый</1> кофе",
          about:
            "Resource — это <1>идеальное и уютное место</1>, где можно насладиться разными напитками, отдохнуть, пообщаться с друзьями или поработать.",
          mob_app: "<0>Скачай</0> наше приложение и начни заказывать",
          mob_app_description:
            "Скачай приложение Resource и наслаждайся комфортом заказа любимого кофе из любого места.",

          mob_app_apple: "Доступно в <1>App Store</1>",
          mob_app_google: "Доступно в <1>Google Play</1>",

          footer_title: "Наслаждайся моментом. <1>Время для кофе!</1>",
          contact_title: "Связаться с нами",
          time: "Пн–Сб: 9:00 – 23:00",

          error: "⚠️ Что-то пошло не так. Пожалуйста, обновите страницу.",
          load_error: "Не удалось загрузить товары. Попробуйте ещё раз.",
          order_response:
            "Спасибо за заказ! Наш менеджер свяжется с вами в ближайшее время.",

          menu_title:
            "За каждой нашей чашкой скрывается <1>удивительный сюрприз</1>",

          coffee_cat: "Кофе",
          tea_cat: "Чай",
          dessert_cat: "Десерты",

          sign: "Войти",
          registration: "Регистрация",
          confirm: "Подтвердить заказ",

          placeholder: "Введите",
          city_placeholder: "Выберите город",
          street_placeholder: "Выберите улицу",

          login: "Логин",
          password: "Пароль",
          confirm_password: "Подтвердите пароль",
          city: "Город",
          street: "Улица",
          house: "Номер дома",
          pay_by: "Метод Оплаты",
          cash: "Наличные",
          card: "Карта",
          total: "Итого",
          size: "Размеп",
          additives: "Добавки",
          alert:
            "Цена не окончательная. Скачайте наше мобильное приложение, чтобы узнать окончательную цену и оформить заказ. Зарабатывайте баллы лояльности и наслаждайтесь любимым кофе со скидкой до 20%.",
          add_to_cart: "Добавить в корзину",
          address: "Адрес",
          validation: {
            login_short: "Логин должен содержать не менее 3 символов.",
            login_start_letter: "Логин должен начинаться с буквы.",
            login_only_letters:
              "Логин может содержать только латинские буквы (A–Z, a–z).",

            password_short: "Пароль должен содержать не менее 6 символов.",
            password_special:
              "Пароль должен содержать хотя бы один специальный символ.",

            password_mismatch: "Пароли должны совпадать",
            required: "Поле {{field}} должно быть заполнено",
            house_number: "Номер дома должен быть больше 1",
          },

          change_password: "Поменять пароль",

          update_info: "Подтвердить",
          cancel: "Отмена",

          welcome: "С возвращением",

          orders: "Ваши заказы",
          order_id: "Номер заказа",

          lng_setting: "Выберите свой язык:",
        },
      },

      tr: {
        translation: {
          intro_title:
            "<0>Kendinizi şımartın</0>, büyüleyici kafemizde premium kahvenin tadını çıkarın",
          intro_description:
            "Sıcak atmosferi ve lezzetli kahve seçenekleriyle Coffee House Resource, kahve severler ve favori içeceğinin tadını çıkarmak isteyenler için popüler bir mekandır.",
          header_fav_coffee: "Favori kahve",
          header_about: "Hakkında",
          header_mob_app: "Mobil Uygulama",
          header_contact_us: "İletişim",
          menu: "Menü",
          cart: "Sepet",
          error: "⚠️ Bir sorun oluştu. Lütfen sayfayı yenileyin.",
          load_error: "Ürünler yüklenemedi. Lütfen tekrar deneyin.",
          order_response:
            "Siparişiniz için teşekkür ederiz! Yöneticimiz en kısa sürede sizinle iletişime geçecektir.",

          fav_coffee: "<1>Favori</1> kahveni seç",
          about:
            "Resource, çeşitli sıcak içeceklerin tadını çıkarabileceğiniz, dinlenebileceğiniz, arkadaşlarınızla sohbet edebileceğiniz veya çalışabileceğiniz <1>mükemmel ve samimi bir yerdir</1>.",
          mob_app: "Siparişe başlamak için uygulamamızı <0>indir</0>",
          mob_app_description:
            "Resource uygulamasını bugün indirin ve favori kahvenizi dilediğiniz yerden sipariş etmenin rahatlığını yaşayın.",

          mob_app_apple: "<1>App Store</1>’da mevcut",
          mob_app_google: "<1>Google Play</1>’de mevcut",

          footer_title: "Yudumla, Tadını Çıkar, Gülümse. <1>Kahve zamanı!</1>",
          contact_title: "Bize Ulaşın",
          time: "Pzt–Cmt: 09:00 – 23:00",

          menu_title:
            "Her fincanımızın arkasında <1>harika bir sürpriz</1> gizlidir",

          coffee_cat: "Kahve",
          tea_cat: "Çay",
          dessert_cat: "Tatlı",

          sign: "Giriş Yap",
          registration: "Kayıt Ol",
          confirm: "Siparişi onayla",

          placeholder: "Yazın",
          city_placeholder: "Şehrinizi seçin",
          street_placeholder: "Sokağınızı seçin",

          login: "Kullanıcı Adı",
          password: "Şifre",
          confirm_password: "Şifreyi Onayla",
          city: "Şehir",
          street: "Sokak",
          house: "Ev Numarası",
          pay_by: "Ödeme şekli",
          cash: "Nakit",
          card: "Kart",

          total: "Toplam",
          size: "Boyut",
          additives: "Katkı maddeleri",
          add_to_cart: "Sepete ekle",
          alert:
            "Fiyat kesin değil. Son fiyatı görmek ve siparişinizi vermek için mobil uygulamamızı indirin. Sadakat puanları kazanın ve en sevdiğiniz kahvenin tadını %20'ye varan indirimle çıkarın.",
          address: "Adres",

          validation: {
            login_short:
              "Kullanıcı adı en az 3 karakter uzunluğunda olmalıdır.",
            login_start_letter: "Kullanıcı adı bir harfle başlamalıdır.",
            login_only_letters:
              "Kullanıcı adı yalnızca İngilizce harfler (A–Z, a–z) içerebilir.",

            password_short: "Şifre en az 6 karakter uzunluğunda olmalıdır.",
            password_special: "Şifre en az bir özel karakter içermelidir.",

            password_mismatch: "Şifreler eşleşmelidir.",
            required: "{{field}} alanı doldurulmalıdır.",
            house_number: "Ev numarası 1’den büyük olmalıdır.",
          },

          change_password: "Şifre değiştir",

          update_info: "Gerçekleştirmek",
          cancel: "İptal",
          welcome: "Hoş geldin",
          orders: "Siparişlerin",
          order_id: "Sipariş numarası",

          lng_setting: "Dilinizi seçin:",
        },
      },
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "chLng",
    },
  });
