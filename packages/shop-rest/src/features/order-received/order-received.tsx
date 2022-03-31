import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  BlockTitle,
  Text,
  ListItem,
  ListTitle,
  ListDes,
} from './order-received.style';
import { FormattedMessage } from 'react-intl';
import { numberWithCommas } from "utils/formatNumber";

type OrderReceivedProps = {};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {
  const router = useRouter();
  const { query } = router;

  return (
    <OrderReceivedWrapper>
      <OrderReceivedContainer>
        <Link href="/profile">
          <a className="home-btn">
            <FormattedMessage id="backProfileBtn"/>
          </a>
        </Link>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage id="paymentSubscriptionText" />
          </BlockTitle>

          <Text>
            <FormattedMessage id="paymentSubscriptionSuccess"  />
          </Text>
        </OrderInfo>

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage id="orderDetailsText" />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="billCode" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{query.orderId}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="amount" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{numberWithCommas(query.amount)}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="paymentInfo" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{query.orderInfo}{' '}<FormattedMessage id="paymentType" /></Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeText"
                  defaultMessage="Order Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{query.responseTime}</Text>
            </ListDes>
          </ListItem>
        </OrderDetails>
      </OrderReceivedContainer>
    </OrderReceivedWrapper>
  );
};

export default OrderReceived;
