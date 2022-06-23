import CategoryWalker from "components/category-walker/category-walker";
import ErrorMessage from "components/error-message/error-message";
import {
  SidebarLoader,
  SidebarMobileLoader,
} from "components/placeholder/placeholder";
import { Scrollbar } from "components/scrollbar/scrollbar";
import { TreeMenu } from "components/tree-menu/tree-menu";
import { useAppState } from "contexts/app/app.provider";
import useBrands from "data/use-brand";
import { useRouter } from "next/router";
import React from "react";
import Sticky from "react-stickynode";
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
  type: string;
  latitude?: number;
  longitude?: number;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  const router = useRouter();
  const { data, error } = useBrands();

  if (error) return <ErrorMessage message={error.message} />;
  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    const { type } = query;
    if (type) {
      router.push(
        {
          pathname,
          query: { category: slug },
        },
        {
          pathname: `/${type}`,
          query: { category: slug },
        }
      );
    } else {
      router.push({
        pathname,
        query: { category: slug },
      });
    }
  };
  const isSidebarSticky = useAppState("isSidebarSticky");

  if (!data) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <CategoryWalker>
          <TreeMenu
            data={data}
            onClick={onCategoryClick}
            active={selectedQueries}
          />
        </CategoryWalker>
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: 45 }}>
        <Sticky enabled={isSidebarSticky} top={110}>
          <Scrollbar className="sidebar-scrollbar">
            <TreeWrapper>
              <TreeMenu
                data={data}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbar>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;
