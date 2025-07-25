import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'react-native-localize';

// Translation files
import en from './locales/en.json';
import es from './locales/es.json';
import hi from './locales/hi.json';

const resources = {
    en: { translation: en },
    es: { translation: es },
    hi: { translation: hi },
};

// Get device language or fallback to saved preference
const getInitialLanguage = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem('language');
        return savedLanguage || getLocales()[0].languageCode || 'en';
    } catch (error) {
        return 'en';
    }
};

const initI18n = async () => {
    const initialLanguage = await getInitialLanguage();

    i18n
        .use(initReactI18next)
        .init({
            compatibilityJSON: 'v3',
            resources,
            lng: initialLanguage,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            // Enable formatting functions
            format: function (value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                if (format === 'lowercase') return value.toLowerCase();
                if (value instanceof Date) {
                    return new Intl.DateTimeFormat(lng).format(value);
                }
                return value;
            }
        });
};

initI18n();
export default i18n;
