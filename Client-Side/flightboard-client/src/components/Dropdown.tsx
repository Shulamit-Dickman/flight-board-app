import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react'

type DropdownProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function DropDown({options,selected,onChange}:DropdownProps){

const handleChange =  (event:SelectChangeEvent) => {
  onChange(event.target.value);
}

return (
  <FormControl fullWidth  sx={{ m: 0}} size="small">
    <InputLabel id="demo-select-small-label">Status</InputLabel>
    <Select
      labelId="demo-select-small-label"
      id="demo-select-small"
      value={selected}
      label="Status"
      onChange={handleChange}
    >
      {
        options.map((value)=>(
          <MenuItem value={value} key={value}>{ value === "" ? "None" : value}</MenuItem>
        ))        
      }
    </Select>
  </FormControl>
); 
}

