import {styled, withStyle} from "baseui";
import {Col as Column, Grid, Row as Rows} from "components/FlexBox/FlexBox";
import Input from "components/Input/Input";
import NoResult from "components/NoResult/NoResult";
import Placeholder from "components/Placeholder/Placeholder";
import ProductCard from "components/ProductCard/ProductCard";
import Select from "components/Select/Select";
import {Header} from "components/Wrapper.style";
import {useDrawerDispatch, useDrawerState} from "context/DrawerContext";
import React, {useState} from "react";
import Fade from "react-reveal/Fade";
import {getBrands} from "service/use-brands";
import {CURRENCY} from "settings/constants";
import useProducts from "../../service/use-products";

export const ProductsRow = styled("div", ({$theme}) => ({
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
  {value: "active", label: "Active"},
  {value: "approving", label: "Waiting approve"},
  {value: "reported", label: "Reported"},
  {value: "expired", label: "Expired"},
  {value: "isSold", label: "Sold"},
  {value: "isPriority", label: "Priority"},
  {value: "deactive", label: "Blocked"},
];

const sortSelectOptions = [
  {value: "lasted", label: "Lasted"},
  {value: "oldest", label: "Oldest"},
];

const typeSelectOptions = [
  {value: "sell", label: "Sell"},
  {value: "buy", label: "Buy"},
];

type ProductsProps = {
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
};
export default function Posts() {
  const [brandSelectOptions, setBrandsSelectOptions] = useState([]);

  const [postStatusOption, setPostStatusOption] = useState({});
  const [brandOption, setBrandOption] = useState({});
  const [sortByOption, setSortByOption] = useState({});
  const [postTypeOption, setPostTypeOption] = useState({});

  const [search, setSearch] = useState("");
  const [postType, setPostType] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isSoldType, setIsSoldType] = useState(false);
  const [isPriorityType, setIsPriorityType] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const approvePostId = useDrawerState("approvedPostId");
  const dispatch = useDrawerDispatch();

  const {data, error} = useProducts({
    postType: postType,
    status: postStatus,
    text: search ? search : "",
    dir: sortBy === "lasted" ? "desc" : "asc",
    brand: brand,
    isSold: isSoldType,
    isPriority: isPriorityType,
    isExpired: isExpired,
  });

  let posts = data;

  React.useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands();
      const options = brands.map((brand) => ({
        value: brand.id + "",
        label: brand.name,
      }));
      setBrandsSelectOptions(options);
    };
    fetchBrands();
  }, []);

  React.useEffect(() => {
    if (approvePostId != null) {
      const index = posts.findIndex((item) => item.id === approvePostId);
      posts.splice(index, 1);

      dispatch({
        type: "SAVE_APPROVE_POST_ID",
        data: null,
      });
    }
  }, [approvePostId, dispatch, posts]);

  React.useEffect(() => {}, [
    postStatus,
    search,
    sortBy,
    brand,
    isSoldType,
    isPriorityType,
    isExpired,
  ]);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleSort({value}) {
    setSortByOption(value);

    if (value.length === 0) {
      setSortBy("");
    } else {
      setSortBy(value[0].value);
    }
  }
  function handleBrand({value}) {
    setBrandOption(value);

    if (value.length === 0) {
      setBrand("");
    } else {
      setBrand(value[0].value);
    }
  }
  function handlePostStatus({value}) {
    setPostStatusOption(value);

    if (value.length === 0) {
      setPostStatus("");
      setIsExpired(false);
      setIsSoldType(false);
      setIsPriorityType(false);
    } else {
      if (value[0].value === "expired") {
        setIsExpired(true);
      } else if (value[0].value === "isSold") {
        setIsSoldType(true);
      } else if (value[0].value === "isPriority") {
        setIsPriorityType(true);
      } else {
        setPostStatus(value[0].value);
      }
    }
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function handlePostType({value}) {
    setPostTypeOption(value);

    if (value.length === 0) {
      setPostType("");
    } else {
      setPostType(value[0].value);
    }
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{marginBottom: 15}}>
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
                    options={typeSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Type"
                    value={postTypeOption}
                    searchable={false}
                    onChange={handlePostType}
                  />
                </Col>

                <Col md={2} xs={12}>
                  <Select
                    options={productStatusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Filter"
                    value={postStatusOption}
                    searchable={false}
                    onChange={handlePostStatus}
                  />
                </Col>
                <Col md={2} xs={12}>
                  <Select
                    options={brandSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Brand"
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

          <Row>
            {posts ? (
              posts.length !== 0 ? (
                posts.map((item: any, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{margin: "15px 0"}}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={item.title}
                        weight={item.unit}
                        image={item.main_img_url}
                        avatar={item.user?.avatar_img_url}
                        currency={CURRENCY}
                        price={item.price}
                        salePrice={0}
                        typeOfPost={item.type}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
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
