import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const SeatSelectionSummary = ({
  selectedSeats,
  totalCost,
  includedBaseTicketCost,
  handleBookingSubmit,
}) => {
  return (
    <div className="selected-seats">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 120 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontSize: 13 }}>
                RowIds.
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 13 }}>
                SeatIds.
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 13 }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedSeats?.map((seat) => (
              <TableRow
                key={seat.seatId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{seat.rowId}</TableCell>
                <TableCell align="center">{seat.seatId}</TableCell>
                <TableCell align="center">${seat.rowId * 10}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell sx={{ fontSize: 12 }}>Total seats cost</TableCell>
              <TableCell align="center">${totalCost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontSize: 12 }}>Including BaseTicket cost</TableCell>
              <TableCell align="center">${includedBaseTicketCost}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!selectedSeats?.length}
        variant="contained"
        color="success"
        size="small"
        onClick={handleBookingSubmit}
      >
        Book Selected Seats
      </Button>
    </div>
  );
};

export default SeatSelectionSummary;
