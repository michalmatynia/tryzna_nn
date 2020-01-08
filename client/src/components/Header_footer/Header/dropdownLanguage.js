import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { setLocalisation } from '../../../redux/actions/user_actions';
import { connect } from 'react-redux';

class DropdownLanguage extends Component {

    state = {
        open: false,
        checked: []    }

        componentDidUpdate(){
           // console.log(this.props)
        }
    componentDidMount() {
        // if(value.name)
        

        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    renderList = () => (

        <FormControl>
            <NativeSelect
                // onChange={(value)=>this.handleChange(value)}
                // name="lang"
                // value={this.state.age}
                defaultValue={this.props.site_lg}
                onChange={e => this.handleChange(e.target.value)}
            // onChange={this.handleChange('age')}
            // name="age"
            // inputProps={{
            //   id: 'name-native-error',
            // }}
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

    handleToggle = value => () => {
        const checked = this.state.checked;
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({
            checked: newChecked
        }, () => {
            this.props.handleFilters(newChecked)
        })

    }

    handleChange = event => {

        // this.setState({
        //     ...this.state,
        //     [name]: event.target.value,
        //   });
        console.log(event)

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