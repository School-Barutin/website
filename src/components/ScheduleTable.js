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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { generateSchedule, printTime } from "../scripts/helpers";

import { firestore } from "firebase";
var db = firestore();
db.settings({ timestampsInSnapshots: true });

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  realTimeButton: {
    marginLeft: "10px",
    fontFamily: "Veranda, Arial"
  },
  table: {
    minWidth: 550
  }
});

const defaultDuration = {
  lesson: 45,
  bigBreak: 20,
  break: 10,
  beginning: { h: 8, m: 0 }
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const daysNames = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"];

class SimpleTable extends React.Component {
  state = {
    realTime: false
  };

  componentDidMount = () => {
    const collection = `schedule/studyPeriod1/classes/`;
    db.collection(collection)
      .get()
      .then(snapshot =>
        this.setState({
          schedule: snapshot.docs
        })
      );
  };

  getRowsCount(lessons) {
    let biggestLength = 0;

    if (!lessons) return 0;
    if (!Object.keys(lessons).length) return 0;

    days.forEach(day => {
      if (lessons[day].length > biggestLength)
        biggestLength = lessons[day].length;
    });

    const lessonRows = [];
    for (let i = 0; i < biggestLength; i++) lessonRows.push(i);
    return lessonRows;
  }

  render() {
    const { classes, grade } = this.props;
    const { schedule, realTime } = this.state;
  
    const lessons = schedule && schedule[grade] && schedule[grade].data();
    let lessonRows = this.getRowsCount(lessons);
    const lessonsTime = generateSchedule(defaultDuration, lessonRows.length)

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {realTime ? (
            <TableBody>
              {lessonRows ? (
                lessonRows.map((_, lesson) => {
                  return (
                    <React.Fragment key={lesson}>
                      <TableRow>
                        <TableCell>
                          <Typography variant="display2">
                            {lessons["monday"] &&
                              lessons["monday"][lesson] &&
                              lessons["monday"][lesson]}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="display2">
                            {printTime(lessonsTime[lesson * 2].h, lessonsTime[lesson * 2].m)}
                            {" - "}
                            {lesson * 2 + 1 < lessonsTime.length && printTime(lessonsTime[lesson * 2 + 1].h, lessonsTime[lesson * 2 + 1].m)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="headline">Зареждане...</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <React.Fragment>
              <TableHead>
                <TableRow>
                  {daysNames.map(day => (
                    <TableCell key={day}>
                      <Typography variant="display1">{day}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {lessonRows ? (
                  lessonRows.map((_, lesson) => {
                    return (
                      <React.Fragment key={lesson}>
                        <TableRow>
                          {days.map((day, i) => {
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
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="headline">Зареждане...</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </React.Fragment>
          )}
        </Table>
        <FormControlLabel
          className={classes.realTimeButton}
          control={
            <Switch
              checked={this.state.realTime}
              onChange={event => {
                this.setState({ realTime: event.target.checked });
              }}
              value="gilad"
            />
          }
          label={<Typography variant="headline">В реално време</Typography>}
        />
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
