import { closeModal, openModal } from "@redq/reuse-modal";
import { FilterIcon } from "assets/icons/Filter";
import FilterModal from "features/filter-modal";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { usePosition } from "use-position";
import Geocode from "react-geocode";
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

import { ButtonFilter, Col, Container, Row } from "./filter.style";
import { Map } from "assets/icons/Map";

const customStyles = {
  control: () => ({
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

  indicatorsContainer: () => ({
    position: "absolute",
    width: 50,
    height: 40,
    top: 2,
    right: -5,
  }),
};

const postType = [
  {
    key: "type",
    value: "created_at",
    label: <FormattedMessage id="lasted" />,
  },
  { key: "type", value: "like", label: <FormattedMessage id="hotNews" /> },
];

const Filter: React.FC<any> = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [address, setAddress] = React.useState("");
  const [lat, setLat] = React.useState<number>();
  const [long, setLong] = React.useState<number>();
  const watch = true;
  const { type } = query;

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

  const handleSortData = async (value) => {
    let queryParams = {
      category: query.category,
      sort: value,
      postType: query.postType,
      daysAgo: query.daysAgo,
      radius: query.radius,
      latitude: query.latitude,
      longitude: query.longitude,
    };
    let newParams = {};
    Object.keys(queryParams).map((key) => {
      if (typeof queryParams[key] !== "undefined" && queryParams[key] != "") {
        newParams[key] = queryParams[key];
      }
    });
    if (query.text && type) {
      newParams["text"] = query.text;
      router.push(
        {
          pathname,
          query: {
            ...newParams,
          },
        },
        {
          pathname: `/${type}`,
          query: {
            ...newParams,
          },
        }
      );
    } else if (!query.text && type) {
      router.push(
        {
          pathname,
          query: {
            ...newParams,
          },
        },
        {
          pathname: `/${type}`,
          query: {
            ...newParams,
          },
        }
      );
    } else {
      router.push({
        pathname,
        query: {
          ...newParams,
        },
      });
    }
  };
  const { latitude, longitude } = usePosition(watch, {
    enableHighAccuracy: true,
  });
  if (latitude && longitude) {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        setLat(latitude);
        setLong(longitude);
        setAddress(response.results[0].formatted_address);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  return (
    <form style={{ position: "relative", zIndex: 100 }}>
      <Container>
        <Row>
          <Col xs={12} sm={6} md={6} lg={8} className="address">
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
          </Col>
          <Col xs={6} sm={3} md={3} lg={2}>
            <Select
              classNamePrefix="filter"
              styles={customStyles}
              options={postType}
              defaultValue={postType[0]}
              onChange={({ value }) => handleSortData(value)}
            />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Filter;
