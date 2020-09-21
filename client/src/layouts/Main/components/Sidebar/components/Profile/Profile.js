import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  console.log(props)
  // const user = {
  //   name: 'Robert Baden-Powell',
  //   avatar: '/images/avatars/avatar_default.png',
  //   bio: 'First Chief Scout'
  // };

  return (
    < div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        size="150"
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={JSON.parse(sessionStorage.getItem('user')).picURI}
        to="/profile"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {props.user.first}
      </Typography>
      <Typography variant="body2">{props.user.last}</Typography>
    </div >
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
