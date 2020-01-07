import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      capitalize: true,
      color: 'white'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  export default function DropdownLanguage2() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  

  
    const handleChange = name => event => {
      setState({
        ...state,
        [name]: event.target.value,
      });
    };
  
    return (
        <div>
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={state.age}
              onChange={handleChange('age')}
              inputProps={{
                name: 'age',
                id: 'age-native-helper',
              }}
            >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
        </div>
      );
    }
// export default class DropdownLanguage extends Component {

//     state = {
//         open: false,
//         checked: []
//     }

//     componentDidMount() {
//         if (this.props.initState) {
//             this.setState({
//                 open: this.props.initState
//             })
//         }
//     }

//     handleClick = () => {
//         this.setState({ open: !this.state.open })
//     }

//     renderList = () => (
        
//         <FormControl classes={   
//               {root:{color:'white'}}
//           } >
//                         <NativeSelect 
//                             onChange={this.handleChange('age')}
//                             name="lang"
//                         >
//         {this.props.lg_list ?
//                     this.props.lg_list.map((value) => (
//                         <option value={value.id}>{value.name}</option>
                        
//             ))
//             : null}
//             </NativeSelect>
//                     </FormControl>
//     )

//     handleToggle = value => () => {
//         const checked = this.state.checked;
//         const currentIndex = checked.indexOf(value)
//         const newChecked = [...checked];

//         if (currentIndex === -1) {
//             newChecked.push(value)
//         } else {
//             newChecked.splice(currentIndex, 1)
//         }

//         this.setState({
//             checked: newChecked
//         }, () => {
//             this.props.handleFilters(newChecked)
//         })

//     }

//     handleChange = name => event => {
//         this.setState({
//           ...this.state,
//           [name]: event.target.value,
//         });
//       };

//     render() {
//         return (
//             <div>
//                 {this.renderList()}
//             </div>
//         )
//     }
// }
