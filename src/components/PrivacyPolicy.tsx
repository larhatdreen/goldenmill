import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme';

function PrivacyPolicy() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  const theme = useTheme();

    const textColor = theme.name === 'dark' ? '#D5CDBD' : '#2A3242';

    const containerStyle = `w-full min-h-screen py-[100px] px-[30px] md:px-[100px] font-adventpro border ${
      theme.name === 'dark' 
      ? 'bg-gradient-to-b from-[#1A1B1C] to-[#282828] border-[#2C2D2F]' 
      : 'bg-gradient-to-b from-[#F8F8F9] via-[#F2F2F2] to-[#ECECEC] border-[#82653F]'
    }`
    const titleStyle = 'text-[32px] md:text-[40px] text-[#82653F] font-medium mb-8 animate-fadeIn'
    const sectionTitleStyle = 'text-[24px] text-[#82653F] font-medium mt-12 mb-6'
    const listStyle = `list-disc ml-6 space-y-3`
    const textStyle = `text-[16px] leading-relaxed`
    const listItemStyle = 'hover:text-[#82653E] transition-colors duration-300'

  return (
    <>
      {currentLanguage === 'ru' && (
        <div className={containerStyle}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>
              Политика конфиденциальности LKT Group GmbH
            </h1>
            
            <div className="space-y-8" style={{color: textColor}}>
              <section>
                <h2 className={sectionTitleStyle}>1. Введение</h2>
                <p className={textStyle}>
                  LKT Group GmbH (&#34;мы&#34;, &#34;наша компания&#34;) придерживается принципов защиты ваших персональных
                  данных и соблюдения ваших прав на конфиденциальность. <br />
                  Настоящая политика конфиденциальности объясняет, как мы собираем, используем, храним и обеспечиваем
                  безопасность ваших персональных данных.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. Виды собираемых данных</h2>
                <p className={textStyle}>Мы можем собирать следующие виды персональных данных:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Адреса электронной почты</li>
                  <li className={listItemStyle}>Имена</li>
                  <li className={listItemStyle}>Адреса</li>
                  <li className={listItemStyle}>Номера телефонов</li>
                  <li className={listItemStyle}>Компания</li>
                  <li className={listItemStyle}>Другие данные, которые вы предоставляете добровольно</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. Цель обработки данных</h2>
                <p className={textStyle}>Мы обрабатываем ваши персональные данные с следующими целями:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Предоставление услуг</li>
                  <li className={listItemStyle}>Обработка заказов</li>
                  <li className={listItemStyle}>Маркетинг и реклама</li>
                  <li className={listItemStyle}>Поддержка клиентов</li>
                  <li className={listItemStyle}>Соблюдение наших юридических обязательств</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Правовая основа для обработки</h2>
                <p className={textStyle}>Обработка ваших данных осуществляется на основании одного из следующих правовых оснований:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Ваше согласие</li>
                  <li className={listItemStyle}>Исполнение договора с вами</li>
                  <li className={listItemStyle}>Соблюдение наших юридических обязательств</li>
                  <li className={listItemStyle}>Наши законные интересы</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Срок хранения данных</h2>
                <p className={textStyle}>
                  Ваши данные будут храниться только так долго, насколько это необходимо для вышеуказанных целей или по
                  требованиям закона.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>6. Права субъекта данных</h2>
                <p className={textStyle}>У вас есть право:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Получить доступ к своим данным</li>
                  <li className={listItemStyle}>Исправить свои данные</li>
                  <li className={listItemStyle}>Удалить свои данные</li>
                  <li className={listItemStyle}>Ограничить обработку</li>
                  <li className={listItemStyle}>Возразить против обработки</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>7. Передача данных</h2>
                <p className={textStyle}>
                  Мы будем передавать ваши данные третьим лицам только в случае необходимости для вышеуказанных целей или в
                  соответствии с юридическими обязательствами.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>8. Меры по обеспечению безопасности</h2>
                <p className={textStyle}>
                  Мы применяем соответствующие меры безопасности для защиты ваших данных от несанкционированного доступа, утраты
                  или недобросовестного использования.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>9. Международная передача данных</h2>
                <p className={textStyle}>
                  При передаче данных за пределы Европейского союза мы обеспечиваем достаточную защиту данных.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>10. Право подать жалобу в надзорный орган</h2>
                <p className={textStyle}>
                  Если у вас есть вопросы или замечания относительно обработки ваших данных, у вас есть право обратиться к
                  соответствующему органу по защите данных.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>11. Контактная информация</h2>
                <p className={textStyle}>
                  Для запросов по вопросам конфиденциальности обращайтесь по следующим контактам: LKT Group GmbH Lindenstraße
                  48-52, 40233 Düsseldorf, Германия Электронная почта: info@goldendie.de
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>12. Изменения в политике конфиденциальности</h2>
                <p className={textStyle}>
                  Настоящая политика конфиденциальности может периодически обновляться. Пожалуйста, регулярно проверяйте эту
                  страницу для получения обновлений.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'de' && (
        <div className={containerStyle}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>
              Datenschutzrichtlinie der LKT Group GmbH
            </h1>
            
            <div className="space-y-8" style={{color: textColor}}>
              <section>
                <h2 className={sectionTitleStyle}>1. Einleitung</h2>
                <p className={textStyle}>
                  Die LKT Group GmbH (&#34;wir&#34;, &#34;uns&#34;, &#34;unser&#34;) ist bestrebt, Ihre personenbezogenen Daten
                  zu schützen und Ihre Datenschutzrechte zu respektieren. Diese Datenschutzrichtlinie erläutert, wie wir Ihre
                  personenbezogenen Daten erfassen, verwenden, speichern und schützen.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. Arten der erfassten Daten</h2>
                <p className={textStyle}>Wir können die folgenden Arten von personenbezogenen Daten erfassen:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Namen</li>
                  <li className={listItemStyle}>Adressen</li>
                  <li className={listItemStyle}>E-Mail-Adressen</li>
                  <li className={listItemStyle}>Telefonnummern</li>
                  <li className={listItemStyle}>Unternehmen</li>
                  <li className={listItemStyle}>Andere Informationen, die Sie uns freiwillig zur Verfügung stellen</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. Zweck der Datenverarbeitung</h2>
                <p className={textStyle}>Wir verarbeiten Ihre personenbezogenen Daten für folgende Zwecke:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Bereitstellung von Dienstleistungen</li>
                  <li className={listItemStyle}>Bearbeitung von Bestellungen</li>
                  <li className={listItemStyle}>Marketing und Werbung</li>
                  <li className={listItemStyle}>Kundenbetreuung</li>
                  <li className={listItemStyle}>Erfüllung unserer rechtlichen Verpflichtungen</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Rechtsgrundlage für die Verarbeitung</h2>
                <p className={textStyle}>Die Verarbeitung Ihrer Daten erfolgt auf Grundlage einer der folgenden rechtlichen Grundlagen:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Ihre Einwilligung</li>
                  <li className={listItemStyle}>Die Erfüllung eines Vertrags mit Ihnen</li>
                  <li className={listItemStyle}>Die Erfüllung unserer rechtlichen Verpflichtungen</li>
                  <li className={listItemStyle}>Unser berechtigtes Interesse</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Speicherdauer</h2>
                <p className={textStyle}>
                  Ihre Daten werden nur so lange gespeichert, wie es für die oben genannten Zwecke erforderlich ist oder wie es
                  gesetzlich vorgeschrieben ist.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>6. Datenschutzrechte der Betroffenen</h2>
                <p className={textStyle}>Sie haben das Recht auf:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Auskunft über Ihre Daten</li>
                  <li className={listItemStyle}>Berichtigung Ihrer Daten</li>
                  <li className={listItemStyle}>Löschung Ihrer Daten</li>
                  <li className={listItemStyle}>Einschränkung der Verarbeitung</li>
                  <li className={listItemStyle}>Widerspruch gegen die Verarbeitung</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>7. Weitergabe von Daten</h2>
                <p className={textStyle}>
                  Wir geben Ihre Daten nur an Dritte weiter, wenn es für die oben genannten Zwecke erforderlich ist oder wenn
                  gesetzliche Verpflichtungen dies erfordern.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>8. Sicherheitsmaßnahmen</h2>
                <p className={textStyle}>
                  Wir treffen angemessene Sicherheitsmaßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu
                  schützen.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>9. Internationaler Datentransfer</h2>
                <p className={textStyle}>
                  Wenn wir Daten außerhalb der Europäischen Union übertragen, gewährleisten wir angemessenen Datenschutz.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>10. Beschwerderecht bei einer Aufsichtsbehörde</h2>
                <p className={textStyle}>
                  Wenn Sie Bedenken hinsichtlich unserer Datenverarbeitung haben, haben Sie das Recht, sich an die zuständige
                  Datenschutzbehörde zu wenden.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>11. Kontaktinformationen</h2>
                <p className={textStyle}>
                  Für Datenschutzanfragen kontaktieren Sie uns bitte unter: LKT Group GmbH Seibelstraße 26, 40822 Mettmann,
                  Deutschland E-Mail: info@goldendie.de
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>12. Änderungen der Datenschutzrichtlinie</h2>
                <p className={textStyle}>
                  Diese Datenschutzrichtlinie kann von Zeit zu Zeit aktualisiert werden. Bitte überprüfen Sie diese Seite
                  regelmäßig auf Änderungen.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {currentLanguage === 'en' && (
        <div className={containerStyle}>
          <div className="max-w-4xl mx-auto">
            <h1 className={titleStyle}>
              Privacy Policy of LKT Group GmbH
            </h1>
            
            <div className="space-y-8" style={{color: textColor}}>
              <section>
                <h2 className={sectionTitleStyle}>1. Introduction</h2>
                <p className={textStyle}>
                  LKT Group GmbH ("we", "us", "our") is committed to protecting your personal data and respecting your privacy rights.
                  This privacy policy explains how we collect, use, store, and protect your personal data.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>2. Types of Data Collected</h2>
                <p className={textStyle}>We may collect the following types of personal data:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Email addresses</li>
                  <li className={listItemStyle}>Names</li>
                  <li className={listItemStyle}>Addresses</li>
                  <li className={listItemStyle}>Phone numbers</li>
                  <li className={listItemStyle}>Company</li>
                  <li className={listItemStyle}>Other information you voluntarily provide</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>3. Purpose of Data Processing</h2>
                <p className={textStyle}>We process your personal data for the following purposes:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Providing services</li>
                  <li className={listItemStyle}>Processing orders</li>
                  <li className={listItemStyle}>Marketing and advertising</li>
                  <li className={listItemStyle}>Customer support</li>
                  <li className={listItemStyle}>Compliance with our legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>4. Legal Basis for Processing</h2>
                <p className={textStyle}>The processing of your data is based on one of the following legal grounds:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Your consent</li>
                  <li className={listItemStyle}>Performance of a contract with you</li>
                  <li className={listItemStyle}>Compliance with our legal obligations</li>
                  <li className={listItemStyle}>Our legitimate interests</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>5. Data Storage Period</h2>
                <p className={textStyle}>
                  Your data will be stored only for as long as necessary for the above-mentioned purposes or as required by law.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>6. Data Subject Rights</h2>
                <p className={textStyle}>You have the right to:</p>
                <ul className={listStyle}>
                  <li className={listItemStyle}>Access your data</li>
                  <li className={listItemStyle}>Rectify your data</li>
                  <li className={listItemStyle}>Delete your data</li>
                  <li className={listItemStyle}>Restrict processing</li>
                  <li className={listItemStyle}>Object to processing</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>7. Data Transfer</h2>
                <p className={textStyle}>
                  We will only transfer your data to third parties when necessary for the above-mentioned purposes or in accordance
                  with legal obligations.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>8. Security Measures</h2>
                <p className={textStyle}>
                  We implement appropriate security measures to protect your data from unauthorized access, loss, or misuse.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>9. International Data Transfer</h2>
                <p className={textStyle}>
                  When transferring data outside the European Union, we ensure adequate data protection.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>10. Right to Lodge a Complaint</h2>
                <p className={textStyle}>
                  If you have concerns about our data processing, you have the right to lodge a complaint with the relevant
                  data protection authority.
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>11. Contact Information</h2>
                <p className={textStyle}>
                  For privacy inquiries, please contact us at: LKT Group GmbH Lindenstraße 48-52, 40233 Düsseldorf,
                  Germany Email: info@goldendie.de
                </p>
              </section>

              <section>
                <h2 className={sectionTitleStyle}>12. Changes to Privacy Policy</h2>
                <p className={textStyle}>
                  This privacy policy may be updated periodically. Please check this page regularly for updates.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrivacyPolicy
