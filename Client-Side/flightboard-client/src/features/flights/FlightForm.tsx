import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  IconButton,
  Box
} from "@mui/material";

import { Send, FlightTakeoff } from "@mui/icons-material";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { useCreateFlight } from "./useCreateFlight";
import { Flight, FlightDto } from "../../types/Flight";
import { clearForm, setField } from "./flightFormSlice";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export default function FlightForm() {
    const dispatch = useAppDispatch();
    const formData = useAppSelector(state=>state.flightForm)
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const createFlight = useCreateFlight();
    const [generalError, setGeneralError] = useState<string | null>(null); 
    const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.flightNumber.trim()) newErrors.flightNumber = "Flight number is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.departureTime) {
      newErrors.departureTime = "Departure time is required";
    } else if (new Date(formData.departureTime) <= new Date()) {
      newErrors.departureTime = "Departure time must be in the future";
    }
    if (!formData.gate.trim()) newErrors.gate = "Gate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    createFlight.mutate(formData,{
        onSuccess:()=>{           
            handleClose()
        },
        onError:(err)=>{
          const axiosError = err as AxiosError;
          if(axiosError.response?.data === "FlightNumberExists")
            setGeneralError('Flight number already exists');
          else
            setGeneralError('Failed to create flight');
        }
        })
      setErrors({});
  };

  const handleInputChange = (field:keyof FlightDto, value:string) => {
    dispatch(setField({field,value}));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleClose = ()=>{
    dispatch(clearForm());
    navigate("/");
  }

  return (
    <Card elevation={3} sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <CardHeader
        sx={{ backgroundColor: "#f0f4ff", borderBottom: "1px solid #ccc" }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
              <FlightTakeoff sx={{ mr: 1 }} />
              Add New Flight
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        }
      />     
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Flight Number"
                fullWidth
                value={formData.flightNumber}
                onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                error={!!errors.flightNumber}
                helperText={errors.flightNumber}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Destination"
                fullWidth
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                error={!!errors.destination}
                helperText={errors.destination}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Departure Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.departureTime}
                onChange={(e) => handleInputChange("departureTime", e.target.value)}
                error={!!errors.departureTime}
                helperText={errors.departureTime}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Gate"
                fullWidth
                value={formData.gate}
                onChange={(e) => handleInputChange("gate", e.target.value)}
                error={!!errors.gate}
                helperText={errors.gate}
              />
            </Grid>
            {generalError && (
              <Grid size={{ xs: 12}}>
                <Alert severity="error">{generalError}</Alert>
              </Grid>
            )}
            <Grid size={{ xs: 12}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={createFlight.isPending}
                startIcon={createFlight.isPending ? <CircularProgress size={20} color="inherit" /> : <Send />}
              >
                {createFlight.isPending ? "Adding Flight..." : "Add Flight"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
