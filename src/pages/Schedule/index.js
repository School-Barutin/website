import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ScheduleTable from "../../components/ScheduleTable";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 15, paddingTop: 0 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "98%",
    marginLeft: "1%",
    marginTop: "1%"
  },
  tabHeading: {
    fontSize: "1.5rem"
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab className={classes.tabHeading} label="Първи" />
            <Tab className={classes.tabHeading} label="Втори" />
          </Tabs>
        </AppBar>
        <TabContainer>
          <ScheduleTable grade={value} />
        </TabContainer>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
