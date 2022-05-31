import React from 'react';

import { IntlProvider } from 'react-intl';
import { InjectRTL } from 'assets/styles/global.style';
import Cookie from 'js-cookie';
import { isLocale } from './language.utils';
import { StyleSheetManager } from 'styled-components';

const LanguageContext = React.createContext({} as any);

export const LanguageProvider = ({ children, messages }) => {
  const [locale, setLocale] = React.useState('en');
  const changeLanguage = (newLocale): void => {
    setLocale(newLocale);
    document.documentElement.lang = newLocale;
    Cookie.set('locale', newLocale);
  };
  React.useEffect(() => {
    const localSetting = Cookie.get('locale');
    if (localSetting && isLocale(localSetting)) {
      document.documentElement.lang = localSetting;
      setLocale(localSetting);
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <InjectRTL lang={locale} dir='ltr'>
          <StyleSheetManager stylisPlugins={[]}>
            {children}
          </StyleSheetManager>
        </InjectRTL>
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLocale = () => React.useContext(LanguageContext);
