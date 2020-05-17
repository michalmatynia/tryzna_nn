import React from 'react';
import MyButton from '../../../../utils/button';

const ListNationsBlock = ({ list, removeItem, handleVisible }) => {

    const renderImage_Nation = (list) => {
        // console.log(list)
        if (list.flag !== undefined && list.flag.length > 0) {
            return list.flag
        } else {
            return '/images/image_not_availble.png'
        }
    }

    const renderItems = () => (

        list ?
            list.map((item, i) => (
                <div className="admin_list_block" key={item._id}>
                    <div className="item">
                        <div
                            className="image"
                            style={{ background: `url(${renderImage_Nation(item)}) no-repeat` }}
                        >

                        </div>
                    </div>
                    <div className="item">
                        <div>
                            {item.name}
                        </div>
                        <div>
                            {item.lineTwo}
                        </div>
                        <div>
                            Position {item.position}
                        </div>
                    </div>
                    <div className="item btn">
                        <div className="list_btn list_btn_remove"
                            onClick={() => removeItem(item._id)} >
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

export default ListNationsBlock;