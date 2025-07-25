import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../i18n'; // Import configuration

const MultiLanguageDemo = () => {
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [itemCount, setItemCount] = useState(1);

    // Available languages
    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'hi', label: 'Hindi' },
    ];

    // Change language function
    const changeLanguage = async (languageCode) => {
        try {
            await i18n.changeLanguage(languageCode);
            await AsyncStorage.setItem('language', languageCode);
            // Alert.alert(t('success'), `Language changed to ${languageCode.toUpperCase()}`);
            setCurrentLanguage(languageCode);
        } catch (error) {
            Alert.alert(t('errors.network'));
        }
    };

    // Format date with current locale
    const formatDate = (date) => {
        return new Intl.DateTimeFormat(currentLanguage, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(date);
    };

    // Format currency
    const formatCurrency = (amount) => {
        const currencyMap = { en: 'USD', es: 'EUR', fr: 'EUR' , hi: 'INR' };
        return new Intl.NumberFormat(currentLanguage, {
            style: 'currency',
            currency: currencyMap[currentLanguage] || 'USD'
        }).format(amount);
    };

    useEffect(() => {
        setCurrentLanguage(i18n.language);
    }, [i18n.language]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{t('welcome')}</Text>

            {/* Interpolation Example */}
            <Text style={styles.text}>
                {t('greeting', { name: 'John' })}
            </Text>

            {/* Language Selector */}
            <View style={styles.languageContainer}>
                <Text style={styles.sectionTitle}>Select Language:</Text>
                {languages.map((lang) => (
                    <TouchableOpacity
                        testID={`${lang.code}-button`}
                        key={lang.code}
                        style={[
                            styles.languageButton,
                            currentLanguage === lang.code && styles.activeLanguage
                        ]}
                        onPress={() => changeLanguage(lang.code)}
                    >
                        <Text
                            style={[
                                styles.languageText,
                                currentLanguage === lang.code && styles.activeLanguageText
                            ]}
                        >
                            {lang.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Pluralization Example */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pluralization:</Text>
                <Text style={styles.text}>
                    {t('itemCount', { count: itemCount })}
                </Text>
                <View style={styles.counterButtons}>
                    <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => setItemCount(Math.max(0, itemCount - 1))}
                    >
                        <Text style={styles.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => setItemCount(itemCount + 1)}
                    >
                        <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nested Keys Example */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('login.title')}</Text>
                <Text style={styles.text}>{t('login.email')}</Text>
                <Text style={styles.text}>{t('login.password')}</Text>
            </View>

            {/* Date and Number Formatting */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Formatting Examples:</Text>
                <Text style={styles.text}>Date: {formatDate(new Date())}</Text>
                <Text style={styles.text}>Currency: {formatCurrency(1234.56)}</Text>
                <Text style={styles.text}>
                    Number: {new Intl.NumberFormat(currentLanguage).format(9876543.21)}
                </Text>
            </View>

            {/* Current Language Info */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Current Language: {currentLanguage.toUpperCase()}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginVertical: 8,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    section: {
        marginVertical: 15,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    languageContainer: {
        marginVertical: 20,
    },
    languageButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 5,
        alignItems: 'center',
    },
    activeLanguage: {
        backgroundColor: '#007AFF',
    },
    languageText: {
        fontSize: 16,
        color: '#333',
    },
    activeLanguageText: {
        color: 'white',
        fontWeight: '600',
    },
    counterButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    counterButton: {
        backgroundColor: '#007AFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    counterButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#333',
        borderRadius: 8,
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: 14,
    },
});

export default MultiLanguageDemo;
