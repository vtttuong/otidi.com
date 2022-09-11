import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingWrapper = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;

  &:after {
    content: " ";
    display: block;
    width: 20x;
    height: 20px;
    // margin: 8px;
    border-radius: 50%;
    border: 4px solid ${(props) => (props.color ? props.color : "#fff")};
    border-color: ${(props) => (props.color ? props.color : "#fff")} transparent
      ${(props) => (props.color ? props.color : "#fff")} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ color }) => {
  return (
    <Wrapper>
      <LoadingWrapper color={color}></LoadingWrapper>
    </Wrapper>
  );
};
export default Loading;
