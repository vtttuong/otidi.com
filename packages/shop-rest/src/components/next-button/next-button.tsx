import { themeGet } from "@styled-system/theme-get";
import React from "react";
import styled, { keyframes } from "styled-components";

const StyledButton = styled.button`
  display: flex;
  width: 98%;
  margin: 20px auto 10px auto;
  border: 1px solid #dadada;
  border-radius: 10px;
  background: #ff9b45;
  padding: 10px;
  justify-content: center;
`;
const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Icon = styled.img`
  width: 25px;
  margin-left: 10px;
  color: #fff;
`;

const Content = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 3px;
`;
// const Spinner = styled.div((props) =>
//   css({
//     width: 18,
//     height: 18,
//     marginLeft: 10,
//     border: '3px solid white',
//     borderTop: `3px solid ${props.color ? props.color : 'primary.regular'}`,
//     borderRadius: '50%',
//     transitionProperty: 'transform',
//     animationName: `${rotate}`,
//     animationDuration: '1.2s',
//     animationIterationCount: 'infinite',
//     animationTimingFunction: 'linear',
//   })
// );

type Props = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type: "submit" | "button";
  [key: string]: unknown;
  source: string;
  title: string;
  choose: boolean;
  onClick;
};
export type Ref = HTMLButtonElement;
export const Next = React.forwardRef<Ref, Props>(
  (
    {
      source,
      choose,
      title,
      children,
      onClick,
      disabled,
      loading = false,
      ...props
    },
    ref
  ) => (
    <StyledButton ref={ref} {...props} disabled={disabled} onClick={onClick}>
      <Content>{title}</Content>
      <i
        className="fas fa-arrow-right"
        style={{ marginLeft: 10, marginTop: 8 }}
      ></i>
    </StyledButton>
  )
);
