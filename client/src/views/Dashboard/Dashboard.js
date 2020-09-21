import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const apiServer = window.api;

class Dashboard extends React.Component {
  componentDidMount() {
    const apiServer = window.api;
  }
  render() {
    const { classes } = this.props;
    if (((this.state.SelectedConv === null) || (this.state.Convs === null))) {
      return (<h1>loading</h1>)
    } else {
      return (<h1>loading</h1>)
    }
  }
}
export default (withStyles(useStyles)(Dashboard));
