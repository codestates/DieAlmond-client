import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import styled from 'styled-components';
import font from '../../font.css'

const Div = styled.div`
text-align: center;
justify-content: center;
align-items: center;
margin: auto;
color: #BF78E4;
`

const Text = styled.div`
    font-family: 'CookieRun-Regular';
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 40,
  },
});

export default function SleepSlider({setSmoking}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setSmoking(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    setSmoking(event.target.value);
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
    <Div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SmokingRoomsIcon />
        </Grid>
        <Grid item xs>
          <Typography id="discrete-slider" gutterBottom>
            <Text>하루 흡연량</Text>
          </Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={40}
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
              max: 40,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Div>
  );
}