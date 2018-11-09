import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { firestore } from "firebase";
var db = firestore();
db.settings({ timestampsInSnapshots: true });

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class SimpleTable extends React.Component {
  state = {};

  componentDidMount = () => {
    const { grade } = this.props;
    const collection = `schedule/studyPeriod1/classes/`;

    db.collection(collection)
      .get()
      .then(snapshot =>
        this.setState({
          schedule: snapshot.docs
        })
      );
  };

  render() {
    const { classes, grade } = this.props;
    const { schedule } = this.state;
    const lessons = schedule && schedule[grade] && schedule[grade].data()

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="display1">Понеделник</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="display1">Вторник</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="display1">Сряда</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="display1">Четвъртък</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="display1">Петък</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons ? (
              [0, 1, 2, 3, 4, 5, 6].map((_, lesson) => {
                return (
                  <TableRow key={lesson}>
                    {[
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday"
                    ].map((day, i) => {
                      return (
                        <TableCell key={i}>
                          <Typography variant="headline">
                            {lessons[day] &&
                              lessons[day][lesson] &&
                              lessons[day][lesson]}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography variant="headline">
                    Зареждане... {this.props.grade}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
