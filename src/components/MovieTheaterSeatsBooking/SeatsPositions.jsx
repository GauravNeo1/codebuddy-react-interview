const SeatsPositions = ({ seatsData, selectedSeats, handleSeatSelect }) => {
  const renderSeatRows = () => {
    if (!seatsData?.length) return null;

    let seatRows = [];

    seatsData?.forEach((item) => {
      const rowId = item?.id;
      const seatsInRow = item?.seats?.map((seat) => {
        const { id, row, seatNumber, isReserved } = seat;
        const isSelected = selectedSeats?.some(
          (selectedSeat) => selectedSeat?.seatId === seatNumber && selectedSeat?.rowId === row + 1,
        );

        return (
          <button
            key={id}
            onClick={() => handleSeatSelect(seatNumber, row + 1)}
            disabled={isReserved}
            className={`seat-button ${isSelected ? "selected" : ""} ${
              isReserved ? "reserved" : ""
            }`}
          >
            <p>{`Seat: ${seatNumber}`}</p>
            <p>{`Row: ${row + 1}`}</p>
            <p>{`Status : ${isReserved ? " R" : "NR"}`}</p>
          </button>
        );
      });

      seatRows.push(
        <div key={rowId} className="seat-row">
          {seatsInRow}
        </div>,
      );
    });

    return <div className="seat-map">{seatRows}</div>;
  };

  return <div className="seat-map">{renderSeatRows()}</div>;
};

export default SeatsPositions;
