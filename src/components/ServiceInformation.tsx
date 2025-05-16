import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

function ServiceInformation() {
  const seoData = useSEO('serviceInformation');
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const theme = useTheme();
  const isDark = theme.name === 'dark';


  const containerStyle = `w-full min-h-screen py-[100px] px-[30px] md:px-[100px] font-adventpro border ${
    isDark
      ? 'bg-gradient-to-r from-[#1A1B1C] via-[#28292a] to-[#1A1B1C] border-[#2C2D2F]'
      : 'bg-gradient-to-b from-[#F8F8F9] via-[#F2F2F2] to-[#ECECEC] border-[#82653F]'
  }`;
  const titleStyle = 'text-[32px] md:text-[40px] font-medium mb-8 animate-fadeIn text-[#82653F]';
  const sectionTitleStyle = `text-[24px] font-medium mt-8 mb-4 text-[#82653F]`;
  const listStyle = `list-none space-y-2 ${
    isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
  }`;
  const listItemStyle = 'hover:text-[#82653E] transition-colors duration-300';
  const sectionStyle = `p-6 rounded-lg border ${
    isDark
    ? 'bg-gradient-to-r from-[#1A1B1C] via-[#28292a] to-[#1A1B1C] border-[#2C2D2F]'
    : 'bg-gradient-to-r from-[#F8F8F9] via-[#F2F2F2] to-[#F8F8F9] border-[#82653F]'
  }`;

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      {currentLanguage === 'ru' && (
        <div className={containerStyle}>
          <div className='max-w-4xl mx-auto'>
            <h1 className={titleStyle}>
              Служебная информация в соответствии с § 5 Закона о телемедиа (TMG)
            </h1>
            
            <div className="space-y-8">
              <div className={sectionStyle}>
                <ul className={listStyle}>
                  <li className={listItemStyle}>LKT Group GmbH</li>
                  <li className={listItemStyle}>Lindenstraße 48-52</li>
                  <li className={listItemStyle}>40233 Düsseldorf</li>
                  <li className={listItemStyle}>Германия</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Уполномоченные представители</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Max Zhivilov (Генеральный директор)</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Контакт</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Телефон: +49(0)2119891272</li>
                  <li className={listItemStyle}>Электронная почта: info@goldenmill.de</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Торговый реестр</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Номер торгового реестра: HRB 103872</li>
                  <li className={listItemStyle}>Регистрационный суд: Amtsgericht Düsseldorf</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>
                  Идентификационный номер налога на добавленную стоимость (VAT ID)
                </h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>DE369065377</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'en' && (
        <div className={containerStyle}>
          <div className='max-w-4xl mx-auto'>
            <h1 className={titleStyle}>Legal Information According to § 5 TMG</h1>

            <div className='space-y-8'>
              <div className={sectionStyle}>
                <ul className={listStyle}>
                  <li className={listItemStyle}>LKT Group GmbH</li>
                  <li className={listItemStyle}>Lindenstraße 48-52</li>
                  <li className={listItemStyle}>40233 Düsseldorf</li>
                  <li className={listItemStyle}>Germany</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Authorized Representatives</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Max Zhivilov (Managing Director)</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Contact</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Phone: +49 (0) 2119891272</li>
                  <li className={listItemStyle}>Email: info@goldenmill.de</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Commercial Register</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Commercial Register Number: HRB 103872</li>
                  <li className={listItemStyle}>Registration Court: Amtsgericht Düsseldorf</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>
                  Value Added Tax Identification Number (VAT ID)
                </h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>DE369065377</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'de' && (
        <div className={containerStyle}>
          <div className='max-w-4xl mx-auto'>
            <h1 className={titleStyle}>Impressum gemäß § 5 des Telemediengesetzes (TMG)</h1>

            <div className='space-y-8'>
              <div className={sectionStyle}>
                <ul className={listStyle}>
                  <li className={listItemStyle}>LKT Group GmbH</li>
                  <li className={listItemStyle}>Lindenstraße 48-52</li>
                  <li className={listItemStyle}>40233 Düsseldorf</li>
                  <li className={listItemStyle}>Deutschland</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Vertretungsberechtigte Personen</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Max Zhivilov (Geschäftsführer)</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Kontakt</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Telefon: +49 (0) 2119891272</li>
                  <li className={listItemStyle}>E-Mail: info@goldenmill.de</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>Handelsregister</h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Handelsregisternummer: HRB 103872</li>
                  <li className={listItemStyle}>Registergericht: Amtsgericht Düsseldorf</li>
                </ul>
              </div>

              <div>
                <h2 className={sectionTitleStyle}>
                  Umsatzsteuer-Identifikationsnummer (USt-IdNr.)
                </h2>
                <ul className={listStyle}>
                  <li className={listItemStyle}>DE369065377</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceInformation;
