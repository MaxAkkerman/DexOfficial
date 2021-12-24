import { FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: 'skybkue',
    '& .Mui-focused': {
      background: 'transparent',
      // fontWeight: "bold"
    },
    // "&:focus": {
    //     backgroundColor: "skybkue",
    //     background: "skybkue",
    // }
  },
  root: {
    '& .Mui-focused': {
      // backgroundColor: "transparent",
      background: 'transparent',
      // fontWeight: "bold"
    },
  },
  input: {
    border: 'none',
    '&:focus': {
      // backgroundColor: "skybkue",
      // background: "skybkue",
    },
    // background: "transparent",
  },
  select: {
    '&.MuiTextField-select': {
      fontSize: '36px',
      // backgroundColor: "skybkue"
    },
    '&:focus': {
      // background: 'transparent',
      // backgroundColor: "skybkue"
    },
    // backgroundColor: "transparent"
  },
}));
export default function MultilineTextFields(props) {
  const [currency, setCurrency] = React.useState(props.networksArray[0].label);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl style={{ width: '100%' }} noValidate autoComplete="off">
      <TextField
        variant="standard"
        InputProps={{
          disableUnderline: true,
          classes: {
            input: classes.input,
            select: classes.select,
          },
        }}
        className={classes.root}
        size={'large'}
        id="standard-select-currency"
        select
        value={currency}
        onChange={handleChange}
      >
        {props.networksArray.map((option) => (
          <MenuItem
            selected
            classes={{ selected: classes.active }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
