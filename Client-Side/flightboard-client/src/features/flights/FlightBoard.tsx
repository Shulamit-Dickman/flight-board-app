import React from "react";
import { Box, Typography, Button, Stack, Paper, Container } from "@mui/material";
import FlightFilters from "./FlightsFilters"; 
import FlightsTable from "./FlightsTable";  
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function FlightBoard() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold" className="text-gray-800">
            Flight Board
          </Typography>
          <Button
          component={Link}
          to="/add-flight"
          variant="contained"
          color="primary"
          startIcon={<AddIcon/>}
        >
          New Flight
        </Button>
        </Stack>

        <Box className="rounded-lg p-4">
          <FlightFilters />
        </Box>

        <Box className="bg-gray rounded-lg shadow-sm p-4">
            <FlightsTable />
        </Box>
      </Stack>
    </Container>
  );
}
