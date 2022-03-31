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
import Carousel from "components/carousel/carousel-top-product";
import { SEO } from "components/seo";
import { ModalProvider } from "contexts/modal/modal.provider";
import Filter from "features/filter/filter";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
// Static Data Import Here
import { sitePages } from "site-settings/site-pages";
import { useRefScroll } from "utils/use-ref-scroll";
import useBanner from "data/use-banner";
import { getCookie } from "utils/session";

const Sidebar = dynamic(() => import("layouts/sidebar/sidebar"));
const Products = dynamic(() =>
  import("components/product-grid/product-list/product-list")
);

const CategoryPage: React.FC<any> = ({ banner, deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [
    query.text,
    query.category,
    query.sort,
    query.postType,
    query.range,
    query.latitude,
    query.longitute,
    query.daysAgo,
  ]);

  const PAGE_TYPE: any = query.type;
  const page = sitePages[PAGE_TYPE];
  if (!page) return null;

  return (
    <>
      <SEO title={page.page_title} description={page.page_description} />
      <ModalProvider>
        <Modal>
          <MobileBanner intlTitleId={page?.banner_title_id} type={PAGE_TYPE} />
          <Banner
            intlTitleId={banner ? banner.title : page?.banner_title_id}
            intlDescriptionId={banner ? banner.sub_title : page?.banner_description_id}
            imageUrl={banner ? banner.url : page?.banner_image_url}
          />
          <OfferSection>
            <div style={{ margin: "0 -10px" }}>
              <Carousel deviceType={deviceType} />
            </div>
          </OfferSection>
          <MobileCarouselDropdown>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </MobileCarouselDropdown>
          <MainContentArea>
            <SidebarSection>
              <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            </SidebarSection>
            <ContentSection>
              <Filter />
              <div ref={targetRef}>
                <Products
                  type={PAGE_TYPE}
                  deviceType={deviceType}
                  fetchLimit={500}
                />
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
  const type = context.query.type;
  const url =
    process.env.NEXT_PUBLIC_LARAVEL_API_URL +
    `/api/v1/banners/${type}?locale=${locale}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(url, options);
  const banner = await data.json();
  return {
    props: {
      banner: banner,
    },
  };
}

export default CategoryPage;
