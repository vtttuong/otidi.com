import { styled, withStyle } from "baseui";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import Input from "components/Input/Input";
import NoResult from "components/NoResult/NoResult";
import Pagination from "components/Pagination/Pagination";
import Placeholder from "components/Placeholder/Placeholder";
import PostCard from "components/PostCard/PostCard";
import Select from "components/Select/Select";
import { Header } from "components/Wrapper.style";
import UpdatePost from "containers/PostForm/PostUpdateForm";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { getBrands } from "service/use-brands";
import { CURRENCY } from "settings/constants";
import usePosts from "../../service/use-posts";
import { getUsers } from "../../service/use-users";

export const ProductsRow = styled("div", ({ $theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "25px",
  backgroundColor: $theme.colors.backgroundF7,
  position: "relative",
  zIndex: "1",

  "@media only screen and (max-width: 767px)": {
    marginLeft: "-7.5px",
    marginRight: "-7.5px",
    marginTop: "15px",
  },
}));

export const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

export const ProductCardWrapper = styled("div", () => ({
  height: "100%",
}));

export const LoaderWrapper = styled("div", () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexWrap: "wrap",
}));

export const LoaderItem = styled("div", () => ({
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
}));

const productStatusSelectOptions = [
  { value: "active", label: "Active" },
  { value: "waiting", label: "Waiting approve" },
  { value: "sold", label: "Sold" },
];

const sortSelectOptions = [
  { value: "lasted", label: "Lasted" },
  { value: "oldest", label: "Oldest" },
];

type ProductsProps = {
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
};

export default function Posts() {
  const [brandSelectOptions, setBrandsSelectOptions] = useState([]);

  const [postStatusOption, setPostStatusOption] = useState([]);
  const [brandOption, setBrandOption] = useState([]);
  const [sortByOption, setSortByOption] = useState([]);
  const [postTypeOption, setPostTypeOption] = useState([]);

  const [search, setSearch] = useState("");
  const [postType, setPostType] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [brands, setBrands] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isSoldType, setIsSoldType] = useState(false);
  const [isPriorityType, setIsPriorityType] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const COUNT = 12;

  const approvedPostId = useDrawerState("approvedPostId");

  const { data, error, mutate, total } = usePosts({
    status: postStatus,
    text: search ? search : "",
    brand: brands,
    sortBy: sortBy,
    page: page,
    count: COUNT,
  });

  React.useEffect(() => {
    if (total !== 0) {
      setTotalPages(Math.ceil(total / COUNT));
    }
  }, [total]);

  React.useEffect(() => {
    mutate();
    console.log("MUTATE");
  }, [approvedPostId]);

  React.useEffect(() => {
    let isMounted = true;
    const fetchBrands = async () => {
      const brands = await getBrands();
      const options = brands.map((brand) => ({
        value: brand.id,
        label: brand.name,
      }));
      if (isMounted) {
        setBrandsSelectOptions(options);
      }
    };
    const fetchUser = async () => {
      const response = await getUsers();
      if (isMounted) {
        setUsers(response.data);
      }
    };

    fetchUser();
    fetchBrands();
    return () => (isMounted = false);
  }, []);

  React.useEffect(() => {}, [
    postStatus,
    search,
    sortBy,
    brands,
    isSoldType,
    isPriorityType,
    isExpired,
    approvedPostId,
  ]);

  // if (error) {
  //   return <div>Error! {error.message}</div>;
  // }

  function handleSort({ value }) {
    setSortByOption(value);
    setPage(1);

    if (value.length === 0) {
      setSortBy("");
    } else {
      setSortBy(value[0].value);
    }
  }

  function handleBrand({ value }) {
    setPage(1);
    setBrandOption(value);

    if (value.length === 0) {
      setBrands([]);
    } else {
      setBrands(value.map((item) => item.value));
    }
  }
  function handlePostStatus({ value }) {
    setPage(1);
    setPostStatusOption(value);

    if (value.length === 0) {
      setPostStatus("");
    } else {
      setPostStatus(value[0].value);
    }
  }
  function handleSearch(event) {
    setPage(1);
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function handlePostType({ value }) {
    setPostTypeOption(value);

    if (value.length === 0) {
      setPostType("");
    } else {
      setPostType(value[0].value);
    }
  }

  // function getUserAvatar(userId: number): string {
  //   const user = users.find((u) => u.id === userId);
  //   return user?.avatar;
  // }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={12} xs={12}>
              <Row>
                <Col md={4} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={2} xs={12}>
                  <Select
                    options={productStatusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={postStatusOption}
                    searchable={false}
                    onChange={handlePostStatus}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Select
                    options={brandSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Brands"
                    multi={true}
                    value={brandOption}
                    searchable={false}
                    onChange={handleBrand}
                  />
                </Col>

                <Col md={2} xs={12}>
                  <Select
                    options={sortSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={sortByOption}
                    placeholder="Sort"
                    searchable={false}
                    onChange={handleSort}
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          {totalPages !== 0 && (
            <Row style={{ margin: 0 }}>
              <Pagination page={page} total={totalPages} setPage={setPage} />
            </Row>
          )}

          <Row>
            {data ? (
              data.length !== 0 ? (
                <>
                  {data.map((item: any, index: number) => (
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      key={index}
                      style={{ margin: "15px 0" }}
                    >
                      <Fade bottom duration={800} delay={index * 10}>
                        <PostCard
                          title={item.title}
                          weight={item.unit}
                          image={item.main_image?.url}
                          // avatar={getUserAvatar(item.user_id)}
                          user={item.user}
                          currency={CURRENCY}
                          price={item.price_after_tax}
                          salePrice={0}
                          typeOfPost={item.type}
                          postId={item.id}
                          status={item.status}
                        />
                      </Fade>
                    </Col>
                  ))}
                </>
              ) : (
                <NoResult />
              )
            ) : (
              <LoaderWrapper>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            )}
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
