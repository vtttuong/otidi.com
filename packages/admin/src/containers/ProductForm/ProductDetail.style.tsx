import stylede from "styled-components";

export const Wrapper = stylede.div`
&.error-box{
    padding-bottom:10px;
    border-bottom:1px solid;
    p{
      margin:0
    }
    >p:first-child{
      font-weight:600;
      padding:10px 0;
      font-size:15px
    }
  }
  `;
