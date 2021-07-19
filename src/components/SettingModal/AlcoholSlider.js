import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import LocalBarIcon from '@material-ui/icons/LocalBar';
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

export default function AlcoholSlider({setAlcohol}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setAlcohol(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    setAlcohol(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 30) {
      setValue(30);
    }
  };

  function valuetext(value) {
    return `${value}시간`;
  }

  return (
    <Div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <LocalBarIcon />
        </Grid>
        <Grid item xs>
          <Typography id="discrete-slider" gutterBottom>
            <Text>일주일 음주 횟수</Text>
          </Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={7}
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
              max: 7,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Div>
  );
}