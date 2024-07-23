import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DialogBox({ open, handleClose, type }) {
  const dialogContents = {
    bookingConfirmed: {
      title: "Booking Confirmed",
      message: "Seats successfully booked! Your booking details have been confirmed.",
      button: "Closed",
    },
    invalidNumsRow: {
      title: "Invalid",
      message: "Please enter row number between 3 to 10.",
      button: "Ok",
    },
    invalidNumsOfSeats: {
      title: "Invalid",
      message: "You can select a maximum of 5 seats at a time.",
      button: "Ok",
    },
    successMessage: {
      title: "Success",
      message: "Operation completed successfully.",
      button: "OK",
    },
    apiFailed: {
      title: "API Failed",
      message: "Server Error: Failed to process your request. Please try reloading the page.",
      button: "OK",
    },
  };

  const { title, message, button } = dialogContents[type] || dialogContents.successMessage;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {button}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
