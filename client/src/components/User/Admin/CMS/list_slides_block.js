import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';

const ListSlidesBlock = (props, { removeItem }) => {

    console.log(props)

    const [publish, setPublish] = useState({
        checkedA: true,
        checkedB: true,
    })


    const handleChange = name => event => {
console.log('here')

        setPublish({ ...publish, [name]: event.target.checked });
    };

    const renderSlideImage = (list) => {

        // console.log(list)
        if (list.images.length > 0) {
            return list.images[0].url
        } else {
            return '/images/image_not_availble.png'

        }
    }


    // const test = () => {
    //     console.log(list)
    // }

    const renderItems = () => (


        props.list ?
            props.list.map((slide, i) => (
                <div className="admin_list_block" key={slide._id}>
                    <div className="item">
                        <div
                            className="image"
                            style={{ background: `url(${renderSlideImage(slide)}) no-repeat` }}
                        >

                        </div>
                    </div>
                    <div className="item">
                        <div>
                            {slide.lineOne}
                        </div>
                        <div>
                            {slide.lineTwo}
                        </div>
                    </div>
                    <div className="item btn">
                        <Switch
                            checked={publish.checkedA}
                            // onChange={handleChange('checkedA')}
                            onClick={() => handleChange('checkedA')}
                            value="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            color="primary"
                        />
                        <div className="list_btn list_btn_edit"
                            onClick={() => removeItem(slide._id)} >
                            Edit
                </div>
                        <div className="list_btn list_btn_remove"
                            onClick={() => removeItem(slide._id)} >
                            Remove
                </div>
                    </div>
                </div>
            ))
            : null
    )

    return (

        <div>
            {renderItems()}
        </div>
    );
}

export default ListSlidesBlock;