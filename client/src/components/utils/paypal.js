import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

// Sandbox Client Account
// sb-47ccz4746679@personal.example.com
// mlokos666

class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {

            // console.log('here')
            // console.log(JSON.stringify(this.props));
            this.props.onSuccess(payment)
            console.log(this.props)
            // {"paid":true,"cancelled":false,"payerID":"ABGY3QYXYSGXW","paymentID":"PAYID-LYATHYY4JL19832UU903763U","paymentToken":"EC-2KK06239KY5733522","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LYATHYY4JL19832UU903763U&token=EC-2KK06239KY5733522&PayerID=ABGY3QYXYSGXW","address":{"recipient_name":"John Doe","line1":"Free Trade Zone","city":"Dublin","state":"","postal_code":"353","country_code":"IE"},"email":"sb-47ccz4746679@personal.example.com"}
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            console.log(JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'EUR';
        let intent = 'authorize';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AVsJeHdNMKRNrDL-WA6GwlqnkOmvPi74AFuzUQv-Al9KcOek4grq3c6x9DX6CjChvLV-S6nyb0sqeVu6',
            production: 'AcwYkyE_4TIDQmTNgCKxJqOT4XiHSxUSKdey6bBiCH_Q-AlrjXWxtjlJ5SSPFPsX9_p5BeJfZirPfbQS'
        }
        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    intent={intent}

                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}


                />
            </div>
        )
    }
}

export default Paypal
