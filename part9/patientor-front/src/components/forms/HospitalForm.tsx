import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { HospitalFormValues } from "../../types";

interface Props {
  onChange: (value: typeof HospitalFormDefaultValues) => void;
}
export const HospitalFormDefaultValues = {
  discharge: {
    date: "",
    criteria: "",
  },
};
const HospitalForm: React.FC<Props> = ({ onChange }) => {
  const [values, setValues] = useState<HospitalFormValues>(HospitalFormDefaultValues);

  useEffect(() => onChange(values), [values]);

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

  return (
    <>
      <Grid item xs={12}>
        <TextField
          // label="Discharge Date"
          type="date"
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
  );
};

export default HospitalForm;
