import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// DONNÉES ET CONSTANTES GLOBALES
// ============================================================================

const UI_DICT = {
  ar: {
    appTitle: "نعيم الذاكرين",
    home: "الرئيسية",
    quranPlayer: "القرآن الكريم (بث حي)",
    prayerTimes: "مواقيت الصلاة",
    privacyPolicy: "سياسة الخصوصية",
    blogLanguage: "لغة المنصة",
    aboutUs: "من نحن",
    aboutTitle: "من نحن",
    aboutText1: '"نعيم الذاكرين" هي منصة قرآنية إبداعية مصممة لتوفير تجربة استماع وتدبر غامرة.',
    aboutText2: 'نقدم تلاوات لأكثر من 50 قارئاً، مع توفير تراجم بـ 10 لغات، وتفاسير ومعاني ميسرة للآيات. نسأل الله أن يجعل هذا العمل خالصاً لوجهه الكريم وأن ينفع به كل من زاره.',
    country: "البلد",
    city: "الولاية / المدينة",
    commune: "البلدية",
    updateLocation: "تحديث",
    ayahOfDay: "آية اليوم",
    duaOfDay: "دعاء اليوم",
    tafsirTitle: "التفسير:",
    loading: "جاري التحميل...",
    searchSurah: "ابحث عن سورة...",
    translation: "الترجمة",
    privacyTitle: "سياسة الخصوصية",
    privacyText: "نحن في نعيم الذاكرين نحترم خصوصيتك. لا نقوم بجمع أو تخزين أي بيانات شخصية خاصة بك. يتم حفظ إعدادات لغتك ومدينتك محلياً في متصفحك فقط لتحسين تجربتك.",
    quranSearch: "البحث في القرآن",
    searchPlaceholder: "أدخل كلمة للبحث عنها...",
    searchResults: "نتائج البحث",
    noResults: "لا توجد نتائج مطابقة لبحثك.",
    listenAyah: "استماع للآية",
    radio: "الراديو الإسلامي",
    azkar: "الأذكار",
    hadith: "الأحاديث النبوية",
    radioTitle: "بث مباشر لإذاعات القرآن الكريم",
    azkarTitle: "حصن المسلم والأذكار",
    hadithTitle: "الأحاديث النبوية الشريفة"
  },
  fr: {
    appTitle: "Naimaldakirine",
    home: "Accueil",
    quranPlayer: "TV Coranique",
    prayerTimes: "Horaires de Prière",
    privacyPolicy: "Confidentialité",
    blogLanguage: "Langue",
    aboutUs: "À propos",
    aboutTitle: "À propos de nous",
    aboutText1: '"Naeim Al-Thakireen" est une plateforme coranique créative conçue pour offrir une expérience d\'écoute immersive.',
    aboutText2: 'Nous proposons des récitations avec traductions et exégèses. Nous demandons à Allah d\'accepter ce travail.',
    country: "Pays",
    city: "Wilaya / Ville",
    commune: "Commune",
    updateLocation: "Mettre à jour",
    ayahOfDay: "Verset du Jour",
    duaOfDay: "Invocation du Jour",
    tafsirTitle: "Exégèse (Tafsir):",
    loading: "Chargement...",
    searchSurah: "Chercher une sourate...",
    translation: "Traduction",
    privacyTitle: "Politique de confidentialité",
    privacyText: "Nous ne collectons aucune donnée personnelle. Vos préférences sont sauvegardées localement.",
    quranSearch: "Recherche Coranique",
    searchPlaceholder: "Entrez un mot à rechercher...",
    searchResults: "Résultats de recherche",
    noResults: "Aucun résultat trouvé.",
    listenAyah: "Écouter le verset",
    radio: "Radio Islamique",
    azkar: "Invocations (Azkar)",
    hadith: "Hadiths",
    radioTitle: "Radios Coraniques en Direct",
    azkarTitle: "Supplications et Invocations",
    hadithTitle: "Hadiths du Prophète (PSL)"
  },
  en: {
    appTitle: "Naeim Al-Thakireen",
    home: "Home",
    quranPlayer: "Quran TV",
    prayerTimes: "Prayer Times",
    privacyPolicy: "Privacy Policy",
    blogLanguage: "Language",
    aboutUs: "About Us",
    aboutTitle: "About Us",
    aboutText1: '"Naeim Al-Thakireen" is a creative Quranic platform designed to provide an immersive listening experience.',
    aboutText2: 'We offer recitations with translations and Tafsir. We ask Allah to accept this work.',
    country: "Country",
    city: "State / City",
    commune: "Municipality",
    updateLocation: "Update",
    ayahOfDay: "Ayah of the Day",
    duaOfDay: "Dua of the Day",
    tafsirTitle: "Tafsir:",
    loading: "Loading...",
    searchSurah: "Search Surah...",
    translation: "Translation",
    privacyTitle: "Privacy Policy",
    privacyText: "We do not collect any personal data. Your preferences are saved locally.",
    quranSearch: "Quran Search",
    searchPlaceholder: "Enter a word to search...",
    searchResults: "Search Results",
    noResults: "No results found.",
    listenAyah: "Listen to Ayah",
    radio: "Islamic Radio",
    azkar: "Adhkar",
    hadith: "Hadiths",
    radioTitle: "Live Quran Radios",
    azkarTitle: "Supplications & Adhkar",
    hadithTitle: "Prophetic Hadiths"
  }
};

const PRAYER_COUNTRIES = [
  { id: "Algeria", nameAr: "الجزائر", nameFr: "Algérie", nameEn: "Algeria" },
  { id: "Morocco", nameAr: "المغرب", nameFr: "Maroc", nameEn: "Morocco" },
  { id: "Tunisia", nameAr: "تونس", nameFr: "Tunisie", nameEn: "Tunisia" },
  { id: "Egypt", nameAr: "مصر", nameFr: "Égypte", nameEn: "Egypt" },
  { id: "Saudi Arabia", nameAr: "السعودية", nameFr: "Arabie Saoudite", nameEn: "Saudi Arabia" },
  { id: "Palestine", nameAr: "فلسطين", nameFr: "فلسطين", nameEn: "Palestine" },
  { id: "France", nameAr: "فرنسا", nameFr: "France", nameEn: "France" }
];

