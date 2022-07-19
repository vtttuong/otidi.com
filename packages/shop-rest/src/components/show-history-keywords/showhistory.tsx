import { Saved } from "assets/icons/Saved";
import { useAppDispatch } from "contexts/app/app.provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getCookie } from "utils/session";
import {
  BoxSave,
  BtnRemove,
  SearchSave,
  SearchSaveItem,
} from "./showhistory.style";

type ShowHistoryProps = {
  className?: string;
  data?: any;
  texts?: any;
  closeSearch?: any;
  getSearchText: () => void;
  isAuthenticated?: boolean;
};

const ShowHistory: React.FC<ShowHistoryProps> = ({
  texts,
  closeSearch,
  isAuthenticated,
  getSearchText,
}) => {
  const [token, setToken] = useState("");
  const [togle, setToggle] = useState(false);
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setToken(getCookie("access_token"));
  });

  useEffect(() => {
    getSearchText();
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  const handleSearch = (text) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: text });
    closeSearch();
    let queryParams = {
      text: text,
    };

    router.push({
      pathname,
      query: {
        ...queryParams,
      },
    });
  };

  return (
    <>
      <BoxSave className={togle ? "toggle save" : "save"}>
        {token ? (
          <SearchSave className={"first"}>
            <BoxSave className={"title saved"}>
              <Saved />
              <FormattedMessage id="searchSaved" />
              <BtnRemove
                onClick={() => {
                  router.push(`/profile/history-search`);
                  setToggle(true);
                }}
              >
                <FormattedMessage id="searchSetting" />
              </BtnRemove>
            </BoxSave>
            {texts.length != 0 ? (
              texts.map((item) => {
                return (
                  <SearchSaveItem
                    key={item.id}
                    onClick={() => handleSearch(item.keyword)}
                  >
                    {item.keyword}
                  </SearchSaveItem>
                );
              })
            ) : (
              <p
                style={{
                  color: "#009e7f",
                  margin: "20px auto",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                <FormattedMessage id="noData" defaultMessage={"No data"} />
              </p>
            )}
          </SearchSave>
        ) : null}
      </BoxSave>
    </>
  );
};

export default ShowHistory;
