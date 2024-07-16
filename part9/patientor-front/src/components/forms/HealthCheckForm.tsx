import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { HealthCheckEntryFormValues } from "../../types";

interface Props {
  onChange: (value: typeof HealthCheckFormDefaultValues) => void;
}

export const HealthCheckFormDefaultValues = {
  healthCheckRating: 0,
};

const HealthCheckForm: React.FC<Props> = ({ onChange }) => {
  const [values, setValues] = useState<HealthCheckEntryFormValues>(HealthCheckFormDefaultValues);
  useEffect(() => onChange(values), [values]);
  const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      healthCheckRating: Number(event.target.value),
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          type="number"
          inputProps={{ min: 0, max: 2 }}
          label="Health Check Rating"
          fullWidth
          value={values.healthCheckRating}
          onChange={handleHealthCheckRatingChange}
        />
      </Grid>
    </>
  );
};

export default HealthCheckForm;
