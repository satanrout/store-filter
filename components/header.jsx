import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Button, colors } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiltered } from "../redux/productSlice";
import { productData } from "../store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "white",
    color: "#1565c0",
  },
  cart: {
    color: "white",
    marginLeft: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(4),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.length < 3) {
      dispatch(setFiltered(productData));
    } else {
      const productFilter = productData.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      dispatch(setFiltered(productFilter));
    }
  }, [searchValue]);

  return (
    <div className="header">
      <AppBar position="static">
        <div className="container">
          <Toolbar className="header-container">
            <div className="header-left">
              <Typography variant="h6" color="inherit">
                Satyaranjan
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  onChange={(e) => handleSearch(e)}
                  value={searchValue}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
            <div className="header-right">
              <Button variant="contained" size="medium" className={classes.button}>
                Login
              </Button>
              <Button startIcon={<ShoppingCart />} variant="text" size="medium" className={classes.cart}>
                Cart
              </Button>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
