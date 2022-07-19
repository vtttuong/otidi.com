import React from "react";
import styled from "styled-components";

interface WrapperProps {
  top: number;
}
interface StickyProps {
  top: number;
}

export const Wrapper = styled.div<WrapperProps>`
  position: sticky;
  left: 0;
  top: ${(props) => props.top}px;
`;

const Sticky: React.FC<StickyProps> = ({ top, children }) => {
  return <Wrapper top={top}>{children} </Wrapper>;
};

export default Sticky;
