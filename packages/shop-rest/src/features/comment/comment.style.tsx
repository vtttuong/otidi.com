import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const CMBody = styled.div`
  width: 100%;
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #dadada;
  @media (max-width: 767px) {
    width: 100%;
  }
  &.col{
    border:0;
    flex-direction:column;
    margin:0;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  margin-bottom:20px;
  @media (max-width: 767px) {
    width: 100%;
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;
const P = styled.p`
    font-size:14px; 
    &.time{
        color: #a09898;
    }
    &.number{
        margin-left:5px
    }
`;
const ContainerImage = styled.div`
  display:flex;
  margin: 10px 0;
`;
const FeedImage = styled.img`
`;
const CenterContainerSub = styled.img`
  width: 10%;
  margin-right: 10px;
`;
const Avatar = styled.img`
 border-radius:50% !important;
 width:50px;
 height:50px !important;
 margin-right: 10px
`;
export {
 CMBody,
 Avatar,
 P,
 TopContainer,
 ContainerImage,
 CenterContainerSub,
};
