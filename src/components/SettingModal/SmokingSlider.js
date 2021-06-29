import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 40,
  },
});

export default function SleepSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 40) {
      setValue(40);
    }
  };

  function valuetext(value) {
    return `${value}시간`;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SmokingRoomsIcon />
        </Grid>
        <Grid item xs>
          <Typography id="discrete-slider" gutterBottom>
            하루 흡연량
          </Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={20}
            onChange={handleSliderChange}
            value={typeof value === 'number' ? value : 0}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 20,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}