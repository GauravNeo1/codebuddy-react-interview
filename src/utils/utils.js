export const updateReservedStatus = (data, seatsID) => {
  let seatsIDSet = new Set(seatsID);

  data.forEach((item) => {
    item.seats.forEach((seat) => {
      if (seatsIDSet.has(seat.seatNumber)) {
        seat.isReserved = !seat.isReserved;
      }
    });
  });

  return data;
};
