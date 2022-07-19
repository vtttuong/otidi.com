import { FormattedMessage } from "react-intl";

export const unitOptions = [
  { index: 0, key: "unit", value: "VND", label: "VND" },
  { index: 1, key: "unit", value: "USD", label: "USD" },
];

export const postType = [
  {
    index: 0,
    key: "type",
    value: "sell",
    label: <FormattedMessage id="sell" />,
  },
  {
    index: 1,
    key: "type",
    value: "buy",
    label: <FormattedMessage id="buy" />,
  },
];

export const statusOptions = [
  {
    index: 0,
    key: "postStatus",
    value: "unused",
    label: <FormattedMessage id="newStatus" />,
  },
  {
    index: 1,
    key: "postStatus",
    value: "used",
    label: <FormattedMessage id="oldStatus" />,
  },
];
export const fuelOptions = [
  {
    id: 0,
    value: "gasoline",
    label: <FormattedMessage id="fuelOption" />,
  },
  {
    id: 1,
    value: "diesel",
    label: <FormattedMessage id="dieselOption" />,
  },
  {
    id: 2,
    value: "electric",
    label: <FormattedMessage id="electricOption" />,
  },
  {
    id: 3,
    value: "hybrid",
    label: <FormattedMessage id="hybridFuelOption" />,
  },
  {
    id: 4,
    value: "other",
    label: <FormattedMessage id="otherOption" />,
  },
];

export const gearOptions = [
  {
    id: 0,
    value: "manual",
    label: <FormattedMessage id="manualOption" />,
  },
  {
    id: 1,
    value: "automatic",
    label: <FormattedMessage id="automaticOption" />,
  },
  {
    id: 2,
    value: "hybrid",
    label: <FormattedMessage id="hybridGearOption" />,
  },
];
export const originOptions = [
  {
    id: 0,
    value: "inland",
    label: <FormattedMessage id="inland" defaultMessage="Inland" />,
  },
  {
    id: 1,
    value: "import",
    label: <FormattedMessage id="import" defaultMessage="Imported" />,
  },
];
