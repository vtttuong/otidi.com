import CategoryWalker from "components/category-walker/category-walker";
import ErrorMessage from "components/error-message/error-message";
import {
  SidebarLoader,
  SidebarMobileLoader,
} from "components/placeholder/placeholder";
import { Scrollbar } from "components/scrollbar/scrollbar";
import { TreeMenu } from "components/tree-menu/tree-menu";
import { useAppDispatch, useAppState } from "contexts/app/app.provider";
import useBrands from "data/use-brand";
import { useRouter } from "next/router";
import React from "react";
import {
  CategoryWrapper,
  PopoverWrapper,
  SidebarWrapper,
  TreeWrapper,
} from "./sidebar.style";

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  latitude?: number;
  longitude?: number;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
}) => {
  const router = useRouter();
  const { data, error } = useBrands();

  if (error) return <ErrorMessage message={error.message} />;
  const { pathname, query } = router;
  const selectedBrand = useAppState("brandId");
  const selectedModel = useAppState("modelId");
  const dispatch = useAppDispatch();

  const onCategoryClick = (slug: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    router.push({
      pathname,
      // query: { ...query, text: slug },
      query: { text: slug },
    });
  };

  const onBrandClick = (brand: any) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    dispatch({ type: "SET_BRAND_ID", payload: brand.id });
    dispatch({ type: "SET_MODEL_ID", payload: null });

    router.push({
      pathname,
      // query: { ...query, text: slug },
      query: { brand: brand.name },
    });
  };

  const onModelClick = (model: any) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    dispatch({ type: "SET_BRAND_ID", payload: null });
    dispatch({ type: "SET_MODEL_ID", payload: model.id });
    router.push({
      pathname,
      // query: { ...query, text: slug },
      query: { model: model.name },
    });
  };
  // const isSidebarSticky = useAppState("isSidebarSticky");

  if (!data) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper
      style={{
        position: "sticky",
        top: "80px",
      }}
    >
      <PopoverWrapper>
        <CategoryWalker>
          <TreeMenu
            data={data}
            onBrandClick={onBrandClick}
            onModelClick={onModelClick}
            onClick={onCategoryClick}
            activeBrand={selectedBrand}
            activeModel={selectedModel}
          />
        </CategoryWalker>
      </PopoverWrapper>

      <SidebarWrapper
        style={{
          paddingTop: 45,
          position: "sticky",
          top: "0",
        }}
      >
        {/* <Sticky enabled={isSidebarSticky} top={110}> */}
        <Scrollbar className="sidebar-scrollbar">
          <TreeWrapper>
            <TreeMenu
              onBrandClick={onBrandClick}
              onModelClick={onModelClick}
              data={data}
              onClick={onCategoryClick}
              activeBrand={selectedBrand}
              activeModel={selectedModel}
            />
          </TreeWrapper>
        </Scrollbar>
        {/* </Sticky> */}
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;
