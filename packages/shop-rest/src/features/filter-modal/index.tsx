import { Option } from "components/option/option";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Container, Divider, Heading, Wrapper } from "./form.style";
import locationIcon from "../../assets/icons/icon/Location.svg";
import cartIcon from "../../assets/icons/icon/Cart.svg";
import clockIcon from "../../assets/icons/icon/Clock.svg";
import newIcon from "../../assets/icons/icon/New.svg";
import likeIcon from "../../assets/icons/icon/Like.svg";
import saleIcon from "../../assets/icons/icon/Sale.svg";
const lists = [
  {
    id: 1,
    title: <FormattedMessage id="lasted" />,
    value: "created_at",
    source: newIcon,
    type: 1,
  },
  {
    id: 2,
    title: <FormattedMessage id="hotNews" />,
    value: "views",
    source: likeIcon,
    type: 1,
  },
];

const listsRange = [
  {
    id: 5,
    title: "< 3 Km",
    value: 3,
    source: locationIcon,
    type: 3,
  },
  {
    id: 6,
    title: "< 5 Km",
    value: 5,
    source: locationIcon,
    type: 3,
  },
  {
    id: 7,
    title: "< 10 Km",
    value: 10,
    source: locationIcon,
    type: 3,
  },
];

const listsTime = [
  {
    id: 8,
    value: "3",
    source: clockIcon,
    type: 4,
  },
  {
    id: 9,
    value: "5",
    source: clockIcon,
    type: 4,
  },
  {
    id: 10,
    value: "7",
    source: clockIcon,
    type: 4,
  },
  {
    id: 11,
    value: "10",
    source: clockIcon,
    type: 4,
  },
];

const listsBuy = [
  {
    id: 3,
    title: <FormattedMessage id="filterBuy" />,
    value: "buy",
    source: cartIcon,
    type: 2,
  },
  {
    id: 4,
    title: <FormattedMessage id="filterSell" />,
    value: "sell",
    source: saleIcon,
    type: 2,
  },
];
type filterProps = {
  clModal?: () => void;
  latitude?: number;
  longitude?: number;
};
const FilterModal: React.FC<filterProps> = ({
  clModal,
  latitude,
  longitude,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("");
  const [postType, setPostType] = React.useState("");
  const [radius, setRadius] = React.useState(0);
  const [daysAgo, setDaysAgo] = React.useState("");
  const { pathname, query } = router;

  async function filterCallback() {
    setLoading(true);

    let queryParams = {
      ...query,
      sort: sortBy,
      daysAgo: daysAgo,
    };

    let newParams = {};
    Object.keys(queryParams).map((key) => {
      if (typeof queryParams[key] !== "undefined" && queryParams[key] != "") {
        newParams[key] = queryParams[key];
      }
    });

    if (radius > 0) {
      newParams["radius"] = radius;
      newParams["latitude"] = latitude;
      newParams["longitude"] = longitude;
    }

    router.push({
      pathname,
      query: {
        ...newParams,
      },
    });

    clModal();
  }

  function changeChoose(list) {
    if (list.type == 1) {
      let foundIndex = [];
      let index = foundIndex.indexOf(list.id);

      setSortBy(list.value);

      if (index < 0) {
        foundIndex.push(list.id);
      } else {
        foundIndex.splice(index, 1);
      }
    }

    if (list.type == 2) {
      let foundIndex2 = [];
      let index2 = foundIndex2.indexOf(list.id);
      setPostType(list.value);

      if (index2 < 0) {
        foundIndex2.push(list.id);
      } else {
        foundIndex2.splice(index2, 1);
      }
    }

    if (list.type == 3) {
      let foundIndex = [];
      let index = foundIndex.indexOf(list.id);
      setRadius(list.value);

      if (index < 0) {
        foundIndex.push(list.id);
      } else {
        foundIndex.splice(index, 1);
      }
    }

    if (list.type == 4) {
      let foundIndex = [];
      let index = foundIndex.indexOf(list.id);

      setDaysAgo(list.value);

      if (index < 0) {
        foundIndex.push(list.id);
      } else {
        foundIndex.splice(index, 1);
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="filter" />
        </Heading>

        <form onSubmit={filterCallback} style={{ marginBottom: 30 }}>
          <Divider>
            <span style={{ color: "#019376", fontSize: 18 }}>
              <FormattedMessage id="sortBy" />
            </span>
          </Divider>
          {lists.map(function (list) {
            return (
              <Option
                key={list.id}
                source={list.source}
                title={list.title}
                onClick={() => changeChoose(list)}
                checked={sortBy == list.value}
              />
            );
          })}

          <Divider>
            <span style={{ color: "#019376", fontSize: 18 }}>
              <FormattedMessage id="youWant" />
            </span>
          </Divider>
          {listsBuy.map(function (list) {
            return (
              <Option
                key={list.id}
                source={list.source}
                title={list.title}
                onClick={() => changeChoose(list)}
                checked={postType == list.value}
              />
            );
          })}

          <Divider>
            <span style={{ color: "#019376", fontSize: 18 }}>
              <FormattedMessage id="range" />
            </span>
          </Divider>
          {listsRange.map(function (list) {
            return (
              <Option
                key={list.id}
                source={list.source}
                title={list.title}
                onClick={() => changeChoose(list)}
                checked={radius == list.value}
              />
            );
          })}
          <Divider>
            <span style={{ color: "#019376", fontSize: 18 }}>
              <FormattedMessage id="createdAt" />
            </span>
          </Divider>
          {listsTime.map(function (list) {
            return (
              <Option
                key={list.id}
                source={list.source}
                onClick={() => changeChoose(list)}
                checked={daysAgo == list.value}
                valueDay={list.value}
              />
            );
          })}
        </form>

        <Button
          variant="primary"
          size="big"
          style={{ width: "100%" }}
          loading={loading}
          onClick={() => filterCallback()}
        >
          <FormattedMessage id="applyFilter" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default FilterModal;
