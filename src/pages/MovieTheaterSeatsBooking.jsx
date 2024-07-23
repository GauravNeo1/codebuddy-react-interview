import { useState, useEffect } from "react";
import "../styles/MovieTheaterSeatsBooking.css";
import TicketQuantitySelector from "../components/MovieTheaterSeatsBooking/TicketQuantitySelector";
import SeatsPositions from "../components/MovieTheaterSeatsBooking/SeatsPositions";
import SeatSelectionSummary from "../components/MovieTheaterSeatsBooking/SeatSelectionSummary";
import DialogBox from "../dialog/DialogBox";
import { updateReservedStatus } from "../utils/utils";
import { GET_SEATS, SUBMIT } from "../constants/constants";

const MovieTheaterSeatsBooking = () => {
  const [rowCount, setRowCount] = useState(3);
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [includedBaseTicketCost, setIncludedBaseTicketCost] = useState(0);
  const [submitDialog, setSubmitDialog] = useState(false);
  const [dialogType, setDialogType] = useState("successMessage");

  const fetchSeatsData = async (rowCount) => {
    try {
      let response = await fetch(`${GET_SEATS}?count=${rowCount}`);
      response = await response.json();
      const { data } = response;
      setSeatsData(data);
    } catch (error) {
      console.error("Error fetching seats:", error);
      handleOpenDialog("apiFailed");
    }
  };

  useEffect(() => {
    fetchSeatsData(rowCount);
  }, [rowCount]);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setSubmitDialog(true);
  };

  const handleSeatSelect = (seatId, rowId) => {
    const seatIndex = selectedSeats?.findIndex(
      (seat) => seat?.seatId === seatId && seat?.rowId === rowId,
    );

    if (seatIndex !== -1) {
      setSelectedSeats((prevSeats) =>
        prevSeats?.filter((seat) => !(seat?.seatId === seatId && seat?.rowId === rowId)),
      );
    } else {
      if (selectedSeats?.length >= 5) {
        handleOpenDialog("invalidNumsOfSeats");
      } else {
        setSelectedSeats((prevSeats) => [...prevSeats, { rowId, seatId }]);
      }
    }
  };

  const handleBookingSubmit = async () => {
    const seatIds = selectedSeats?.map((item) => item?.seatId);
    try {
      let response = await fetch(`${SUBMIT}`, {
        method: "POST",
        body: JSON.stringify({ seatIds }),
      });
      response = await response.json();
      let {
        message,
        data: { seatIds: bookedSeatIds },
      } = response;

      if (message === "Success") {
        setSeatsData(updateReservedStatus(seatsData, bookedSeatIds));
        handleOpenDialog("bookingConfirmed");
        setSelectedSeats([]);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      handleOpenDialog("apiFailed");
    }
  };

  useEffect(() => {
    let sum = selectedSeats?.reduce((acc, seat) => acc + seat?.rowId * 10, 0);
    setTotalCost(sum);
    sum !== 0 ? setIncludedBaseTicketCost(sum + 20) : setIncludedBaseTicketCost(0);
  }, [selectedSeats]);

  const handleRowCountChange = (numRows) => {
    let newRowCount = numRows;

    if (numRows < 3) {
      newRowCount = 3;
    } else if (numRows > 10) {
      newRowCount = 10;
    }

    setSelectedSeats([]);
    setRowCount(newRowCount);

    if (numRows < 3 || numRows > 10) {
      handleOpenDialog("invalidNumsRow");
    }
  };

  return (
    <>
      <div className="heading"> Movie Theater Seats Booking Portal </div>
      <div className="movie-theater-booking">
        <div className="left-column">
          <div>
            <TicketQuantitySelector
              rowCount={rowCount}
              handleRowCountChange={handleRowCountChange}
            />
          </div>

          <div className="selected-seats-cost">
            <SeatSelectionSummary
              selectedSeats={selectedSeats}
              totalCost={totalCost}
              includedBaseTicketCost={includedBaseTicketCost}
              handleBookingSubmit={handleBookingSubmit}
            />
          </div>
        </div>
        <div className="right-column">
          <SeatsPositions
            seatsData={seatsData}
            selectedSeats={selectedSeats}
            handleSeatSelect={handleSeatSelect}
          />
        </div>
      </div>
      <DialogBox open={submitDialog} handleClose={() => setSubmitDialog(false)} type={dialogType} />
    </>
  );
};

export default MovieTheaterSeatsBooking;
