import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

function CookiePolicy() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const theme = useTheme();
  const isDark = theme.name === 'dark';

  const textColor = isDark ? '#D5CDBD' : '#2A3242';

  const containerStyle = `w-full min-h-screen py-[100px] px-[30px] md:px-[100px] font-adventpro border ${
    isDark 
    ? 'bg-gradient-to-b from-[#1A1B1C] to-[#282828] border-[#2C2D2F]' 
    : 'bg-gradient-to-b from-[#F8F8F9] via-[#F2F2F2] to-[#ECECEC] border-[#82653F]'
  }`;
  const titleStyle = 'text-[32px] md:text-[40px] text-[#82653F] font-medium mb-8 animate-fadeIn';
  const sectionTitleStyle = 'text-[24px] text-[#82653F] font-medium mt-12 mb-6';
  const textStyle = 'text-[16px] leading-relaxed';
  const listStyle = 'list-disc ml-6 space-y-3';
  const listItemStyle = 'hover:text-[#82653E] transition-colors duration-300';

  return (
    <>
      {currentLanguage === 'en' && (
        <div className={containerStyle} style={{color: textColor}}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>Cookie Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className={sectionTitleStyle}>1. What are Cookies?</h2>
                <p className={textStyle}>
                  Cookies are small text files that are stored on your device when you visit our website. They help us improve the website's functionality and provide you with a more personalized experience.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. What Cookies Do We Use?</h2>
                <p className={textStyle}>We use the following types of cookies:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>
                    <span className="font-medium">Necessary Cookies:</span>
                    <br />
                    These cookies are essential for the website to function properly and cannot be disabled. They are usually only set in response to actions you take, such as setting privacy preferences or filling out forms.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Analytics Cookies:</span>
                    <br />
                    Help us understand how visitors interact with the website. This information is used to improve the website.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Functional Cookies:</span>
                    <br />
                    Allow the website to remember your preferences and provide enhanced features.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Marketing Cookies:</span>
                    <br />
                    Used to track visitors across websites to display relevant advertisements.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. How to Manage Cookies?</h2>
                <p className={textStyle}>
                  You can manage cookie usage through your browser settings. Please note that disabling certain cookies may affect the website's functionality.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Cookie Storage Duration</h2>
                <p className={textStyle}>
                  Session cookies are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Policy Updates</h2>
                <p className={textStyle}>
                  We may update this cookie policy. Please check this page periodically for changes.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'ru' && (
        <div className={containerStyle} style={{color: textColor}}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>Политика использования файлов cookie</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className={sectionTitleStyle}>1. Что такое файлы cookie?</h2>
                <p className={textStyle}>
                  Файлы cookie - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего сайта. Они помогают нам улучшить работу сайта и предоставить вам более персонализированный опыт.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. Какие файлы cookie мы используем?</h2>
                <p className={textStyle}>Мы используем следующие типы файлов cookie:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>
                    <span className="font-medium">Необходимые файлы cookie:</span>
                    <br />
                    Эти файлы необходимы для работы сайта и не могут быть отключены. Они обычно устанавливаются только в ответ на ваши действия, такие как настройка параметров конфиденциальности или заполнение форм.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Аналитические файлы cookie:</span>
                    <br />
                    Помогают нам понять, как посетители взаимодействуют с сайтом. Эта информация используется для улучшения работы сайта.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Функциональные файлы cookie:</span>
                    <br />
                    Позволяют сайту запоминать ваши предпочтения и предоставлять расширенные функции.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Маркетинговые файлы cookie:</span>
                    <br />
                    Используются для отслеживания посетителей на разных веб-сайтах с целью показа релевантной рекламы.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. Как управлять файлами cookie?</h2>
                <p className={textStyle}>
                  Вы можете управлять использованием файлов cookie через настройки вашего браузера. Обратите внимание, что отключение определенных файлов cookie может повлиять на функциональность сайта.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Срок хранения файлов cookie</h2>
                <p className={textStyle}>
                  Сессионные файлы cookie удаляются после закрытия браузера. Постоянные файлы cookie остаются на вашем устройстве до истечения срока их действия или до их удаления вами.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Обновление политики</h2>
                <p className={textStyle}>
                  Мы можем обновлять эту политику использования файлов cookie. Пожалуйста, периодически проверяйте эту страницу на наличие изменений.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'de' && (
        <div className={containerStyle} style={{color: textColor}}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>Cookie-Richtlinie</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className={sectionTitleStyle}>1. Was sind Cookies?</h2>
                <p className={textStyle}>
                  Cookies sind kleine Textdateien, die beim Besuch unserer Website auf Ihrem Gerät gespeichert werden. Sie helfen uns, die Website zu verbessern und Ihnen ein personalisierteres Erlebnis zu bieten.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. Welche Cookies verwenden wir?</h2>
                <p className={textStyle}>Wir verwenden folgende Arten von Cookies:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>
                    <span className="font-medium">Notwendige Cookies:</span>
                    <br />
                    Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie werden normalerweise nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Analytische Cookies:</span>
                    <br />
                    Helfen uns zu verstehen, wie Besucher mit der Website interagieren. Diese Informationen werden zur Verbesserung der Website verwendet.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Funktionale Cookies:</span>
                    <br />
                    Ermöglichen es der Website, sich an Ihre Einstellungen zu erinnern und erweiterte Funktionen bereitzustellen.
                  </li>
                  <li className={listItemStyle}>
                    <span className="font-medium">Marketing-Cookies:</span>
                    <br />
                    Werden verwendet, um Besucher über Websites hinweg zu verfolgen und relevante Werbung anzuzeigen.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. Wie können Sie Cookies verwalten?</h2>
                <p className={textStyle}>
                  Sie können die Verwendung von Cookies über Ihre Browsereinstellungen verwalten. Bitte beachten Sie, dass die Deaktivierung bestimmter Cookies die Funktionalität der Website beeinträchtigen kann.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Speicherdauer von Cookies</h2>
                <p className={textStyle}>
                  Sitzungs-Cookies werden nach dem Schließen des Browsers gelöscht. Permanente Cookies bleiben auf Ihrem Gerät, bis sie ablaufen oder von Ihnen gelöscht werden.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Aktualisierung der Richtlinie</h2>
                <p className={textStyle}>
                  Wir können diese Cookie-Richtlinie aktualisieren. Bitte überprüfen Sie diese Seite regelmäßig auf Änderungen.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookiePolicy; 