const PRAYER_CITIES = {
  "Algeria": ["أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "إن صالح", "إن قزام", "تقرت", "جانت", "المغير", "المنيعة"],
  "Morocco": ["Casablanca", "Rabat", "Fes", "Marrakech", "Tangier", "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan"],
  "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabes", "Ariana", "Gafsa"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "Mansoura", "Tanta"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Tabuk", "Buraydah"],
  "Palestine": ["Jerusalem", "Gaza", "Hebron", "Nablus", "Ramallah", "Bethlehem", "Jenin", "Jericho"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"]
};

const PRAYER_COMMUNES = {
  "أدرار": ["أدرار", "فنوغيل", "تمنطيط", "رقان", "أولف", "زاوية كنتة"],
  "الشلف": ["الشلف", "تنس", "بوقادير", "أولاد فارس", "الشطية", "وادي الفضة", "المرسى", "بني حواء"],
  "الأغواط": ["الأغواط", "أفلو", "عين ماضي", "حاسي الرمل", "قصر الحيران"],
  "أم البواقي": ["أم البواقي", "عين البيضاء", "عين مليلة", "عين فكرون", "مسكيانة"],
  "باتنة": ["باتنة", "بريكة", "عين التوتة", "مروانة", "آريس", "نقاوس", "تازولت", "الشمرة"],
  "بجاية": ["بجاية", "أقبو", "أميزور", "القصر", "خراطة", "سوق الإثنين", "صدوق", "تيشي"],
  "بسكرة": ["بسكرة", "سيدي عقبة", "طولقة", "جمورة", "الوطاية"],
  "بشار": ["بشار", "القنادسة", "تاغيت", "لحمر", "موغل"],
  "البليدة": ["البليدة", "أولاد يعيش", "بوفاريك", "موزاية", "العفرون", "الشفة", "بوقرة", "الأربعاء"],
  "البويرة": ["البويرة", "الأخضرية", "سور الغزلان", "عين بسام", "مشد الله"],
  "تمنراست": ["تمنراست", "أباليسا"],
  "تبسة": ["تبسة", "بئر العاتر", "الشريعة", "الونزة", "العوينات", "مرسط"],
  "تلمسان": ["تلمسان", "مغنية", "الغزوات", "سبدو", "أولاد ميمون", "الحناية", "الرمشي", "بني صاف"],
  "تيارت": ["تيارت", "السوقر", "فرندة", "قصر الشلالة", "مهدية", "حمادية"],
  "تيزي وزو": ["تيزي وزو", "عزازقة", "ذراع الميزان", "واضية", "أزفون", "تيكزيرت", "مقلع", "بني دوالة", "بوغني", "إعكوران", "عين الحمام"],
  "الجزائر": ["الجزائر الوسطى", "سيدي امحمد", "باب الوادي", "بئر مراد رايس", "الحراش", "بوزريعة", "الشراقة", "الدار البيضاء", "زرالدة", "الرويبة", "الرغاية", "براقي", "حسين داي"],
  "الجلفة": ["الجلفة", "حاسي بحبح", "عين وسارة", "مسعد", "الإدريسية", "شارف"],
  "جيجل": ["جيجل", "الطاهير", "الميلية", "جيملة", "الشقفة", "العنصر", "سيدي معروف"],
  "سطيف": ["سطيف", "العلمة", "عين أرنات", "عين الكبيرة", "بوقاعة", "بني عزيز", "عين ولمان"],
  "سعيدة": ["سعيدة", "الحساسنة", "عين الحجر", "يوب", "سيدي بوبكر"],
  "سكيكدة": ["سكيكدة", "الحروش", "القل", "عزابة", "تمالوس", "بن عزوز", "سيدي مزغيش"],
  "سيدي بلعباس": ["سيدي بلعباس", "تسالة", "سفيزف", "بن باديس", "تلاغ", "مولاي سليسن"],
  "عنابة": ["عنابة", "البوني", "الحجار", "برحال", "شطايبي", "سرايدي", "عين الباردة"],
  "قالمة": ["قالمة", "وادي الزناتي", "بوشقوف", "هيوب", "حمام النبائل"],
  "قسنطينة": ["قسنطينة", "الخروب", "عين سمارة", "حامة بوزيان", "زيغود يوسف", "ديدوش مراد"],
  "المدية": ["المدية", "البرواقية", "قصر البخاري", "بني سليمان", "تابلاط", "عزيز"],
  "مستغانم": ["مستغانم", "عين تادلس", "بوقيراط", "حاسي ماماش", "سيدي لخضر", "ماسرة"],
  "المسيلة": ["المسيلة", "بوسعادة", "سيدي عيسى", "مقرة", "حمام الضلعة", "أولاد دراج"],
  "معسكر": ["معسكر", "سيق", "المحمدية", "تيغنيف", "غريس", "بوحنيفية"],
  "ورقلة": ["ورقلة", "حاسي مسعود", "عين البيضاء", "الرويسات"],
  "وهران": ["وهران", "بئر الجير", "السانية", "أرزيو", "عين الترك", "بطيوة", "قديل", "مسرغين"],
  "البيض": ["البيض", "بوقطب", "الأبيض سيدي الشيخ", "بريزينة"],
  "إليزي": ["إليزي", "برج الحواس"],
  "برج بوعريريج": ["برج بوعريريج", "رأس الوادي", "المنصورة", "مجانة", "برج غدير"],
  "بومرداس": ["بومرداس", "برج منايل", "دلس", "بودواو", "الثنية", "خميس الخشنة"],
  "الطارف": ["الطارف", "القالة", "الذرعان", "بوثلجة", "البسباس"],
  "تندوف": ["تندوف"],
  "تيسمسيلت": ["تيسمسيلت", "ثنية الحد", "لرجام", "خميستي"],
  "الوادي": ["الوادي", "قمار", "الرقيبة", "البياضة", "رباح"],
  "خنشلة": ["خنشلة", "قايس", "ششار", "أولاد رشاش", "الحامة"],
  "سوق أهراس": ["سوق أهراس", "سدراتة", "مداوروش", "تاورة", "المراهنة"],
  "تيبازة": ["تيبازة", "القليعة", "حجوط", "شرشال", "بوسماعيل", "فوكة"],
  "ميلة": ["ميلة", "شلغوم العيد", "فرجيوة", "تاجنانت", "تلاغمة"],
  "عين الدفلى": ["عين الدفلى", "خميس مليانة", "العطاف", "مليانة", "جليدة"],
  "النعامة": ["النعامة", "مشرية", "عين الصفراء", "عسلة"],
  "عين تموشنت": ["عين تموشنت", "بني صاف", "حمام بوحجر", "المالح", "عين الأربعاء"],
  "غرداية": ["غرداية", "متليلي", "القرارة", "بريان", "المنيعة"],
  "غليزان": ["غليزان", "وادي ارهيو", "مازونة", "عمي موسى", "يلل"],
  "تيميمون": ["تيميمون", "أوقروت", "شروين"],
  "برج باجي مختار": ["برج باجي مختار", "تيمياوين"],
  "أولاد جلال": ["أولاد جلال", "الدوسن", "سيدي خالد"],
  "بني عباس": ["بني عباس", "كرزاز", "الواتة"],
  "إن صالح": ["إن صالح", "إن غار"],
  "إن قزام": ["إن قزام", "تين زواتين"],
  "تقرت": ["تقرت", "تماسين", "الطيبات"],
  "جانت": ["جانت", "برج الحواس"],
  "المغير": ["المغير", "جامعة"],
  "المنيعة": ["المنيعة", "حاسي القارة"]
};

const DAILY_AYAHS_REF = ["2:255", "2:286", "3:8", "3:190", "18:10", "20:114", "21:87", "23:118", "24:35", "26:83", "27:62", "28:24", "39:53", "40:60", "59:22", "65:2", "65:3", "67:1", "71:10", "73:9", "75:1", "78:1", "87:1", "93:5", "94:5", "97:1", "99:7", "100:1", "108:1", "112:1", "113:1"];

const DAILY_DUAS = [
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
  "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ.",
  "رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي.",
  "رَّبِّ زِدْنِي عِلْمًا.",
  "لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ.",
  "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ.",
  "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ.",
  "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ.",
  "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.",
  "اللَّهُمَّ يَامُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ."
];

const RECITERS = [
  { id: "ar.alafasy", name: "مشاري راشد العفاسي", nameFr: "Mishari Alafasy" },
  { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد (مرتل)", nameFr: "AbdulBaset (Murattal)" },
  { id: "ar.abdulsamad", name: "عبد الباسط عبد الصمد (مجود)", nameFr: "AbdulBaset (Mujawwad)" },
  { id: "ar.mahermuaiqly", name: "ماهر المعيقلي", nameFr: "Maher Al-Muaiqly" },
  { id: "ar.sudais", name: "عبد الرحمن السديس", nameFr: "Abderrahman Al-Sudais" },
  { id: "ar.shuraym", name: "سعود الشريم", nameFr: "Saud Al-Shuraim" },
  { id: "ar.minshawi", name: "محمد صديق المنشاوي (مرتل)", nameFr: "Al-Minshawi (Murattal)" },
  { id: "ar.minshawimujawwad", name: "محمد صديق المنشاوي (مجود)", nameFr: "Al-Minshawi (Mujawwad)" },
  { id: "ar.husary", name: "محمود خليل الحصري (مرتل)", nameFr: "Al-Husary (Murattal)" },
  { id: "ar.husarymujawwad", name: "محمود خليل الحصري (مجود)", nameFr: "Al-Husary (Mujawwad)" },
  { id: "ar.ahmedajamy", name: "أحمد بن علي العجمي", nameFr: "Ahmed Al-Ajmi" },
  { id: "ar.shaatree", name: "أبو بكر الشاطري", nameFr: "Abu Bakr Al-Shatri" },
  { id: "ar.hudhaify", name: "علي بن عبد الرحمن الحذيفي", nameFr: "Ali Al-Hudhaify" },
  { id: "ar.muhammadayyoub", name: "محمد أيوب", nameFr: "Muhammad Ayyub" },
  { id: "ar.muhammadjibreel", name: "محمد جبريل", nameFr: "Muhammad Jibreel" },
  { id: "ar.haniarifai", name: "هاني الرفاعي", nameFr: "Hani Ar-Rifai" },
  { id: "ar.abdullahbasfar", name: "عبد الله بصفر", nameFr: "Abdullah Basfar" },
  { id: "ar.aymansuwaid", name: "أيمن سويد", nameFr: "Ayman Suwayd" },
  { id: "ar.ibrahimakhbar", name: "إبراهيم الأخضر", nameFr: "Ibrahim Al-Akhdar" },
  { id: "ar.parhizgar", name: "شهريار برهيزغار", nameFr: "Shahriar Parhizgar" },
  { id: "ar.saad_alghamidi", name: "سعد الغامدي", nameFr: "Saad Al-Ghamdi" },
  { id: "ar.nasseralqatami", name: "ناصر القطامي", nameFr: "Nasser Al-Qatami" },
  { id: "ar.yasserdossari", name: "ياسر الدوسري", nameFr: "Yasser Al-Dosari" },
  { id: "ar.faresabbad", name: "فارس عباد", nameFr: "Fares Abbad" },
  { id: "ar.khalidgalilee", name: "خالد الجليل", nameFr: "Khalid Al-Jalil" },
  { id: "ar.idreesabkr", name: "إدريس أبكر", nameFr: "Idrees Abkar" },
  { id: "ar.muhammadhassan", name: "محمد حسان", nameFr: "Muhammad Hassan" },
  { id: "ar.salahbukhatir", name: "صلاح بو خاطر", nameFr: "Salah Bukhatir" },
  { id: "ar.muhammadluhaidan", name: "محمد اللحيدان", nameFr: "Muhammad Al-Luhaidan" },
  { id: "ar.alzain", name: "الزين محمد أحمد", nameFr: "Alzain M. Ahmad" }
];

const TRANSLATIONS = [
  { id: "fr.hamidullah", name: "Français (Hamidullah)" },
  { id: "en.sahih", name: "English (Sahih)" },
  { id: "es.cortes", name: "Español (Cortes)" },
  { id: "ur.jalandhry", name: "اردو (Jalandhry)" },
  { id: "id.indonesian", name: "Indonesia" },
  { id: "tr.diyanet", name: "Türkçe (Diyanet)" }
];

const SURAH_VIRTUES = {
  1: "أعظم سورة في القرآن، وهي السبع المثاني والقرآن العظيم.",
  2: "أخذها بركة وتركها حسرة ولا تستطيعها البطلة (السحرة).",
  18: "من قرأ سورة الكهف في يوم الجمعة أضاء له من النور ما بين الجمعتين.",
  36: "قلب القرآن، من قرأها يريد وجه الله غفر له.",
  67: "المانعة من عذاب القبر، شفعت لرجل حتى غفر له.",
  112: "تعدل ثلث القرآن."
};

const toArabicNumerals = (num: number | string) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num ? num.toString().replace(/[0-9]/g, w => arabicNumerals[parseInt(w)]) : '';
};

// ============================================================================
// COMPOSANT 1 : TABLEAU DE BORD (ACCUEIL)
// ============================================================================
const DashboardView = ({ uiLang, t }: { uiLang: string, t: any }) => {
  const [prayerCountry, setPrayerCountry] = useState("Algeria");
  const [prayerCity, setPrayerCity] = useState("تيزي وزو");
  const [prayerCommune, setPrayerCommune] = useState("بني زمنزر");
  
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [ayahOfDay, setAyahOfDay] = useState<any>(null);

  const availableCommunes = (PRAYER_COMMUNES as any)[prayerCity] || [];

  useEffect(() => {
    const addressQuery = prayerCommune ? `${prayerCommune}, ${prayerCity}, ${prayerCountry}` : `${prayerCity}, ${prayerCountry}`;
    
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(addressQuery)}&method=3`)
      .then(res => res.json())
      .then(data => { if(data && data.data) setPrayerTimes(data.data.timings); });
  }, [prayerCity, prayerCountry, prayerCommune]);

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    const index = (dayOfMonth - 1) % DAILY_AYAHS_REF.length;
    const ref = DAILY_AYAHS_REF[index];

    fetch(`https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,ar.saadi`)
      .then(res => res.json())
      .then(data => {
        if(data && data.code === 200) {
           setAyahOfDay({
             textAr: data.data[0].text,
             surahName: data.data[0].surah.name,
             ayahNumber: data.data[0].numberInSurah,
             tafsir: data.data[1].text
           });
        }
      });
  }, []);

  const currentDua = DAILY_DUAS[(new Date().getDate() - 1) % DAILY_DUAS.length];

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-8 pb-16 z-20">
      {/* مواقيت الصلاة */}
      <div className="bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(212,175,55,0.1)] text-center">
        <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] mb-8 text-glow">{t.prayerTimes}</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-4xl mx-auto justify-center font-cairo">
          <select 
            value={prayerCountry} 
            onChange={(e) => { 
              const newCountry = e.target.value;
              const newCity = (PRAYER_CITIES as any)[newCountry][0];
              setPrayerCountry(newCountry); 
              setPrayerCity(newCity); 
              const newCommunes = (PRAYER_COMMUNES as any)[newCity] || [];
              setPrayerCommune(newCommunes.length > 0 ? newCommunes[0] : "");
            }} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-3 rounded-xl text-center outline-none focus:border-[#D4AF37]"
            title={t.country}
          >
            {PRAYER_COUNTRIES.map(c => <option key={c.id} value={c.id}>{uiLang === 'ar' ? c.nameAr : uiLang === 'fr' ? c.nameFr : c.nameEn}</option>)}
          </select>

          <select 
            value={prayerCity} 
            onChange={(e) => { 
              const newCity = e.target.value;
              setPrayerCity(newCity); 
              const newCommunes = (PRAYER_COMMUNES as any)[newCity] || [];
              setPrayerCommune(newCommunes.length > 0 ? newCommunes[0] : "");
            }} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-3 rounded-xl text-center outline-none focus:border-[#D4AF37]"
            title={t.city}
          >
            {(PRAYER_CITIES as any)[prayerCountry].map((city: string) => <option key={city} value={city}>{city}</option>)}
          </select>

          <select 
            value={prayerCommune} 
            onChange={(e) => setPrayerCommune(e.target.value)} 
            className="flex-1 bg-[#022c22] border border-[#D4AF37]/40 text-white px-4 py-3 rounded-xl text-center outline-none focus:border-[#D4AF37] font-cairo"
            title={t.commune}
          >
            {availableCommunes.length > 0 ? (
              availableCommunes.map((commune: string) => <option key={commune} value={commune}>{commune}</option>)
            ) : (
              <option value={prayerCity}>{prayerCity}</option>
            )}
          </select>
        </div>

        {prayerTimes ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 font-cairo mt-4">
            {Object.entries({Fajr:"الفجر", Sunrise:"الشروق", Dhuhr:"الظهر", Asr:"العصر", Maghrib:"المغرب", Isha:"العشاء"}).map(([key, name]) => (
              <div key={key} className="bg-black/60 border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center hover:border-[#D4AF37] hover:-translate-y-1 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                <span className="text-emerald-200 text-lg md:text-xl mb-2">{name}</span>
                <span className="text-white text-2xl md:text-3xl font-bold font-sans" dir="ltr">{prayerTimes[key]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#D4AF37] font-cairo flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            {t.loading}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] text-glow mb-6 border-b border-[#D4AF37]/20 pb-4 flex items-center gap-3">
             <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"></path></svg>
             {t.ayahOfDay}
          </h2>
          {ayahOfDay ? (
            <div className="flex-1 flex flex-col justify-center">
              <p className="font-amiri text-2xl md:text-4xl text-white leading-[2] mb-6 text-center" dir="rtl">
                {ayahOfDay.textAr} <span className="text-[#D4AF37] mx-2">﴿{toArabicNumerals(ayahOfDay.ayahNumber)}﴾</span>
              </p>
              <div className="mt-auto bg-[#011a14]/60 border border-[#D4AF37]/20 p-4 md:p-6 rounded-2xl">
                <span className="text-[#D4AF37] font-cairo font-bold mb-2 block">{t.tafsirTitle} (سورة {ayahOfDay.surahName})</span>
                <p className="font-cairo text-emerald-50 leading-relaxed text-sm md:text-base text-justify" dir="rtl">{ayahOfDay.tafsir}</p>
              </div>
            </div>
          ) : <div className="text-emerald-200 font-cairo text-center m-auto">{t.loading}</div>}
        </div>

        <div className="bg-[#022c22]/50 backdrop-blur-md border border-[#D4AF37]/30 rounded-3xl p-6 md:p-10 flex flex-col relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-amiri text-[#D4AF37] text-glow mb-6 border-b border-[#D4AF37]/20 pb-4 relative z-10 flex items-center gap-3">
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            {t.duaOfDay}
          </h2>
          <div className="flex-1 flex items-center justify-center relative z-10">
             <p className="font-amiri text-2xl md:text-4xl text-white leading-loose text-center" dir="rtl">« {currentDua} »</p>
          </div>
          <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-[#D4AF37] opacity-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT 2 : QURAN TV (DIFFUSION ET RECHERCHE INTÉGRÉE)
// ============================================================================
const QuranTVView = ({ uiLang, t }: { uiLang: string, t: any }) => {
  const [surahsList, setSurahsList] = useState<any[]>([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  
  const getDefaultTranslation = (lang: string) => {
    if (lang === 'fr') return 'fr.hamidullah';
    if (lang === 'en') return 'en.sahih';
    return 'en.sahih';
  };
  const [selectedTranslation, setSelectedTranslation] = useState(getDefaultTranslation(uiLang));
  
  const [playlistMode, setPlaylistMode] = useState<'surah' | 'search'>('surah'); 
  const [searchMatches, setSearchMatches] = useState<any[]>([]);
  
  const [ayahs, setAyahs] = useState<any[]>([]); 
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [activeVerse, setActiveVerse] = useState<any>(null); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatingVerse, setIsRepeatingVerse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [currentSurahInfo, setCurrentSurahInfo] = useState({ nameAr: "", nameEn: "" });
  
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const [searchError, setSearchError] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSurahRef = useRef(selectedSurah);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah').then(res => res.json()).then(data => setSurahsList(data.data));
  }, []);

  useEffect(() => {
    setSelectedTranslation(getDefaultTranslation(uiLang));
  }, [uiLang]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedReciter}`).then(res => res.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/${selectedTranslation}`).then(res => res.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/ar.saadi`).then(res => res.json())
    ]).then(([arData, translationData, tafsirData]) => {
       if(arData.code === 200) {
         setAyahs(arData.data.ayahs.map((ayah: any, idx: number) => ({
           id: ayah.number, 
           numberInSurah: ayah.numberInSurah, 
           textAr: ayah.text, 
           audioUrl: ayah.audio || undefined,
           translatedText: translationData.data.ayahs[idx].text, 
           tafsir: tafsirData.data.ayahs[idx].text,
           surahNameAr: arData.data.name,
           surahNameEn: arData.data.englishName
         })));
         
         if (playlistMode === 'surah') {
           setCurrentSurahInfo({ nameAr: arData.data.name, nameEn: arData.data.englishName });
           if (prevSurahRef.current !== selectedSurah) {
             setCurrentAyahIndex(0);
             prevSurahRef.current = selectedSurah;
           }
         }
       }
    }).finally(() => setIsLoading(false));
  }, [selectedSurah, selectedReciter, selectedTranslation]);

  useEffect(() => {
    if (playlistMode === 'surah' && ayahs.length > 0) {
      const verse = ayahs[currentAyahIndex];
      if (verse) {
        setActiveVerse(verse);
        setCurrentSurahInfo({ nameAr: verse.surahNameAr, nameEn: verse.surahNameEn });
      }
    } else if (playlistMode === 'search' && searchMatches.length > 0) {
      const match = searchMatches[currentAyahIndex];
      if (!match) return;
      
      setIsLoadingVerse(true);
      Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/${selectedReciter}`).then(res=>res.json()),
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/${selectedTranslation}`).then(res=>res.json()),
        fetch(`https://api.alquran.cloud/v1/ayah/${match.number}/ar.saadi`).then(res=>res.json())
      ]).then(([arData, transData, tafsirData]) => {
        if (arData.code === 200) {
          setActiveVerse({
            id: match.number,
            numberInSurah: match.numberInSurah,
            textAr: arData.data.text,
            audioUrl: arData.data.audio || undefined,
            translatedText: transData?.data?.text || "",
            tafsir: tafsirData?.data?.text || "",
            surahNameAr: match.surah.name,
            surahNameEn: match.surah.englishName
          });
          setCurrentSurahInfo({
            nameAr: match.surah.name,
            nameEn: match.surah.englishName
          });
        }
      }).finally(() => setIsLoadingVerse(false));
    }
  }, [currentAyahIndex, playlistMode, ayahs, searchMatches, selectedReciter, selectedTranslation]);

  useEffect(() => {
    if (isPlaying && audioRef.current && activeVerse) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) playPromise.catch(e => console.log("Audio play prevented:", e));
    }
  }, [activeVerse, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current && activeVerse) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
      else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false)); }
    }
  };

  const handleAyahEnded = () => {
    if (isRepeatingVerse && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio replay prevented:", e));
      return;
    }
    const maxIndex = playlistMode === 'surah' ? ayahs.length - 1 : searchMatches.length - 1;
    if (currentAyahIndex < maxIndex) {
      setCurrentAyahIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentAyahIndex(0); 
    }
  };

  const maxIndex = playlistMode === 'surah' ? Math.max(0, ayahs.length - 1) : Math.max(0, searchMatches.length - 1);
  const progressPercentage = maxIndex > 0 ? (currentAyahIndex / maxIndex) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maxIndex === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const isRtl = uiLang === 'ar';
    const effectivePos = isRtl ? 1 - pos : pos;
    setCurrentAyahIndex(Math.min(Math.floor(effectivePos * (maxIndex + 1)), maxIndex));
  };

  const restartRecitation = () => {
    setCurrentAyahIndex(0);
    if (!isPlaying) setIsPlaying(true);
    else if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio restart prevented:", e));
    }
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearchQuery.trim()) return;
    setIsSearchingGlobal(true);
    setSearchError("");

    fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(globalSearchQuery)}/all/ar`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.matches.length > 0) {
          setSearchMatches(data.data.matches);
          setPlaylistMode('search');
          setCurrentAyahIndex(0);
          setIsPlaying(true);
        } else {
          setSearchError(t.noResults);
          setTimeout(() => setSearchError(""), 3000);
        }
      })
      .catch(() => {
        setSearchError(t.noResults);
        setTimeout(() => setSearchError(""), 3000);
      })
      .finally(() => setIsSearchingGlobal(false));
  };

  const displaySurahName = playlistMode === 'search' 
    ? (activeVerse ? activeVerse.surahNameAr.replace('سُورَةُ ', '') : '') 
    : (currentSurahInfo.nameAr ? currentSurahInfo.nameAr.replace('سُورَةُ ', '') : '');

  const currentReciter = RECITERS.find(r => r.id === selectedReciter);

  return (
    <div className="w-full flex-1 flex flex-col relative z-20">
      <div className="flex flex-wrap gap-4 font-cairo justify-center mb-6 items-center w-full max-w-5xl mx-auto relative">
        {searchError && (
          <div className="absolute -top-12 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm z-50 shadow-lg animate-pulse">
            {searchError}
          </div>
        )}

        <form onSubmit={handleGlobalSearch} className="flex items-center gap-2 bg-black/80 border border-[#D4AF37]/50 rounded-xl px-4 py-3 hover:border-[#D4AF37] transition-colors relative">
          <button type="submit" disabled={isSearchingGlobal} className="text-[#D4AF37] hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center active:scale-90 transition-transform">
            {isSearchingGlobal ? (
              <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            )}
          </button>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={globalSearchQuery} 
            onChange={(e) => setGlobalSearchQuery(e.target.value)} 
            className="bg-transparent text-white outline-none w-48 md:w-64 text-sm placeholder-gray-400" 
            dir={uiLang === 'ar' ? 'rtl' : 'ltr'} 
          />
        </form>

        <select 
          value={playlistMode === 'surah' ? selectedSurah : ""} 
          onChange={(e) => {
            setSelectedSurah(Number(e.target.value)); 
            setPlaylistMode('surah');
            setIsPlaying(true);
          }} 
          className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black"
        >
          {playlistMode === 'search' ? <option value="" disabled className="bg-[#022c22]">{t.searchResults}...</option> : null}
          {surahsList.map(s => <option key={s.number} value={s.number} className="bg-[#022c22]">{s.number}. {s.name}</option>)}
        </select>

        <select value={selectedReciter} onChange={(e) => setSelectedReciter(e.target.value)} className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black">
          {RECITERS.map(r => <option key={r.id} value={r.id} className="bg-[#022c22]">{r.name}</option>)}
        </select>

        <select value={selectedTranslation} onChange={(e) => setSelectedTranslation(e.target.value)} className="bg-black/80 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-xl outline-none min-w-[160px] text-center text-sm hover:border-[#D4AF37] transition-colors cursor-pointer active:bg-black">
          {TRANSLATIONS.map(tr => <option key={tr.id} value={tr.id} className="bg-[#022c22]">{t.translation}: {tr.name}</option>)}
        </select>
      </div>

      <div className={`relative w-full transition-all duration-1000 ease-in-out ${isPlaying ? 'max-w-full' : 'max-w-[1280px]'} mx-auto aspect-[9/16] md:aspect-video overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-[#D4AF37]/30`}
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1565552643952-b5b63023e387?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <audio ref={audioRef} src={activeVerse ? activeVerse.audioUrl : undefined} onEnded={handleAyahEnded} />

        <div className="absolute inset-0 bg-black/70 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-islamic-pattern mix-blend-screen opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-3/4 h-3/4 bg-emerald-500/20 blur-[100px] rounded-full"></div></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`, animationDelay: `${Math.random() * 15}s`, animationDuration: `${10 + Math.random() * 20}s` }}></div>
          ))}
        </div>

        <div className={`absolute right-0 md:right-4 top-0 bottom-12 flex flex-col items-center justify-end transition-all duration-1000 ease-in-out ${isPlaying ? 'translate-x-1/3 opacity-70' : 'translate-x-0 opacity-100'} pointer-events-none z-10 w-28 md:w-56`}>
          <div className="flex-1 flex flex-col items-center justify-center pt-10 text-center px-3">
            <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-[#D4AF37]/60 rounded-lg p-3 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] relative before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-4 before:bg-[#D4AF37]/40">
              <span className="font-amiri text-[#D4AF37] text-sm md:text-xl text-glow block mb-1 opacity-80">
                سورة
              </span>
              <span className="font-amiri text-white text-xl md:text-4xl font-bold text-glow leading-tight block">
                {displaySurahName}
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-2" />
              <span className="font-cairo text-emerald-100/80 text-[10px] md:text-xs tracking-widest uppercase block">
                {currentSurahInfo.nameEn}
              </span>
            </div>
          </div>
          <svg viewBox="0 0 100 800" className="h-48 md:h-64 w-full fill-[#D4AF37] opacity-40 mt-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
            <path d="M50,0 C80,100 20,200 50,400 C80,600 20,700 50,800 L0,800 L0,0 Z" />
            <path d="M25,350 L50,400 L25,450 Z" opacity="0.5"/>
          </svg>
        </div>

        <div className={`absolute left-0 md:left-4 top-0 bottom-12 flex flex-col items-center justify-end transition-all duration-1000 ease-in-out ${isPlaying ? '-translate-x-1/3 opacity-70' : 'translate-x-0 opacity-100'} pointer-events-none z-10 w-28 md:w-56`}>
          <div className="flex-1 flex flex-col items-center justify-center pt-10 text-center px-3">
            <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-[#D4AF37]/60 rounded-lg p-3 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.2)] relative before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-4 before:bg-[#D4AF37]/40">
              <span className="font-amiri text-[#D4AF37] text-sm md:text-xl text-glow block mb-1 opacity-80">
                القارئ
              </span>
              <span className="font-amiri text-white text-xl md:text-3xl font-bold text-glow leading-tight block">
                {currentReciter?.name.split(' (')[0]}
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-2" />
              <span className="font-cairo text-emerald-100/80 text-[10px] md:text-xs tracking-widest uppercase block" dir="ltr">
                {currentReciter?.nameFr}
              </span>
            </div>
          </div>
          <svg viewBox="0 0 100 800" className="h-48 md:h-64 w-full fill-[#D4AF37] opacity-40 mt-4 rotate-180 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
            <path d="M50,0 C80,100 20,200 50,400 C80,600 20,700 50,800 L0,800 L0,0 Z" />
            <path d="M25,350 L50,400 L25,450 Z" opacity="0.5"/>
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between z-10 p-4 md:p-8 pb-16 pointer-events-none">
          <header className="flex flex-col relative z-20 pointer-events-auto items-center">
            {playlistMode === 'search' && (
               <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-1 rounded-full border border-[#D4AF37]/30 text-sm font-cairo mb-2">
                 {t.searchResults}: "{globalSearchQuery}" ({currentAyahIndex + 1}/{searchMatches.length})
               </span>
            )}
          </header>

          <main className="flex-1 flex flex-col items-center justify-center text-center px-20 lg:px-32 overflow-hidden">
            {(isLoading && playlistMode === 'surah') || isLoadingVerse ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : activeVerse && (
              <div key={activeVerse.id} className="animate-verse w-full flex flex-col items-center pointer-events-none">
                <h1 className={`font-amiri text-white text-glow w-full leading-[1.8] transition-all duration-1000 ${isPlaying ? 'text-4xl md:text-6xl lg:text-8xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>{activeVerse.textAr}</h1>
                <p className={`text-emerald-50 font-light max-w-4xl opacity-90 mt-6 transition-all duration-1000 ${isPlaying ? 'text-lg md:text-2xl' : 'text-sm md:text-xl'}`} dir="auto">{activeVerse.translatedText}</p>
              </div>
            )}
          </main>

          <footer className="w-full pointer-events-auto mt-auto mb-2 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <button 
                onClick={restartRecitation}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-cairo transition-all active:scale-95"
                title="إعادة التلاوة من البداية"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                إعادة التلاوة
              </button>

              <button 
                onClick={() => setIsRepeatingVerse(!isRepeatingVerse)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-cairo transition-all active:scale-95 ${isRepeatingVerse ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black/40 text-[#D4AF37] border-[#D4AF37]/30 hover:bg-black/60'}`}
                title="تكرار الآية الحالية"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                {isRepeatingVerse ? "إلغاء التكرار" : "إعادة الآية"}
              </button>
            </div>

            <div className="relative w-full h-2 bg-black/60 border border-white/20 rounded-full cursor-pointer overflow-hidden" onClick={handleProgressClick}>
              <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-[#D4AF37] to-yellow-200 transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </footer>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-black/80 backdrop-blur-lg border-t border-[#D4AF37]/40 flex z-20 pointer-events-none">
          <div className="bg-[#D4AF37] text-black px-4 md:px-8 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] z-30 h-full relative border-l-2 border-yellow-200/50">
            <span className="font-amiri font-bold md:text-xl whitespace-nowrap">نعيم الذاكرين</span>
          </div>
          <div className="flex-1 overflow-hidden relative flex items-center h-full">
            <div className="flex whitespace-nowrap animate-ticker font-amiri text-[#D4AF37] text-sm md:text-xl items-center h-full">
              <span className="mx-6 md:mx-12">✨ قناة نعيم الذاكرين - تلاوات خاشعة تريح القلب ✨</span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12 text-emerald-200">
                {playlistMode === 'search' 
                  ? `جاري عرض نتائج البحث عن الكلمة (${currentAyahIndex + 1}/${searchMatches.length})`
                  : `فضل السورة: ${SURAH_VIRTUES[selectedSurah as keyof typeof SURAH_VIRTUES] || "من قرأ حرفاً من كتاب الله فله به حسنة."}`
                }
              </span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12 text-white">
                تفسير السعدي (الآية {activeVerse?.numberInSurah}): {activeVerse?.tafsir || "..."}
              </span>
              <span className="mx-6 md:mx-12 text-white">•</span>
              <span className="mx-6 md:mx-12">اللهم صل وسلم على نبينا محمد</span>
            </div>
          </div>
        </div>

        {!isPlaying && !isLoading && !isLoadingVerse && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
            <button onClick={togglePlay} className="flex items-center gap-3 font-cairo bg-[#D4AF37] hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              {currentAyahIndex === 0 ? "بدء التلاوة" : "إكمال التلاوة"}
            </button>
          </div>
        )}
        
        {isPlaying && (
          <div className="absolute inset-0 z-0 cursor-pointer pointer-events-auto" onClick={togglePlay} />
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT 3 : RADIO ISLAMIQUE
// ============================================================================
const RadioView = ({ t }: { t: any }) => {
  const [radios, setRadios] = useState<any[]>([]);
  const [currentRadio, setCurrentRadio] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('https://data-rosy.vercel.app/radio.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.radios) {
          setRadios(data.radios);
          setCurrentRadio(data.radios[0]);
        }
      });
  }, []);

  const togglePlay = (radio: any) => {
    if (currentRadio?.url === radio.url && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentRadio(radio);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = radio.url;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] text-center mb-12 text-glow">
        {t.radioTitle}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {radios.map((radio, idx) => (
          <div key={idx} className={`bg-[#011a14]/80 border ${currentRadio?.url === radio.url ? 'border-[#D4AF37]' : 'border-[#D4AF37]/20'} rounded-2xl p-6 flex items-center justify-between hover:border-[#D4AF37] transition-all group shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              </div>
              <div>
                <h3 className="text-white font-cairo font-bold">{radio.name}</h3>
                <p className="text-emerald-200/60 text-xs font-cairo">بث مباشر</p>
              </div>
            </div>
            <button 
              onClick={() => togglePlay(radio)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentRadio?.url === radio.url && isPlaying ? 'bg-red-500 text-white' : 'bg-[#D4AF37] text-black hover:scale-110'}`}
            >
              {currentRadio?.url === radio.url && isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          </div>
        ))}
      </div>
      <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
    </div>
  );
};

// ============================================================================
// COMPOSANT 4 : AZKAR (INVOCATIONS)
// ============================================================================
const AzkarView = ({ t }: { t: any }) => {
  const [azkar, setAzkar] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json')
      .then(res => res.json())
      .then(data => {
        // Group by category
        const categories = Object.keys(data);
        const formatted = categories.map(cat => ({
          category: cat,
          items: data[cat]
        }));
        setAzkar(formatted);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center text-[#D4AF37] font-cairo">{t.loading}</div>;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] text-center mb-12 text-glow">
        {t.azkarTitle}
      </h2>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {azkar.map((group, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedCategory(group.category)}
              className="bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-2xl p-6 text-right hover:border-[#D4AF37] transition-all group shadow-lg flex items-center justify-between"
            >
              <svg className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              <span className="text-white font-cairo font-bold text-lg">{group.category}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="self-start flex items-center gap-2 text-[#D4AF37] hover:text-white font-cairo mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            العودة للقائمة
          </button>
          <h3 className="text-2xl font-amiri text-white mb-4 text-right border-r-4 border-[#D4AF37] pr-4">{selectedCategory}</h3>
          {azkar.find(g => g.category === selectedCategory)?.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-2xl p-8 shadow-lg">
              <p className="text-white font-amiri text-2xl leading-loose text-right mb-6" dir="rtl">{item.zekr}</p>
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-[#D4AF37]/10">
                <div className="flex items-center gap-4">
                   <span className="bg-[#D4AF37] text-black px-4 py-1 rounded-full font-bold text-sm">التكرار: {item.count || 1}</span>
                </div>
                <p className="text-emerald-200/60 font-cairo text-sm text-right italic" dir="rtl">{item.description || item.reference}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPOSANT 5 : HADITH (LES PAROLES DU PROPHÈTE)
// ============================================================================
const HadithView = ({ t }: { t: any }) => {
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://hadis-api-id.vercel.app/hadith/abu-dawud?page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          setHadiths(data.items);
        }
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl md:text-4xl font-amiri text-[#D4AF37] text-center mb-12 text-glow">
        {t.hadithTitle}
      </h2>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[#D4AF37] font-cairo">{t.loading}</div>
      ) : (
        <div className="flex flex-col gap-8">
          {hadiths.map((h, idx) => (
            <div key={idx} className="bg-[#011a14]/80 border border-[#D4AF37]/20 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold text-xl mr-4 mt-4">#{h.number}</span>
              </div>
              <p className="text-white font-amiri text-2xl md:text-3xl leading-relaxed text-right mb-8" dir="rtl">
                {h.arab}
              </p>
              <div className="bg-black/40 rounded-2xl p-6 border-l-4 border-[#D4AF37]">
                <p className="text-emerald-100/80 font-cairo text-sm md:text-base leading-relaxed italic">
                  {h.id}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-bold disabled:opacity-30 hover:scale-105 transition-transform"
            >
              السابق
            </button>
            <span className="text-[#D4AF37] font-bold text-xl">الصفحة {page}</span>
            <button 
              onClick={() => setPage(p => p + 1)}
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL (LAYOUT GLOBAL)
// ============================================================================
export default function App() {
  const [uiLang, setUiLang] = useState('ar');
  const [currentView, setCurrentView] = useState('home'); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const t = (UI_DICT as any)[uiLang];
  const dir = uiLang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-nu-latn', {day: 'numeric', month: 'long', year : 'numeric'}).format(currentTime);
  const gregorianDate = new Intl.DateTimeFormat('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(currentTime);
  const timeString = currentTime.toLocaleTimeString('ar-EG-u-nu-latn', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white overflow-x-hidden" dir={dir}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;700&display=swap');
        .font-amiri { font-family: 'Amiri', serif; }
        .font-cairo { font-family: 'Cairo', sans-serif; }
        @keyframes float { 0% { transform: translateY(0px) scale(1); opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { transform: translateY(-100px) scale(1.5); opacity: 0; } }
        @keyframes tickerAnim { 0% { transform: translateX(-100%); } 100% { transform: translateX(100vw); } }
        .animate-ticker { display: inline-flex; animation: tickerAnim 60s linear infinite; will-change: transform; }
        .particle { position: absolute; background: radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%); border-radius: 50%; animation: float 15s infinite linear; }
        @keyframes slideInRight { from { transform: translateX(-30px); opacity: 0; filter: blur(4px); } to { transform: translateX(0); opacity: 1; filter: blur(0); } }
        .animate-verse { animation: slideInRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .bg-islamic-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15L15 15 30 0zm0 30l15 15-15 15-15-15 15-15zM0 30l15-15 15 15-15 15L0 30zm60 0L45 15l-15 15 15 15 15-15z' fill='%23D4AF37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E"); }
        .text-glow { text-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 4px 10px rgba(0,0,0,0.8); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); } .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
      `}} />

      <div className="w-full bg-[#011a14]/95 px-4 md:px-8 py-2 flex justify-between items-center z-[60] relative shadow-md border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4 font-cairo text-xs md:text-sm text-emerald-100">
          <span dir="rtl">{gregorianDate}</span> <span className="text-[#D4AF37]/50">|</span> <span dir="rtl">{hijriDate}</span>
        </div>
        <div className="flex items-center gap-4">
          <select value={uiLang} onChange={(e) => setUiLang(e.target.value)} className="bg-transparent text-emerald-100 font-cairo outline-none cursor-pointer hover:text-[#D4AF37] transition-colors appearance-none">
            <option value="ar" className="bg-[#022c22]">العربية</option>
            <option value="fr" className="bg-[#022c22]">Français</option>
            <option value="en" className="bg-[#022c22]">English</option>
          </select>
          <div className="font-cairo text-lg font-bold text-[#D4AF37] tracking-widest" dir="ltr">{timeString}</div>
        </div>
      </div>

      <nav className="w-full bg-[#022c22]/90 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-[60] relative shadow-lg">
        <button className="flex items-center gap-3 cursor-pointer outline-none active:scale-95 transition-transform" onClick={() => setCurrentView('home')}>
          <img src="https://yt3.ggpht.com/QrZ62zK_7WCq3eS4m0cXx3P18RljKqHs2Epjr6A5VsTokL6SrWlWD3mhrh7oIkOV6XFoTEuXaw=s88-c-k-c0x00ffffff-no-rj" alt="Logo" className="w-10 h-10 rounded-full border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
          <span className="text-[#D4AF37] font-amiri font-bold text-xl text-glow">{t.appTitle}</span>
        </button>

        <div className="flex flex-wrap justify-center gap-6 font-cairo">
          <button onClick={() => setCurrentView('home')} className={`text-base font-bold py-2 transition-all active:scale-95 ${currentView === 'home' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.home}</button>
          <button onClick={() => setCurrentView('tv')} className={`text-base font-bold py-2 transition-all active:scale-95 ${currentView === 'tv' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.quranPlayer}</button>
          <button onClick={() => setCurrentView('radio')} className={`text-base font-bold py-2 transition-all active:scale-95 ${currentView === 'radio' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.radio}</button>
          <button onClick={() => setCurrentView('azkar')} className={`text-base font-bold py-2 transition-all active:scale-95 ${currentView === 'azkar' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.azkar}</button>
          <button onClick={() => setCurrentView('hadith')} className={`text-base font-bold py-2 transition-all active:scale-95 ${currentView === 'hadith' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-emerald-100 hover:text-[#D4AF37]'}`}>{t.hadith}</button>
          <button onClick={() => setShowPrivacyModal(true)} className="text-emerald-100 hover:text-[#D4AF37] text-base py-2 transition-all active:scale-95">{t.privacyPolicy}</button>
          <button onClick={() => setShowAboutModal(true)} className="text-emerald-100 hover:text-[#D4AF37] text-base py-2 transition-all active:scale-95">{t.aboutUs}</button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative w-full z-10 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="fixed inset-0 bg-islamic-pattern mix-blend-screen opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none"><div className="w-[80vw] h-[80vh] bg-emerald-700/10 blur-[150px] rounded-full"></div></div>
        
        {currentView === 'home' && <DashboardView uiLang={uiLang} t={t} />}
        {currentView === 'tv' && <QuranTVView uiLang={uiLang} t={t} />}
        {currentView === 'radio' && <RadioView t={t} />}
        {currentView === 'azkar' && <AzkarView t={t} />}
        {currentView === 'hadith' && <HadithView t={t} />}
      </main>

      {(showAboutModal || showPrivacyModal) && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl p-6 flex items-center justify-center pointer-events-auto">
          <div className="bg-[#022c22] border border-[#D4AF37]/30 p-8 md:p-12 rounded-3xl max-w-2xl text-center relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
             <button onClick={() => {setShowAboutModal(false); setShowPrivacyModal(false);}} className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} text-gray-400 hover:text-white`}>✖</button>
             <h2 className="text-3xl font-amiri text-[#D4AF37] mb-6">{showAboutModal ? t.aboutTitle : t.privacyTitle}</h2>
             <div className="font-cairo text-emerald-100 text-lg leading-relaxed">{showAboutModal ? <><span className="text-[#D4AF37]">{t.aboutText1}</span><br/><br/>{t.aboutText2}</> : t.privacyText}</div>
          </div>
        </div>
      )}
    </div>
  );
}
