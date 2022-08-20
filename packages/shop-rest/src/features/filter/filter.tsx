import { closeModal, openModal } from "@redq/reuse-modal";
import { FilterIcon } from "assets/icons/Filter";
import FilterModal from "features/filter-modal";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { usePosition } from "use-position";
import Geocode from "react-geocode";
import { ButtonFilter, Col, Container, Row } from "./filter.style";
import { Map } from "assets/icons/Map";
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const customStyles = {
  control: () => ({
    display: "flex",
    border: 1,
    borderRadius: 5,
    padding: 3,
    background: "#FFFFFF",
    color: "#3c3e3e",
    height: 40,

    "&:hover": {
      borderColor: "#009E7F",
      cursor: "pointer",
    },
  }),

  // indicatorsContainer: () => ({
  //   position: "absolute",
  //   width: 50,
  //   height: 40,
  //   top: 2,
  //   right: -5,
  // }),
};

const orderByOptions = [
  {
    key: "sort",
    value: "created_at",
    label: <FormattedMessage id="lasted" />,
  },
  {
    key: "sort",
    value: "views",
    label: <FormattedMessage id="hotNews" />,
  },
  {
    key: "sort",
    value: "price_after_tax",
    label: <FormattedMessage id="price" />,
  },
];

const dirOptions = [
  {
    key: "dir",
    value: "asc",
    label: <FormattedMessage id="asc" defaultMessage="Ascending" />,
  },
  {
    key: "dir",
    value: "desc",
    label: <FormattedMessage id="desc" defaultMessage="Descending" />,
  },
];

const Filter: React.FC<any> = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [address, setAddress] = React.useState("");
  const [lat, setLat] = React.useState<number>();
  const [long, setLong] = React.useState<number>();
  const watch = true;

  const clMOdal = () => {
    closeModal();
  };
  const handleFilter = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: FilterModal,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        maxWidth: "500px",
        height: "auto",
        width: "90%",
      },
      componentProps: { clModal: clMOdal, latitude: lat, longitude: long },
    });

    // localStorage.setItem("isShowModal", "true");
  };

  const handleSortData = async (e, field) => {
    console.log(e);

    let queryParams = {
      ...query,
      [field]: e ? e.value : "",
    };

    let newParams = {};
    Object.keys(queryParams).map((key) => {
      if (typeof queryParams[key] !== "undefined" && queryParams[key] != "") {
        newParams[key] = queryParams[key];
      }
    });

    router.push({
      pathname,
      query: {
        ...newParams,
      },
    });
  };
  // const { latitude, longitude } = usePosition(watch, {
  //   enableHighAccuracy: true,
  // });
  // if (latitude && longitude) {
  //   Geocode.fromLatLng(latitude, longitude).then(
  //     (response) => {
  //       setLat(latitude);
  //       setLong(longitude);
  //       setAddress(response.results[0].formatted_address);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  return (
    <form style={{ position: "relative", zIndex: 100 }}>
      <Container>
        <Row>
          {/* <Col xs={12} sm={6} md={6} lg={8} className="address">
            {address != "" ? (
              <>
                <Map />
                <span>{address}</span>
              </>
            ) : (
              <>
                <Map />
                <span>{"Không tìm thấy địa chỉ !"}</span>
              </>
            )}
          </Col>

          <Col xs={6} sm={3} md={3} lg={2}>
            <ButtonFilter onClick={handleFilter}>
              <FormattedMessage id="filterButton" />
              <FilterIcon />
            </ButtonFilter>
          </Col> */}
          <Col xs={6} sm={4} md={4} lg={4}>
            <Select
              classNamePrefix="filter"
              styles={customStyles}
              options={orderByOptions}
              isClearable={true}
              isSearchable={true}
              placeholder={
                <FormattedMessage id="orderBy" defaultMessage={"Order by..."} />
              }
              value={
                orderByOptions.filter(
                  (option) => option.value === query.sort
                )[0]
              }
              onChange={(e) => handleSortData(e, "sort")}
            />
          </Col>

          <Col xs={6} sm={3} md={3} lg={3}>
            <Select
              classNamePrefix="filter"
              styles={customStyles}
              options={dirOptions}
              isClearable={true}
              isSearchable={true}
              placeholder={
                <FormattedMessage id="dir" defaultMessage={"Order"} />
              }
              value={
                dirOptions.filter((option) => option.value === query.dir)[0]
              }
              onChange={(e) => handleSortData(e, "dir")}
            />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Filter;
