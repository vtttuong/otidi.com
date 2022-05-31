import React from "react";
import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import css from "@styled-system/css";
import { compose, variant, border, space, layout } from "styled-system";
import { FormattedMessage } from "react-intl";

const StyledButton = styled.div`
&.push{
  display:block;
  width:32%;
  .price{
    font-size:13px;
  }
}
&.active{
  border: 1px solid #009e7f;
}
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
  width: 30px;
  height: 30px;
`;
const InputRadio = styled.input`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #dadada;
  position: absolute;
  right: 20px;
  top: 13px;
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
  &.title{
    margin: 10px  0 0 0;
    font-weight:600
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
  price?: string;
  choose: boolean;
  active?: boolean;
  checked?: boolean;
  onClick;
  valueDay: string;
};
export type Ref = HTMLButtonElement;
export const Option = React.forwardRef<Ref, Props>(
  (
    {
      source,
      price,
      choose,
      active,
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
      <StyledButton onClick={onClick} className={active ? "push active" : "push"}>
        {source ? <Icon src={source} /> : null}
        {valueDay ? (
          <>
            <Content>{valueDay}</Content>
            <Content className={"time"}>
              <FormattedMessage id="dayAgo" />{" "}
            </Content>
          </>
        ) : (<>
          <Content className='title'
          >{title}</Content>
          <i className='price'>{price}</i>
        </>
          )}

        <InputRadio type="radio" checked={checked} />
        {/* <OptionButton className={choose == true ? "active" : null} /> */}
      </StyledButton>
    )
);
