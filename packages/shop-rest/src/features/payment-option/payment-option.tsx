import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCardPayment from 'components/radio-card-payment/radio-card-payment';
import { ProfileContext } from 'contexts/profile/profile.context';
import { CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
interface Props {
    increment?: boolean;
    icon?: boolean;
    buttonProps?: any;
    flexStart?: boolean;
}

const options = [
    {
        id: '1',
        name: 'momo',
        type: 'primary', 
        info: "MOMO"
    },
    {
        id: "2",
        type: "secondary",
        name: "Home",
        info: "PAYPAL"
    }
]

const PaymentOptions = ({
    increment = false,
    flexStart = false,
    icon = false,
    buttonProps = {
        size: 'big',
        variant: 'outlined',
        type: 'button',
        className: 'add-button',
    },
}: Props) => {
    const { state, dispatch } = useContext(ProfileContext);
    
    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id='paymentOptions'
                    defaultMessage='Select Your payment options'
                />
            </CardHeader>
            <ButtonGroup flexStart={flexStart}>
                <RadioGroup
                    items={state.payments}
                    component={(item: any) => (
                        <RadioCardPayment
                            id={item.id}
                            key={item.id}
                            title={item.name}
                            content={item.info}
                            name='address'
                            checked={item.type === 'primary'}
                            onChange={() =>
                                dispatch({
                                    type: 'SET_PRIMARY_PAYMENT',
                                    payload: item.id.toString(),
                                })
                            }
                            hasEdit={false}
                            hasDelete={false}
                        />
                    )}
                />
            </ButtonGroup>
        </>
    );
};

export default PaymentOptions;
