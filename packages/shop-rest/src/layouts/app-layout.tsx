import ProgressBox from "components/progress-routing/progress-bar";
import { useAppDispatch, useAppState } from "contexts/app/app.provider";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Sticky from "react-stickynode";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  // deviceType: { mobile, tablet, desktop },
}) => {
  const isSticky = useAppState("isSticky");
  const { pathname, query } = useRouter();

  const isHomePage = pathname === "/";

  const dispatch = useAppDispatch();
  const isRouting = useAppState("isRouting");
  const router = useRouter();
  useEffect(() => {
    const startRouting = () => {
      dispatch({
        type: "SET_IS_ROUTING",
        payload: true,
      });
    };
    const stopRouting = () => {
      dispatch({
        type: "SET_IS_ROUTING",
        payload: false,
      });
    };

    router.events.on("routeChangeStart", startRouting);
    router.events.on("routeChangeComplete", stopRouting);
    router.events.on("routeChangeError", stopRouting);

    return () => {
      router.events.off("routeChangeStart", startRouting);
      router.events.off("routeChangeComplete", stopRouting);
      router.events.off("routeChangeError", stopRouting);
    };
  }, [router]);

  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <ProgressBox isAnimating={isRouting} />
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? "sticky" : "unSticky"} ${
            isHomePage ? "home" : ""
          } desktop`}
        />

        <Header
          className={`${isSticky && isHomePage ? "sticky" : "unsticky"} ${
            isHomePage ? "home" : ""
          }`}
          isHome={isHomePage}
        />
      </Sticky>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
