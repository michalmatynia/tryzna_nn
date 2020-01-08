import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default class DropdownLanguage extends Component {

    state = {
        open: false,
        checked: []
    }

    componentDidMount() {
        // if(value.name)
console.log(this.props.site_lg.languages)

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
// {...this.props.site_lg.languages === value.name? 'selected' : null}
        <FormControl>
            <NativeSelect
                onChange={this.handleChange('age')}
                name="lang"
            >
                {this.props.lg_list ?
                    this.props.lg_list.map((value, i) => {
                    // <option value={value.id} key={i}  >{value.name} {this.props.site_lg.languages}</option>
                    if(this.props.site_lg.languages === value.name){
                        return <option value={value.id} key={i} selected >{value.name}</option>
                    } else {
                        return <option value={value.id} key={i} >{value.name}</option>
                    }
                    })
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

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }
}
