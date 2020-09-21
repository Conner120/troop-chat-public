import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ChatList, MessageList, Input } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import createAvatarComponent from 'react-avatar/es/avatar';
import Value from 'react-avatar/es/sources/Value';
import { Typography } from '@material-ui/core';
import { CookiesProvider } from 'react-cookie';
import { chat } from '../../config/apis'

const useStyles = theme => ({
  card: {
    minWidth: 275,
    margin: '0px',
    padding: '0px'
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  cardcont: {
    padding: '0px'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: 'calc(100vh - 90px)',
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
  container: {
    margin: 'auto',
    height: 'calc(100vh - 90px)',
    // padding: '10px',
  },
  one: {
    width: '25%',
    height: 'calc(100vh - 90px)',
    float: 'left',
    overflow: 'auto'
  },
  two: {
    // marginLeft: '15%',
    height: 'calc(100vh - 90px)',
    overflow: 'auto',
    backgroundColor: '#FAFAFFA'
  }, twoNoMargin: {
    height: 'calc(100vh - 200px)',
    overflow: 'auto',
    direction: 'ltr',
    backgroundColor: '#a2a4a6',
  },
  chatList: {
    backgroundColor: '#F4F6F8',
  },
  title: {
    color: 'white',
  },
  paddingtoolbar: {
  }

});
async function getFullName(id, profs) {
  profs.forEach((prof) => {
    if (prof.id = id) {
      return `${prof.first} ${prof.last}`
    }
  })
}
function getCookie(cname) {
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
const apiServer = window.api;
let ProfileID;
let jwt;
class ChatContainer extends React.Component {
  state = {
    Convs: null,
    jwt: this.getCookie("jwt"),
    SelectedConv: null,
    externalData: null,
    isMessageLoading: false,
    ProfileID: null,
    MessageContent: null,
    profileLoaded: false,
  }

  componentDidMount() {
    const apiServer = window.api
    console.log(window.api)
    console.log("dsds")
    jwt = this.getCookie("jwt");
    console.log(jwt)
    this._loadAsyncData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ externalData: null });
      this._loadAsyncData();
    }
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
  componentWillUnmount() {
    console.log(jwt)
    if (this._asyncRequest) {
      //this._asyncRequest.cancel();
    }
  }

  render() {
    const { classes } = this.props;
    if (((this.state.SelectedConv === null) || (this.state.Convs === null))) {
      return (<h1>loading</h1>)
    } else if ((!this.state.SelectedConv)) {
      return (
        <div className={classes.root}>

          <section className={classes.container}>
            <Card className={classes.card}>
              <AppBar position="static">
                <Toolbar>
                  {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                  {/*</IconButton>*/}
                  {/*<Typography variant="h6" className={classes.title}>*/}
                  {/*  News*/}
                  {/*</Typography>*/}
                  {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
              </AppBar>
              <CardContent>
                <div className={classes.one}>
                  <ChatList
                    className={classes.chatList}
                    dataSource={this.state.Convs}
                    onClick={this.getConversation}
                  />
                </div>
                <div className={classes.two}>

                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      )
    } else {
      console.log(this.state.SelectedConv);
      console.log(this.state.Convs)
      return (
        <div className={classes.root}>

          <section className={classes.container}>
            <Card className={classes.card}>
              <CardContent className={classes.cardcont}>

                <div className={classes.one}>
                  <ChatList
                    className={classes.chatList}
                    dataSource={this.state.Convs}
                    onClick={this.getConversation}
                  />
                </div>
                <div className={classes.two} id="messages" >
                  <AppBar position="static">
                    <Toolbar>
                      {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                      {/*  <MenuIcon />*/}
                      {/*</IconButton>*/}
                      <div className={classes.paddingtoolbar}></div>
                      <Typography variant="h3" className={classes.title}>
                        {this.state.SelectedConv.title}
                      </Typography>
                      {/*<Button color="inherit">Login</Button>*/}
                    </Toolbar>
                  </AppBar>
                  <LoadingOverlay
                    active={(this.state.isMessageLoading)}
                    className={classes.twoNoMargin}
                    spinner
                    id="messages"
                    text="Loading..."
                  >
                    <MessageList
                      dataSource={this.state.SelectedConv.messages}
                    />
                    <div style={{ float: "left", clear: "both" }}
                      ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                  </LoadingOverlay>
                  <Input
                    multiline={false}
                    placeholder="Type here..."
                    ref="mesginput"
                    rightButtons={
                      <Button
                        color="primary"
                        onClick={this.sendMessage}
                        variant="contained"
                      >
                        Send
                      </Button>
                    }
                    style={{ height: '20px' }}
                  />

                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      )
    }
  }

  sendMessage = (sender) => {
    const conv = this.state.SelectedConv;
    conv.messages.push({
      position: 'right',
      type: 'text',
      text: this.refs.mesginput.state.value,
      date: new Date(),
    })
    chat.post(`/newMessage`, { id: this.state.SelectedConv.id, content: this.refs.mesginput.state.value }, {
      headers: {
        jwt,
        'Access-Control-Allow-Origin': '*',
      }
    }).then(async (res) => {
      const mesgs = [];
      if (res.status != 200) {
        alert("Error Sending Message")
      } else {
        this.refs.mesginput.state.value = "";
        this.setState({ SelectedConv: conv, isMessageLoading: false });
      }
    });

  }
  getConversation = (conv) => {
    this.setState({ isMessageLoading: true })
    const SelectedConv = conv;
    console.log(conv)
    chat.post(`/getConversation`, { id: SelectedConv.id }, {
      headers: {
        jwt,
        'Access-Control-Allow-Origin': '*',
      }
    }).then(async (res) => {
      const mesgs = [];
      await res.data.messages.forEach(async (x) => {
        x.picURI = res.data.profiles.find(y => x.senderId === y.id).picURI
        console.log(x)
        mesgs.push({
          position: ProfileID === x.sender ? 'right' : 'left',
          type: 'text',
          text: x.content,
          date: Date.parse(x.createdAt),
          avatar: x.picURI
        })
        console.log(mesgs)
      });
      mesgs.sort((a, b) => a.date - b.date);
      SelectedConv.messages = mesgs
      this.setState({ SelectedConv, isMessageLoading: false });
      this.scrollToBottom();

    });
  }
  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView();
    } else {

    }
  }
  _loadAsyncData() {
    console.log(window.api)
    this._asyncRequest = chat.post(`/getAllConversations`, {}, { headers: { jwt: this.state.jwt } })
      .then(res => {
        const Convs = [];
        res.data.conversations.forEach((x) => {
          Convs.push({
            avatar: (x.picURI ? x.picURI : '/images/defaults/GroupsAndChats/group.png'),
            alt: 'Chat Icon',
            title: x.title,
            subtitle: x.orgId,
            date: Date.parse(x.updatedAt),
            unread: 0,
            id: x.id,
          })
        })
        Convs.sort((a, b) => a.date - b.date);
        ProfileID = res.data.id;
        const SelectedConv = Convs[0];
        if (!Convs) {
          this.setState({ Convs: [], SelectedConv: [], ProfileID });
        }
        if (!SelectedConv) {
          this.setState({ Convs, SelectedConv, ProfileID });
          return
        }
        chat.post(`/getConversation`, { id: SelectedConv.id }, {
          headers: {
            jwt: this.state.jwt,
            'Access-Control-Allow-Origin': '*',
          }
        }).then(async (res) => {
          const mesgs = [];
          await res.data.messages.forEach(async (x) => {
            x.picURI = res.data.profiles.find(y => x.senderId === y.id).picURI
            console.log(x)
            mesgs.push({
              position: ProfileID === x.sender ? 'right' : 'left',
              type: 'text',
              text: x.content,
              date: Date.parse(x.createdAt),
              avatar: x.picURI
            })
            console.log(mesgs)
          });
          mesgs.sort((a, b) => a.date - b.date);
          SelectedConv.messages = mesgs
          this.setState({ Convs, SelectedConv, ProfileID });
          this.scrollToBottom();
        })
      });

  }
}

export default withRouter(withStyles(useStyles)(ChatContainer));
