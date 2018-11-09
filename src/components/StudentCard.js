import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  card: {
    maxWidth: 500
  },
  // media: {
  //   // height: 0,
  //   paddingTop: '100%', // 16:9
  // },
  // actions: {
  //   display: 'flex',
  // },
  expand: {
    marginLeft: "auto",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class StudentCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title=".." />
        {/* <CardMedia
          className={classes.media}
          image="https://lh5.googleusercontent.com/kVArIVxjDvEGxah0W9BwHoJaIPc5SFVVfUOVpQYvLq6wI3TFvkZcmf3d2ddcJY28_70hJoxPiQDd-IFHTxmC=w1920-h954-rw"
          title="Avatar picture"
        /> */}
        {/* <CardContent> */}
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Something else
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

StudentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentCard);
