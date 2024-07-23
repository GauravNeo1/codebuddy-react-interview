import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SuccessSubmitDialog({ open, handleClose, type }) {
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
  };

  const { title, message } = dialogContents[type] || dialogContents.successMessage;

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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
