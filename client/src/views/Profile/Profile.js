import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { dashboard } from '../../config/apis'
import Grid from '@material-ui/core/Grid';
import OrgTile from '../../components/Organization'

import { withRouter } from 'react-router-dom';
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

class Profile extends React.Component {

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
  dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImageScaledToCanvas()
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      var file = this.dataURItoBlob(canvas.toDataURL('image/png'));

      dashboard.post('/getProfilePicURI', {}, {
        headers: {
          jwt: jwt,
          'Access-Control-Allow-Origin': '*',
        }
      }).then(async (res) => {
        var currentdate = new Date();
        var Curr_date = currentdate.getDay + '-' + currentdate.getMonth + '-' + currentdate.getFullYear;
        axios.put(res.data, file, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            "Access-Control-Allow-Headers": "Origin, Content-Type, x-ms-*",
            "Content-Type": "image/png",
            "Content-Length": file.length, //here I am trying to get the size of image.
            "x-ms-date": Curr_date,
            "x-ms-blob-type": "BlockBlob",
          }
        })
          .then(response => { console.log(response); console.log('correct!!'); })
          .catch(error => { console.log(error); console.log('error here!!'); });
      })
    }
  }
  setEditorRef = (editor) => this.editor = editor
  handleNewImage = e => {
    this.state.Profile.picURI = e.target.files[0];
    console.log(this.state)

  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }
  render() {
    const Organizations = JSON.parse(sessionStorage.getItem('user')).organizations
    console.log(Organizations)
    const { classes } = this.props;
    if (this.state.Profile === null) {
      return (<h1>loading</h1>)
    } else {
      return (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} s={5} md={5} lg={3}>
              <Card>
                <CardContent >
                  <h2>{this.state.Profile.first} {this.state.Profile.last}</h2>
                  <div className={classes.canvasavatar}>
                    <div >
                      <ReactAvatarEditor
                        ref={this.setEditorRef}
                        scale={parseFloat(this.state.scale)}
                        width={this.state.width}
                        height={this.state.height}
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                        rotate={parseFloat(this.state.rotate)}
                        borderRadius={this.state.width / (2)}
                        image={this.state.Profile.picURI}
                        className="editor-canvas"
                      />
                    </div>
                    <br />
              New File:
              <input name="newImage" type="file" onChange={this.handleNewImage} />
                    <br />
              Zoom:
              <input
                      name="scale"
                      type="range"
                      onChange={this.handleScale}
                      min={this.state.allowZoomOut ? '0.1' : '1'}
                      max="2"
                      step="0.01"
                      defaultValue="1"
                    />
                    <Button
                      type="button"
                      fullWidth
                      onClick={this.onClickSave}
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Save
              </Button>
                  </div>

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7} lg={5}>
              <Card>
                <CardContent>
                  <OrgTile org={Organizations[0]}>

                  </OrgTile>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div >
      )
    }
  }
  _loadAsyncData() {
    this.setState({ Profile: JSON.parse(sessionStorage.getItem('user')) })
  }
}
export default withRouter(withStyles(useStyles)(Profile));
