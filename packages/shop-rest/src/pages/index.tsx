import { Modal } from "@redq/reuse-modal";
import {
  ContentSection,
  MainContentArea,
  MobileCarouselDropdown,
  OfferSection,
  SidebarSection,
} from "assets/styles/pages.style";
import { Banner } from "components/banner/banner";
import { MobileBanner } from "components/banner/mobile-banner";
import Carousel from "components/carousel/carousel-top-post";
import { SEO } from "components/seo";
import { ModalProvider } from "contexts/modal/modal.provider";
import Filter from "features/filter/filter";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
// Static Data Import Here
import { sitePages } from "site-settings/site-pages";
import { getCookie } from "utils/session";
import { useRefScroll } from "utils/use-ref-scroll";

const URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;

const Sidebar = dynamic(() => import("layouts/sidebar/sidebar"));
const Posts = dynamic(() => import("components/post-grid/post-list/post-list"));

const HomePage: React.FC<any> = ({ banner, deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  React.useEffect(() => {
    if (query.text) {
      scroll();
    }
  }, [query.text, query.sort]);

  const page = sitePages.posts;
  if (!page) return null;

  return (
    <>
      <SEO title={page.page_title} description={page.page_description} />
      <ModalProvider>
        <Modal>
          <MobileBanner intlTitleId={page?.banner_title_id} />
          <Banner />
          <OfferSection>
            <div style={{ margin: "0 -10px" }}>
              <Carousel deviceType={deviceType} />
            </div>
          </OfferSection>
          <MobileCarouselDropdown>
            <Sidebar deviceType={deviceType} />
          </MobileCarouselDropdown>
          <MainContentArea>
            <SidebarSection>
              <Sidebar deviceType={deviceType} />
            </SidebarSection>
            <ContentSection>
              <Filter />
              <div ref={targetRef}>
                <Posts deviceType={deviceType} fetchLimit={500} />
              </div>
            </ContentSection>
          </MainContentArea>
        </Modal>
      </ModalProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const locale = getCookie("locale", context);
  const url = `${URL}/banners`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(url, options);

  console.log(data);

  const dataJson = await data.json();

  const fake_banner = {
    id: 1,
    url:
      "https://otody.s3.ap-southeast-1.amazonaws.com/banners/6n9wbAu1hJE025xd.jpg",
    created_at: "2022-04-11T08:14:46+00:00",
    updated_at: "2022-04-11T08:14:46+00:00",
  };
  const banner = fake_banner;

  return {
    props: {
      banner: banner,
    },
  };
}

export default HomePage;
