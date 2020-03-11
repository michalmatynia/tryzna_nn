import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ListMenuBlock = ({ list, removeItem, handlePublish }) => {


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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.publish}
                                    onClick={() => handlePublish(item._id, item.publish)}
                                    color="primary"
                                />
                            }
                            label={item.publish ? "On" : "Off"}
                            size="small"
                            labelPlacement="top"
                        />
                        <a href={`/admin/edit_menu/${item._id}`}>
                            <div className="list_btn list_btn_edit"
                            >
                                Edit
                </div></a>
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