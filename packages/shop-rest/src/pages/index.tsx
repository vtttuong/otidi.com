import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { setCookie } from 'utils/session';

// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<{}> = () => {
  useEffect(() => {
    setCookie("locale", "vi");
    Router.replace("/[type]", "/vehicle");
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default IndexPage;
