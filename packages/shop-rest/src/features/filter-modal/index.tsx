import { Option } from "components/option/option";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Container, Divider, Heading, Wrapper } from "./form.style";
const lists = [
  {
    id: 1,
    title: <FormattedMessage id="lasted" />,
    value: "created_at",
    source: "https://www.flaticon.com/svg/static/icons/svg/628/628586.svg",
    type: 1,
  },
  {
    id: 2,
    title: <FormattedMessage id="hotNews" />,
    value: "like",
    source: "https://www.flaticon.com/svg/static/icons/svg/2995/2995973.svg",
    type: 1,
  },
];

const listsRange = [
  {
    id: 5,
    title: "< 3 Km",
    value: 3,
    source: "https://www.flaticon.com/svg/static/icons/svg/927/927667.svg",
    type: 3,
  },
  {
    id: 6,
    title: "< 5 Km",
    value: 5,
    source: "https://www.flaticon.com/svg/static/icons/svg/927/927667.svg",
    type: 3,
  },
  {
    id: 7,
    title: "< 10 Km",
    value: 10,
    source: "https://www.flaticon.com/svg/static/icons/svg/927/927667.svg",
    type: 3,
  },
];

const listsTime = [
  {
    id: 8,
    value: "3",
    source: "https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg",
    type: 4,
  },
  {
    id: 9,
    value: "5",
    source: "https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg",
    type: 4,
  },
  {
    id: 10,
    value: "7",
    source: "https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg",
    type: 4,
  },
  {
    id: 11,
    value: "10",
    source: "https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg",
    type: 4,
  },
];

const listsBuy = [
  {
    id: 3,
    title: <FormattedMessage id="filterBuy" />,
    value: "buy",
    source: "https://www.flaticon.com/svg/static/icons/svg/2922/2922815.svg",
    type: 2,
  },
  {
    id: 4,
    title: <FormattedMessage id="filterSell" />,
    value: "sell",
    source: "https://www.flaticon.com/svg/static/icons/svg/2897/2897967.svg",
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

    const { type } = query;
    const category = query.category;

    let queryParams = {
      category: category,
      sort: sortBy,
      postType: postType,
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
