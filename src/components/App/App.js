import React from "react";

import { withStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import Authentication from "../../util/Authentication/Authentication";
import Classement from "../Classement/Classement";

import "./App.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    font: theme.typography.fontFamily,
  },
  space: {},
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.Authentication = new Authentication();

    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null.
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: "light",
      isVisible: true,
    };
  }

  visibilityChanged(isVisible) {
    this.setState(() => {
      return {
        isVisible,
      };
    });
  }

  componentDidMount() {
    if (this.twitch) {
      this.twitch.onAuthorized((auth) => {
        this.Authentication.setToken(auth.token, auth.userId);
        if (!this.state.finishedLoading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          this.setState(() => {
            return { finishedLoading: true };
          });
        }
      });

      this.twitch.listen("broadcast", (target, contentType, body) => {
        this.setState({ data: JSON.parse(body) });
      });

      this.twitch.onVisibilityChanged((isVisible, _c) => {
        this.visibilityChanged(isVisible);
      });

      this.twitch.onContext((context) => {
        console.log(context);
        this.setState({ theme: context.theme });
      });
    }
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten("broadcast", () =>
        console.log("successfully unlistened")
      );
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.finishedLoading && this.state.isVisible && this.state.data) {
      const { data } = this.state;
      return (
        <div className={classes.root}>
          <AppBar className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Fail Express Trophy</Typography>
              <EmojiEventsIcon fontSize="normal" className={classes.icon} />
              <Typography variant="subtitle1">{data.nomMarque}</Typography>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Container className={classes.space}>
            {this.state.data ? (
              <Classement data={data} theme={this.state.theme} />
            ) : null}
          </Container>
        </div>
      );
    } else {
      return <div className="App"></div>;
    }
  }
}

export default withStyles(styles)(App);
