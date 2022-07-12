import React from "react";
import {
  StyledForm,
  StyledInput,
  StyledCategoryName,
  StyledSearchButton,
} from "./search-box.style";
import { SearchIcon } from "assets/icons/SearchIcon";
import { SSL_OP_NO_TLSv1_2 } from "constants";

interface Props {
  onEnter: (e: React.SyntheticEvent) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  minimal?: boolean;
  className?: string;
  showButtonText?: boolean;
  shadow?: string;
  [key: string]: unknown;
}

export const SearchBox: React.FC<Props> = ({
  onEnter,
  onChange,
  value,
  name,
  minimal,
  buttonText,
  className,
  showButtonText = true,
  shadow,
  ...rest
}) => {
  return (
    <StyledForm
      onSubmit={onEnter}
      className={className}
      boxShadow={shadow}
      minimal={minimal}
    >
      {minimal ? (
        <>
          <SearchIcon
            style={{
              marginLeft: 16,
              marginRight: 16,
              top: 2,
              position: "relative",
              color: "#009E7F",
            }}
          />
          <StyledInput
            type="search"
            autoComplete="off"
            onChange={onChange}
            value={value}
            name={name}
            {...rest}
          />
        </>
      ) : (
        <>
          <StyledInput
            type="search"
            autoComplete="off"
            onChange={onChange}
            value={value}
            name={name}
            {...rest}
          />
          <StyledSearchButton>
            <SearchIcon style={{ marginRight: 10 }} />
            {showButtonText && buttonText}
          </StyledSearchButton>
        </>
      )}
    </StyledForm>
  );
};
