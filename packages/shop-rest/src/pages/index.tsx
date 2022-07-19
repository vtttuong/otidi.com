import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { HOME_PAGE, POSTS } from "site-settings/site-navigation";

const HomePage: React.FC<any> = () => {
  const router = useRouter();
  useEffect(() => {
    const { pathname } = router;
    if (pathname === HOME_PAGE) {
      router.push(POSTS);
    }
  });
  return <></>;
};
export default HomePage;
