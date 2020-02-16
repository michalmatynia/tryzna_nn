import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { setLocalisation } from '../../../redux/actions/user_actions';
import { connect } from 'react-redux';

class DropdownLanguage extends Component {


    renderList = () => (

        <FormControl>
            <NativeSelect
                defaultValue={this.props.site_lg}
                onChange={e => this.handleChange(e.target.value)}
            >
                {this.props.lg_list ?
                    this.props.lg_list.map((value, i) => (
                        <option
                            value={value.name}
                            key={i}
                        // onChange={this.handleChange('checkedA')}
                        >{value.name}</option>

                    ))
                    : null}
            </NativeSelect>
        </FormControl>
    )


    handleChange = event => {

        this.props.dispatch(setLocalisation(event))

    };

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(DropdownLanguage);