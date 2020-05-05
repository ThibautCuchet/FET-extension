import React from "react";

import { withStyles} from "@material-ui/styles";
import {
  AppBar,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Container,
  FormControl,
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Authentication from "../../util/Authentication/Authentication";
import Classement from "../Classement/Classement";

import "./Config.css";

import trophy_b from "../../images/emoji_events-black-36dp.svg";
import trophy_w from "../../images/emoji_events-white-36dp.svg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 75,
  },
  title: {
    marginRight: 5,
    font: theme.typography.fontFamily,
  },
  container: {
    padding: "1em",
  },
  space: {
    marginTop: 100,
  },
  formControl: {
    minWidth: 120,
  },
});

class ConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.Authentication = new Authentication();

    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null.
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: "light",
      configuration: [
        "DAF",
        "Iveco",
        "Man",
        "Mercedes-Benz",
        "Renault Trucks",
        "Scania",
        "Volvo",
      ],
      marqueId: "",
      marqueName: "",
      nextRequest: 5000,
    };
  }

  contextUpdate(context, delta) {
    if (delta.includes("theme")) {
      this.setState(() => {
        return { theme: context.theme };
      });
    }
  }

  componentDidMount() {
    // do config page setup as needed here
    if (this.twitch) {
      this.twitch.onAuthorized((auth) => {
        this.Authentication.setToken(auth.token, auth.userId);
        if (!this.state.finishedLoading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          this.setState(() => {
            return { finishedLoading: true, streamerId: auth.userId };
          });
        }
      });

      this.twitch.onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });

      setInterval(() => {
        if (this.state.marqueId != 0) {
          fetch(
            `https://fet-parser.herokuapp.com/${this.state.marqueId}`
          ).then((result) =>
            result
              .json()
              .then((data) =>
                this.setState({ data }, () =>
                  this.twitch.send("broadcast", "application/json", data)
                )
              )
          );
        }
      }, this.state.nextRequest);
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.finishedLoading && this.Authentication.isModerator()) {
      return (
        <div className={classes.root}>
          <AppBar className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h4">Fail Express Trophy</Typography>
              <EmojiEventsIcon fontSize="large" />
            </Toolbar>
          </AppBar>
          <Container className={classes.space}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                aria-controls="configuration"
                id="configuration"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1">Configurations</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="marque">Marque</InputLabel>
                  <Select
                    labelId="marque"
                    id="marque"
                    value={this.state.marqueId}
                    onChange={(event) =>
                      this.setState({
                        marqueId: event.target.value,
                        marqueName: this.state.configuration[
                          event.target.value - 1
                        ],
                        data: null,
                      })
                    }
                    label="Marque"
                  >
                    {this.state.configuration.map((marque, index) => (
                      <MenuItem value={index + 1} key={marque}>
                        {marque}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                aria-controls="affichage"
                id="affichage"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1">Résultat</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {this.state.marqueId != "" ? (
                  this.state.data ? (
                    <Classement
                      data={this.state.data}
                      theme={this.state.theme}
                    />
                  ) : (
                    <CircularProgress />
                  )
                ) : (
                  <Typography variant="body1">
                    Veuillez choisir votre marque !
                  </Typography>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="Config">
          <div
            className={
              this.state.theme === "light" ? "Config-light" : "Config-dark"
            }
          >
            Loading...
          </div>
        </div>
      );
    }
  }
}
/*
<div className={this.state.theme==='light' ? 'Config-light' : 'Config-dark'}>
                        <h2>Fail Express Trophy <img src={this.state.theme == 'light' ? trophy_b : trophy_w} /></h2>
                        <div style={{marginBottom: "10px"}}>
                            Marque : 
                            <select value={this.state.marqueId} onChange={event => this.setState({marqueId: event.target.value})}>
                                <option value={0}>Choisir marque</option>
                                {this.state.configuration.map((marque, index) => 
                                    <option value={index+1} key={marque}>{marque}</option>
                                )}
                            </select>
                        </div>
                        {this.state.data ? <Classement data={this.state.data} theme={this.state.theme}/> : null}
                    </div>
*/
export default withStyles(styles)(ConfigPage);
