import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, Grid, SelectChangeEvent } from "@mui/material";
import { EntryFormValues } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues, resetForm: () => void) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [values, setValues] = useState<EntryFormValues>({
    date: "",
    type: "Hospital",
    description: "",
    specialist: "",
    diagnosisCodes: "",
    discharge: {
      date: "",
      criteria: "",
    },
    employerName: "",
    sickLeaveDate: "",
    healthCheckRating: 0,
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      healthCheckRating: Number(event.target.value),
    });
  };

  const handleDischargeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      discharge: {
        ...values.discharge,
        date: event.target.value,
      },
    });
  };

  const handleDischargeCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      discharge: {
        ...values.discharge,
        criteria: event.target.value,
      },
    });
  };

  // const handleInputChange =
  //   (field: string, nestedField?: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     if (nestedField) {
  //       setValues({
  //         ...values,
  //         [field]: {
  //           ...values[field as keyof EntryFormValues],
  //           [nestedField]: event.target.value,
  //         },
  //       });
  //     } else {
  //       setValues({
  //         ...values,
  //         [field]: event.target.value,
  //       });
  //     }
  //   };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setValues({
      ...values,
      type: event.target.value as string,
    });
  };

  const handleSubmit = () => {
    onSubmit(values, () =>
      setValues({
        date: "",
        type: "Hospital",
        description: "",
        specialist: "",
        diagnosisCodes: "",
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeaveDate: "",
        healthCheckRating: 0,
      })
    );
  };

  return (
    <Grid item xs={3} container spacing={2}>
      <Grid item xs={12}>
        <Select fullWidth value={values.type} onChange={handleSelectChange}>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Date" fullWidth value={values.date} onChange={handleInputChange("date")} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Description" fullWidth value={values.description} onChange={handleInputChange("description")} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Specialist" fullWidth value={values.specialist} onChange={handleInputChange("specialist")} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={values.diagnosisCodes}
          onChange={handleInputChange("diagnosisCodes")}
        />
      </Grid>

      {values.type === "Hospital" && (
        <>
          <Grid item xs={12}>
            <TextField
              label="Discharge Date"
              fullWidth
              value={values.discharge.date}
              // onChange={handleInputChange("dischargeDate")}
              // onChange={handleInputChange("discharge.date")}
              onChange={handleDischargeDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={values.discharge.criteria}
              onChange={handleDischargeCriteriaChange}
            />
          </Grid>
        </>
      )}

      {values.type === "OccupationalHealthcare" && (
        <>
          <Grid item xs={12}>
            <TextField
              label="Employer Name"
              fullWidth
              value={values.employerName}
              onChange={handleInputChange("employerName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sick LeaveDate"
              fullWidth
              value={values.sickLeaveDate}
              onChange={handleInputChange("sickLeaveDate")}
            />
          </Grid>
        </>
      )}

      {values.type === "HealthCheck" && (
        <Grid item xs={12}>
          <TextField
            type="number"
            inputProps={{ min: 0, max: 2 }}
            label="Health Check Rating"
            fullWidth
            value={values.healthCheckRating}
            // onChange={handleInputChange("healthCheckRating")}
            onChange={handleHealthCheckRatingChange}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddEntryForm;
