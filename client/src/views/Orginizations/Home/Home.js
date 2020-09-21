import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { dashboard } from '../../../config/apis'
import Grid from '@material-ui/core/Grid';
import OrgTile from '../../../components/Organization'

import { withRouter, useParams } from 'react-router-dom';
import ReactAvatarEditor from 'react-avatar-editor'
const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, root: {
        flexGrow: 1,
        margin: '10px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        minWidth: 275,
        margin: '5px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    canvasavatar: {
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contentContainer: {},
    content: {
        height: 'calc(100vh - 1530px)',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    cover: {
        height: '75px',
        objectFit: 'fill'
    },
    container: {
        margin: 'auto',
        height: 'calc(100vh - 214px)',
        padding: '10px',
    },
    one: {
        width: '25%',
        height: 'calc(100vh - 214px)',
        float: 'left',
        overflow: 'auto'
    },
    two: {
        marginLeft: '15%',
        height: 'calc(100vh - 214px)',
        overflow: 'auto',
        backgroundColor: '#FAFAFFA'
    }, twoNoMargin: {
        height: 'calc(100vh - 264px)',
        overflow: 'auto',
        direction: 'ltr',
        backgroundColor: '#a2a4a6',
    },
});
let jwt;
const apiServer = window.api;

class Home extends React.Component {

    state = {
        Profile: null,
        image: 'avatar.jpg',
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 300,
        height: 300,
    }

    componentDidMount() {
        const apiServer = window.api;
        jwt = this.getCookie("jwt");
        console.log(jwt)
        this._loadAsyncData();

    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    render() {
        console.log(this.props)
        const Organizations = JSON.parse(sessionStorage.getItem('user')).organizations.find(element => element.id == this.props.match.params.id)
        console.log(Organizations)
        const { classes } = this.props;
        if (this.state.org) {
            return (
                <div className={classes.root}>

                    {/* {this.state.org.picURI != undefined && <Grid container spacing={2}>
                        <Grid item xs={12} s={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <img className={classes.cover} src={this.state.org.picURI}></img>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>} */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} s={5} md={5} lg={3}>
                            <Card>
                                <CardContent >
                                    <OrgTile org={Organizations}>

                                    </OrgTile>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={7} lg={5}>
                            <Card>
                                <CardContent>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div >
            )
        } else {
            return (<h1>loading</h1>)
        }
    }
    _loadAsyncData() {
        dashboard.post(`/getOrg`, { orgID: this.props.match.params.id }, { headers: { jwt: this.getCookie('jwt') } }).then((org) => {
            console.log('test')
            console.log(org.data);
            this.setState({ org: org.data })
        })
        // this.setState({ Profile: JSON.parse(sessionStorage.getItem('user')) })
    }
}
export default withRouter(withStyles(useStyles)(Home));
