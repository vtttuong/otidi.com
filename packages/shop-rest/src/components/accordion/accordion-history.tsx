import React, { useState, useEffect } from "react";
import AccordionWrapper, {
  SpanHistory,
  SpanTitleHistory,
  BoxHistory,
} from "./accordion.style";
import { FormattedMessage } from "react-intl";
import { Remove } from "assets/icons/Remove";
import Switch from "react-switch";
import { markIsNotification, markIsNotNotification, deleteSearchText } from "utils/api/searches";


type AccordionProps = {
  router?: any;
  className?: string;
  texts: any[];
  id?: number;
  onDelete?: any;
  token?: string;
  handleCategorySelection?: any;
};

const AccordionHistory: React.FC<AccordionProps> = ({
  className,
  texts = [],
  token,
}) => {
  const [toggle, setToggle] = useState(false);

  const onDelete = async (id: number) => {
    const index = texts.findIndex((text) => text.id === id);
    texts.splice(index, 1);
    setToggle(!toggle);
    await deleteSearchText(token, id);
  };

  const handleChange = async (item: any) => {
    setToggle(!toggle);
    var index = texts.findIndex((text) => text.id === item.id);
    if (index !== -1) {
      texts[index].is_notification = !texts[index].is_notification;
    }

    if (texts[index].is_notification == true) {
      await markIsNotification(token, item.id);
    } else {
      await markIsNotNotification(token, item.id);
    }
  };

  useEffect(() => {
    
  }, [toggle])

  return (
    <AccordionWrapper>
      <SpanTitleHistory>
        <FormattedMessage id="searchSavedTitle" values={{ count: texts.length, total: 5 }} />
      </SpanTitleHistory>
      <div className={`accordion ${className}`.trim()}>
        {texts.length !== 0 &&
          texts.map((item) => {
            return (
              <BoxHistory key={item.id}>
                <SpanHistory>
                  <span>{item.text}</span>
                  <span onClick={() => onDelete(item.id)}>
                    <Remove />
                    <span
                      style={{
                        left: 3,
                        fontSize: 12,
                        position: "relative",
                        opacity: 0.5,
                      }}
                    >
                      <FormattedMessage id="removeSearchText" />
                    </span>
                  </span>
                </SpanHistory>

                <Switch
                  onChange={() => handleChange(item)}
                  checked={item.is_notification}
                />
                <span className="agreeNoti">
                  <FormattedMessage id="allowNotification"/>
                </span>
              </BoxHistory>
            );
          })}
      </div>
    </AccordionWrapper>
  );
};

export default AccordionHistory;
