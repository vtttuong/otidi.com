import styled from "styled-components";

export const BoxSave = styled.div`
  width: 100%;
  font-size: 18px;
  position: relative;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border-radius: 8px;

  .toggle {
    display: none !important;
  }
  .save {
    width: 100%;
    margin-top: 5px;
    position: absolute;
    @media only screen and (min-width: 991px) and (max-width: 1200px) {
      width: 170% !important;
      background: #fff;
    }

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: 8px;
  }
  .title {
    font-weight: 600;
    font-size: 18px;
    position: relative;
    width: 100%;
    background: #009e7f33;
    border-radius: 3px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .title.saved {
    display: flex;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    background: #d5cf0291;
    padding: 5px 10px;
  }
`;
export const SearchSave = styled.ul`
  position: relative;
  padding: 15px;
  background: #fff;
  &.first {
    // padding-bottom: 0;
  }
  img {
    margin-right: 10px;
    position: relative;
    top: -1px;
  }
  button {
    position: absolute;
    right: 15px;
  }
  > li:first-child {
    border-top: 1px solid red;
  }
`;
export const SearchSaveItem = styled.li`
  font-weight: 500;
  color: #989898;
  padding: 7px 7px 7px 30px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #e0e0e0;
    border-radius: 5px;
  }
`;
export const BtnRemove = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: blue;
  border: 0;
  background: transparent;
  top: 7px;
`;
export const Search = styled.div``;
