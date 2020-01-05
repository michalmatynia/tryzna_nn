import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ListSlidesBlock = ({ list, removeItem, handlePublish }) => {

    // const [publish, setPublish] = useState({
    //     checkedA: true,
    //     checkedB: true,
    // })


    // const handleChange = name => event => {

    //     setPublish({ ...publish, [name]: event.target.checked });
    // };

    const renderSlideImage = (list) => {
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={slide.publish}
                                    // onChange={handleChange('checkedA')}
                                    onClick={() => handlePublish(slide._id, slide.publish)}
                                    // value="checkedA"
                                    // inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    color="primary"
                                />
                            }
                            label={slide.publish ? "Published" : "Unpublished"}
                            size="small"
                            labelPlacement="top"
                        />
                        <a href={`/admin/edit_slide/${slide._id}`}>
                            <div className="list_btn list_btn_edit"
                            >
                                Edit
                </div></a>
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