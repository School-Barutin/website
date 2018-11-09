import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/StudentCard";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
    width: 500
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={2}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card />
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredGrid);
