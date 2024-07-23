import { useState } from "react";
import { TextField, Button } from "@mui/material";

const TicketQuantitySelector = ({ rowCount, handleRowCountChange }) => {
  const [numRows, setNumRows] = useState(rowCount);

  return (
    <div className="input-container">
      <TextField
        id="outlined-number"
        label="Enter RowCount"
        value={numRows}
        onChange={(e) => setNumRows(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />

      <div className="button-container">
        <Button variant="outlined" size="small" onClick={() => handleRowCountChange(numRows)}>
          ENTER
        </Button>
      </div>
    </div>
  );
};

export default TicketQuantitySelector;
