import styled from "styled-components";
import React from "react";
import { Pagination as Paging } from "baseui/pagination";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px;

  button {
    cursor: pointer;
    transition: all 0.2s;
  }

  button.active {
    background: #40c057;
  }
`;
interface Props {
  page: number;
  total: number;
  setPage: any;
}
const Pagination: React.FC<Props> = ({ page, total, setPage }) => {
  return (
    <Wrapper>
      <Paging
        numPages={total}
        currentPage={page}
        onPageChange={({ nextPage }) => {
          setPage(Math.min(Math.max(nextPage, 1), total));
        }}
      ></Paging>
    </Wrapper>
  );
};

export default Pagination;
