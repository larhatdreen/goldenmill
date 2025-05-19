import { useEffect, useState } from 'react';
import { LanguagesEnum } from '../components/translation/i18n';

const countryToLanguage: Record<string, LanguagesEnum> = {
  RU: LanguagesEnum.RUSSIAN,
  DE: LanguagesEnum.GERMANY,
  // другие...
};

export const useIPLanguage = () => {
  const [language, setLanguage] = useState<LanguagesEnum>(LanguagesEnum.ENGLISH);

  useEffect(() => {
    const fetchLang = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('IP fetch failed');
        const { country_code } = await res.json();
        setLanguage(countryToLanguage[country_code] || LanguagesEnum.ENGLISH);
      } catch (err) {
        console.log('Do not access for ip:', err)
      }
    };

    fetchLang();
  }, []);

  return { language };
};
