import NoResultFound from "components/no-result/no-result";
import React from "react";
import styled from "styled-components";
const NotFoundPage = styled.div`
  margin-top: 100px;
`;

const NotFound = () => {
  return (
    <NotFoundPage>
      <NoResultFound />
    </NotFoundPage>
  );
};

export default NotFound;
