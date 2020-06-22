import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 330,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StepOne = ({ setNewBusiness, newBusiness }) => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (e) => {
    setCategory(e.target.value);
    console.log("category2", category, e.target.value);
    setNewBusiness({ ...newBusiness, category: e.target.value });
  };

  useEffect(() => {
    try {
      const fetchCategoryList = async () => {
        let response = await axios({
          method: "get",
          url:
            "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/categories",
          header: {
            "Content-Type": "application/json",
          },
        });
        console.log("category list response", response);
        setCategoryList(response.data);
      };
      fetchCategoryList();
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log("category list", categoryList);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={category}
          onChange={handleChange}
          margin="dense"
          // autoWidth={true}
          label="Category"
        >
          {categoryList.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default StepOne;
