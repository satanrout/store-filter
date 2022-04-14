import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiltered, toggleSidebar } from "../redux/productSlice";
import { productData } from "../store";

const useStyles = makeStyles({
  root: {
    width: "95%",
    padding: "10px",
  },
  slider: {
    marginTop: "25px",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [catagories, setCatagories] = useState([]);
  const [value, setValue] = useState([0, 1000]);
  const [selected, setSelected] = useState("all");
  const { width, height } = useWindowSize();
  const { filtered, sidebar } = useSelector((state) => state.action);

  useEffect(() => {
    const allCat = filtered.map((data) => data.category);
    const cat = [...new Set(allCat)];
    setCatagories(cat);
  }, []);

  useEffect(() => {
    if (width > 700) {
      dispatch(toggleSidebar(false));
    }
  }, [width]);

  useEffect(() => {
    filterByPrice();
  }, [value]);

  useEffect(() => {
    sidebar ? document.body.classList.add("no_scroll") : document.body.classList.remove("no_scroll");
    return () => document.body.classList.remove("no_scroll");
  }, [sidebar]);

  const filterByPrice = () => {
    const filtered = productData.filter((data) => data.price >= value[0] && data.price <= value[1]);
    dispatch(setFiltered(filtered));
  };

  const handleChange = (event, newValue) => {
    setSelected("all");
    setValue(newValue);
  };

  function valuetext(value) {
    return `₹${value}`;
  }

  const handleButton = (cat, i) => {
    if (!cat) {
      setSelected("all");
      dispatch(setFiltered(productData));
    } else {
      const filtered = productData.filter((data) => data.category.toLowerCase() === cat.toLowerCase());
      setSelected(i);
      dispatch(setFiltered(filtered));
    }
  };

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  return (
    <div className={`${sidebar ? "show_sidebar" : ""} sidebar`}>
      <Box maxWidth={300} height={"100%"}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListSubheader>Catagories</ListSubheader>
            <ListItem selected={selected === "all"} onClick={() => handleButton(false)} button>
              <ListItemText primary="ALL" />
            </ListItem>
            {catagories.map((cat, i) => {
              return (
                <ListItem selected={selected === i} onClick={() => handleButton(cat, i)} key={i} button>
                  <ListItemText primary={cat.toUpperCase()} />
                </ListItem>
              );
            })}
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <div className={classes.root}>
              <ListSubheader>Filter By Price</ListSubheader>
              <Slider
                className={classes.slider}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={0}
                max={1000}
              />
            </div>
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default Sidebar;
