import React, { useState, useEffect } from "react";
import AccordionWrapper, {
  SpanHistory,
  SpanTitleHistory,
  BoxHistory,
  SpanRemove,
} from "./accordion.style";
import { FormattedMessage } from "react-intl";
import { Remove } from "assets/icons/Remove";
import Switch from "react-switch";
import {
  markIsNotification,
  markIsNotNotification,
  removeTextSearch,
} from "utils/api/searches";
import Spinner from "components/spinner";
import { useRouter } from "next/router";
import { useAppDispatch } from "contexts/app/app.provider";

type AccordionProps = {
  router?: any;
  className?: string;
  texts: any[];
  id?: number;
  onDelete?: any;
  token: string;
  handleCategorySelection?: any;
};

const AccordionHistory: React.FC<AccordionProps> = ({
  className,
  texts = [],
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onDelete = async (id: number) => {
    setLoading(true);
    const { result } = await removeTextSearch(token, id);
    if (result) {
      const index = texts.findIndex((text) => text.id === id);
      texts.splice(index, 1);
    }
    setLoading(false);
  };

  const handleSearch = (keyword) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: keyword });
    router.push(`/?text=${keyword}`);
  };

  return (
    <AccordionWrapper>
      <SpanTitleHistory>
        <FormattedMessage
          id="searchSavedTitle"
          values={{ count: texts.length, total: 5 }}
        />
      </SpanTitleHistory>
      <div className={`accordion ${className}`.trim()}>
        {texts.length !== 0 &&
          texts.map((item) => {
            return (
              <BoxHistory key={item.id}>
                <SpanHistory onClick={() => handleSearch(item.keyword)}>
                  <span>{item.keyword}</span>
                </SpanHistory>
                <SpanRemove onClick={() => onDelete(item.id)}>
                  {loading ? <Spinner color="#000" /> : <Remove />}
                </SpanRemove>
              </BoxHistory>
            );
          })}
      </div>
    </AccordionWrapper>
  );
};

export default AccordionHistory;
