import { themeGet } from "@styled-system/theme-get";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled, { keyframes } from "styled-components";

const StyledButton = styled.div`
  display: flex;
  width: 100%;
  margin: 10px auto;
  border: 1px solid #dadada;
  border-radius: 10px;
  background: #fff;
  padding: 7px;
  position: relative;
`;
const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  border: 3px solid #ffffff;
  border-top: 3px solid
    ${(props) =>
      props.color ? props.color : themeGet("primary.regular", "#009E7F")};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
const InputRadio = styled.input`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #dadada;
  position: absolute;
  right: 20px;
  top: 8px;
  &.active {
    background: orange;
  }
`;
const Content = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  &.time {
    margin-left: 10px;
  }
`;

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type: "submit" | "button";
  [key: string]: unknown;
  source: string;
  title?: string;
  choose: boolean;
  checked?: boolean;
  onClick;
  valueDay: string;
};
export type Ref = HTMLButtonElement;
export const Option = React.forwardRef<Ref, Props>(
  (
    {
      source,
      choose,
      title,
      children,
      onClick,
      disabled,
      checked,
      valueDay,
      loading = false,
      ...props
    },
    ref
  ) => (
    <StyledButton onClick={onClick}>
      {source ? <Icon src={source} /> : null}
      {valueDay ? (
        <>
          <Content>{valueDay}</Content>
          <Content className={"time"}>
            <FormattedMessage id="dayAgo" />{" "}
          </Content>
        </>
      ) : (
        <Content>{title}</Content>
      )}

      <InputRadio type="radio" checked={checked} onChange={() => {}} />
      {/* <OptionButton className={choose == true ? "active" : null} /> */}
    </StyledButton>
  )
);
