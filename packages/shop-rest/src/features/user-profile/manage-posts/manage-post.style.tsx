import styled from "styled-components";

const Box = styled.div`
  table tr > th {
    border: none !important;
    font-size: 16px;
  }
  div.child {
    background: whitesmoke;
    border-radius: 10px;
    padding-bottom: 5px;

    > div {
      margin-left: 100px;
      > .reviewer {
        display: flex;
        padding-top: 20px;
        border-top: 1px solid #f1f1f1;
      }
    }
  }
  div.parent-node {
    border-top: 1px solid #f1f1f1;
    padding-top: 20px;
    margin-bottom: 20px;
    display: flex;
    > div {
      max-width: 400px;
      position: relative;
    }
    div.reviewer {
      display: flex;
      align-items: center;
    }
  }
  .td-img {
    display: flex;
    width: 40%;
    > span {
      margin-right: 20px;
      b {
        position: absolute !important;
        left: 92px;
        bottom: -18px !important;
        font-size: 13px;
      }
      img,
      b {
        color: red;
        vertical-align: bottom;
        position: relative;
        bottom: -25px;
      }
    }
  }
  .td {
    width: 30%;
    vertical-align: top;
    text-align: left;
    &:last-child {
      text-align: left;
    }
  }
  img.avatar-in-table {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  & textarea {
    outline: none;
    border-radius: 5px;
    transition: all 0.2s;
    padding: 5px;

    &:focus {
      border: 2px solid #009e7f;
    }
  }
`;

export { Box };
