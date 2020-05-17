import React from 'react';
import MyButton from '../../../../utils/button';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ListSlidesBlock = ({ list, removeItem, handleVisible }) => {

    const renderImage_Slide = (list) => {
        // console.log(list)
        if (list.images.length > 0) {
            return list.images[0].url
        } else {
            return '/images/image_not_availble.png'
        }
    }

    const renderItems = () => (

        list ?
            list.map((slide, i) => (
                <div className="admin_list_block" key={slide._id}>
                    <div className="item">
                        <div
                            className="image"
                            style={{ background: `url(${renderImage_Slide(slide)}) no-repeat` }}
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
                        <div>
                            Position {slide.position}
                        </div>
                    </div>
                    <div className="item btn">
                        <MyButton
                            type="default"
                            altClass="card_link"
                            title="Edit"
                            linkTo={`/admin/edit_slide/${slide._id}`}
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={slide.visible}
                                    // onChange={handleChange('checkedA')}
                                    onClick={() => handleVisible(slide._id, slide.visible)}
                                    // value="checkedA"
                                    // inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    color="primary"
                                />
                            }
                            label={slide.visible ? "On" : "Off"}
                            size="small"
                            labelPlacement="top"
                        />
                        <div className="list_btn list_btn_remove"
                            onClick={() => removeItem(slide._id)} >
                            Remove
                </div>
                    </div>
                </div >
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