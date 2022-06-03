import React from "react";
import { Box, SelectedItem, Flag, MenuItem } from "./language-switcher.style";
import Popover from "components/popover/popover";
import { FormattedMessage } from "react-intl";
import * as flagIcons from "assets/icons/flags";
import { useLocale } from "contexts/language/language.provider";
import { LANGUAGE_MENU } from "site-settings/site-navigation";
import { useRouter } from "next/router";

const FlagIcon = ({ name }) => {
  const TagName = flagIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const LanguageMenu = ({ onClick }) => {
  return (
    <>
      {LANGUAGE_MENU.map((item) => (
        <MenuItem onClick={onClick} key={item.id} value={item.id}>
          <span>
            <FlagIcon name={item.icon} />
          </span>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      ))}
    </>
  );
};

type Props = {
  isHomePage?: boolean;
};
const LanguageSwitcher: React.FC<Props> = ({ isHomePage }) => {
  const router = useRouter();
  const { query } = useRouter();
  const { locale, changeLanguage } = useLocale();
  const selectedLanguage = LANGUAGE_MENU.find((x) => x.id === locale);
  const languageChangeHandler = (e) => {
    changeLanguage(e.target.value);
    console.log(router.pathname);
    if (isHomePage) {
      router.push(`/${query.type}`);
      return;
    }
    if (router.pathname == "/post" || router.pathname.includes("/post/edit")) {
      router.push(router.pathname);
      return;
    }
  };
  return (
    <Box>
      <Popover
        className="right"
        handler={
          <SelectedItem>
            <Flag>
              <FlagIcon name={selectedLanguage?.icon} />
            </Flag>
            <span>
              <FormattedMessage
                id={selectedLanguage?.id}
                defaultMessage={selectedLanguage?.defaultMessage}
              />
            </span>
          </SelectedItem>
        }
        content={<LanguageMenu onClick={languageChangeHandler} />}
      />
    </Box>
  );
};

export default LanguageSwitcher;