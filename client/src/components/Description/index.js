import React from 'react'

const Desc = (props) => {

    // const description = {

    //     img: '/images/featured/featured_home_3.jpg',
    //     lineOne: 'Up to 40% off',
    //     lineTwo: 'In second hand guitars',
    //     linkTitle: 'Shop now',
    //     linkTo: '/shop',

    // }

    const renderDesc = () => (
        props.mainText ?
            <div>
                {props.mainText}
            </div>
            : null
    )

    return (
        <div className="home_promotion">
            {renderDesc()}
        </div>
    )
}

export default Desc
