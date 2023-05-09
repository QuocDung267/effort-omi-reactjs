import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 480,
  },
  search: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480,
  },
  textField: {
    background: "#FFFFFF",
  },
  searchButton: {
    // background: 'linear-gradient(45deg, #3949ab 30%, #1e88e5 90%)',
    color: "white",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  progressCircular: {
    // color: '#6798e5',
    animationDuration: "550ms",
  },
}));

const SearchBar = ({ handleChange, searchHandler }) => {
  const classes = useStyles();

  return (
    <form className={classes.search}>
      <Grid container={true}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          size="small"
          type="search"
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>

      {/** submit button */}

      <label htmlFor="search-button">
        <Button
          fullWidth={true}
          type="submit"
          variant="contained"
          size="medium"
          component="span"
          color="primary"
          className={classes.searchButton}
          onClick={searchHandler}
        >
          <SearchIcon />
        </Button>
      </label>
    </form>
  );
};

export default SearchBar;
