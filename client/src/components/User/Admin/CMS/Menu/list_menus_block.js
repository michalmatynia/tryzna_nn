import React from 'react';
import MyButton from '../../../../utils/button';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ListMenuBlock = ({ list, removeItem, handleVisible }) => {


    const renderItems = () => (

        list ?
            list.map((item, i) => (
                <div className="admin_list_block" key={item._id}>
                    <div className="item">
                        <div>
                            {item.position}
                        </div>
                        <div>
                            {item.name}
                        </div>
                        <div>{item.level}</div>
                    </div>
                    <div className="item btn">
                        <MyButton
                            type="default"
                            altClass="card_link"
                            title="Edit"
                            linkTo={`/admin/edit_menu/${item._id}`}
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.visible}
                                    onClick={() => handleVisible(item._id, item.visible)}
                                    color="primary"
                                />
                            }
                            label={item.visible ? "On" : "Off"}
                            size="small"
                            labelPlacement="top"
                        />

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

export default ListMenuBlock;