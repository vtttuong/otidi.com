import React from "react";
import { SearchBox } from "components/search-box/search-box";
import Notice from "components/notice/notice";
import { useAppState, useAppDispatch } from "contexts/app/app.provider";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { ButtonSave, Container } from "./search.style";
import { Saved } from "assets/icons/Saved";
import { Booked } from "assets/icons/BookMark";
import { getCookie } from "utils/session";
import { saveTextSearch } from "utils/api/searches";

interface Props {
  minimal?: boolean;
  token?: string;
  isShowSave?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  onGetText?: (text: string) => void;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, onGetText, ...props }) => {
  const searchTerm = useAppState("searchTerm");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intl = useIntl();
  const [isShowSave, setIsShowSave] = React.useState(false);
  const [erSave, setErSave] = React.useState("");
  const [isBooked, setIsBooked] = React.useState(false);
  const [valueSaved, setValueSaved] = React.useState("");
  // const token = getCookie("access_token");
  const handleOnChange = (e) => {
    const { value } = e.target;
    setValueSaved(value);
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
    if (value.length >= 2) {
      setIsShowSave(true);
    } else if (value.length < 2) {
      setIsShowSave(false);
    }
  };

  const onSaveText = async (e) => {
    if (!isBooked) {
      setErSave("");
      const result = await saveTextSearch(props.token, valueSaved);
      onGetText(valueSaved);
      if (result.result == false) setErSave("error");
    }
    setIsBooked(!isBooked);
    return;
  };

  const { pathname, query } = router;
  const onSearch = (e) => {
    e.preventDefault();
    const { type, ...rest } = query;
    if (type) {
      router.push(
        {
          pathname,
          query: { ...rest, text: searchTerm },
        },
        {
          pathname: `/${type}`,
          query: { ...rest, text: searchTerm },
        }
      );
    } else {
      router.push({
        pathname,
        query: { ...rest, text: searchTerm },
      });
    }
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <Container>
      <SearchBox
        onEnter={onSearch}
        onChange={handleOnChange}
        value={searchTerm}
        name="search"
        placeholder={intl.formatMessage({
          id: "searchPlaceholder",
          defaultMessage: "Your products",
        })}
        categoryType={query.type || "restaurant"}
        buttonText={intl.formatMessage({
          id: "searchButtonText",
          defaultMessage: "Search",
        })}
        {...props}
      />
      {isShowSave == true && props.token ? (
        <ButtonSave onClick={onSaveText}>
          {!isBooked ? <Saved /> : <Booked />}
        </ButtonSave>
      ) : null}
      {isBooked ? (
        <Notice
          status={erSave.length != 0 ? "error" : "success"}
          content={
            erSave.length != 0
              ? "Lưu quá 5 từ khoá, thử lại !"
              : "Lưu thành công!"
          }
        />
      ) : null}
    </Container>
  );
};

export default Search;
