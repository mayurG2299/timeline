import { TextField, IconButton, Popover, Button, Tooltip } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import React, { useState } from "react";
import "./DateFilterButton.css";
import { alpha } from "@mui/material";
import Notification from "./Notification";

const dateFilterLogic = (startDate, endDate, data) => {
  let filteredData = data.filter((e) => {
    let publishedDate = new Date(e.publishedDate);
    if (
      publishedDate > new Date(startDate) &&
      publishedDate < new Date(endDate)
    )
      return e;
  });
  return filteredData;
};

function DateFilterButton({ onFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || null
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDate") || null
  );
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const tweetsData = JSON.parse(localStorage.getItem("tweets"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleApplyFilter = () => {
    // console.log({ startDate, endDate });

    const filteredData = dateFilterLogic(startDate, endDate, tweetsData);
    localStorage.setItem("filterData", JSON.stringify(filteredData));
    // console.log({ filteredData });
    if (filteredData.length) {
      onFilter(filteredData);
      localStorage.setItem("startDate", startDate);
      localStorage.setItem("endDate", endDate);
    } else {
      onFilter(tweetsData);
      setStartDate(null);
      setEndDate(null);
      localStorage.setItem("startDate", null);
      localStorage.setItem("endDate", null);
      setNotify({
        isOpen: true,
        message: "No match found for the applied filter",
        type: "error",
      });
    }
    handleClose();
  };

  const handleRemoveFilter = () => {
    onFilter(tweetsData);
    localStorage.setItem("startDate", null);
    setStartDate(null);
    localStorage.setItem("endDate", null);
    setEndDate(null);
    localStorage.setItem("filterData", null);
    handleClose();
  };

  const handleStartDateChange = (event) => {
    // console.log(typeof event.target.value);
    setStartDate(event.target.value);
  };

  const handleEndtDateChange = (event) => {
    setEndDate(event.target.value);
  };
  return (
    <>
      <Tooltip title="Date Filter">
        <IconButton
          onClick={handleClick}
          sx={{
            "&:hover": {
              backgroundColor: alpha("#d4e8f2", 0.1),
            },
          }}
        >
          <CalendarMonthOutlinedIcon sx={{ color: "#d6d9db" }} />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: "350px",
            height: "130px",
            padding: "5px",
            backgroundColor: "#d6d9db",
          },
        }}
      >
        <div className="dateFilterPopover">
          <div className="dateFilterOptions">
            <TextField
              id="date"
              label="Start Date"
              type="date"
              defaultValue={startDate}
              sx={{ width: 150 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleStartDateChange}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              defaultValue={endDate}
              sx={{ width: 150 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleEndtDateChange}
            />
          </div>
          <div className="dateFilterApply">
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveFilter}
              sx={{
                "margin-right": "5px",
              }}
            >
              remove
            </Button>
            <Button
              variant="outlined"
              onClick={handleApplyFilter}
              sx={{
                width: "100px",
                color: "#105a8c",
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </Popover>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default DateFilterButton;
