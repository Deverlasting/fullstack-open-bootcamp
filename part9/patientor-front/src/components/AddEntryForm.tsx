import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, Grid, SelectChangeEvent } from "@mui/material";
import { EntryFormValues, HealthCheckEntryFormValues, HospitalFormValues, OccupationalHealthcareFormValues } from "../types";
import diagnoses from "../../../patientor-back/data/diagnoses";
import HospitalForm, { HospitalFormDefaultValues } from "./forms/HospitalForm";
import { OccupationalHealthcareFormDefaultValues } from "./forms/OccupationalHealthcareForm";
import { HealthCheckFormDefaultValues } from "./forms/HealthCheckForm";
import OccupationalHealthcareForm from "./forms/OccupationalHealthcareForm";
import HealthCheckForm from "./forms/HealthCheckForm";

const SpecificFormDefaulValues = {
  Hospital: HospitalFormDefaultValues,
  OccupationalHealthcare: OccupationalHealthcareFormDefaultValues,
  HealthCheck: HealthCheckFormDefaultValues,
};

interface Props {
  onSubmit: (
    values: EntryFormValues & (HospitalFormValues | OccupationalHealthcareFormValues | HealthCheckEntryFormValues)
  ) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [commonValues, setCommonValues] = useState<EntryFormValues>({
    date: "",
    type: "Hospital",
    description: "",
    specialist: "",
    diagnosisCodes: [],
  });

  const [specificValues, setSpecificValues] = useState<
    HospitalFormValues | OccupationalHealthcareFormValues | HealthCheckEntryFormValues
  >(HospitalFormDefaultValues);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommonValues({
      ...commonValues,
      [field]: event.target.value,
    });
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<EntryFormValues["diagnosisCodes"]>) => {
    console.log(event.target.value);
    const {
      target: { value },
    } = event;
    setCommonValues({
      ...commonValues,
      diagnosisCodes: [...commonValues.diagnosisCodes, ...value],
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setCommonValues({
      ...commonValues,
      type: event.target.value as "Hospital" | "OccupationalHealthcare" | "HealthCheck",
    });
    setSpecificValues(SpecificFormDefaulValues[event.target.value as "Hospital" | "OccupationalHealthcare" | "HealthCheck"]);
  };

  const handleSubmit = () => {
    onSubmit({ ...commonValues, ...specificValues });
  };

  const FormType = {
    Hospital: <HospitalForm onChange={setSpecificValues} />,
    OccupationalHealthcare: <OccupationalHealthcareForm onChange={setSpecificValues} />,
    HealthCheck: <HealthCheckForm onChange={setSpecificValues} />,
  };

  return (
    <Grid item xs={3} container spacing={2}>
      <Grid item xs={12}>
        <Select fullWidth value={commonValues.type} onChange={handleSelectChange}>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField type="date" fullWidth value={commonValues.date} onChange={handleInputChange("date")} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          value={commonValues.description}
          onChange={handleInputChange("description")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Specialist" fullWidth value={commonValues.specialist} onChange={handleInputChange("specialist")} />
      </Grid>
      <Grid item xs={12}>
        <Select
          // input={<OutlinedInput label="Name" />}
          fullWidth
          multiple
          value={commonValues.diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          // renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      {FormType[commonValues.type]}

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
