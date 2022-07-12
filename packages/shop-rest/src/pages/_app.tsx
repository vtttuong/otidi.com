import { ThemeProvider } from "styled-components";
import { defaultTheme } from "site-settings/site-theme/default";
import {
  AppProvider,
  useAppDispatch,
  useAppState,
} from "contexts/app/app.provider";
import { AuthProvider } from "contexts/auth/auth.provider";
import { LanguageProvider } from "contexts/language/language.provider";
import { CartProvider } from "contexts/cart/use-cart";
import { useMedia } from "utils/use-media";
import AppLayout from "layouts/app-layout";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// External CSS import here
import "rc-drawer/assets/index.css";

import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/multi-carousel/multi-carousel.style.css";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/scrollbar/scrollbar.css";
import "@redq/reuse-modal/lib/index.css";
import "../features/user-profile/contentHeader/contentHeader.style.css";
import "../features/message/conversation/conversation.style.css";
import "../features/message/content/contentMessage.style.css";
import "../features/user-profile/sidebar/sidebar.style.css";
import "../components/TabPanel/tabpanel.style.css";
import { GlobalStyle } from "assets/styles/global.style";

// Language translation messages
import { messages } from "site-settings/site-translation/messages";
import "typeface-lato";
import "components/layout.css";
import "typeface-poppins";
import { useEffect } from "react";
import { useRouter } from "next/router";

// need to provide types
export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");
  return (
    <ThemeProvider theme={defaultTheme}>
      <LanguageProvider messages={messages}>
        <CartProvider>
          <AppProvider>
            <AuthProvider>
              <AppLayout>
                <Component
                  {...pageProps}
                  deviceType={{ mobile, tablet, desktop }}
                />
              </AppLayout>
              <GlobalStyle />
            </AuthProvider>
          </AppProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
