// import React, { useEffect, useState } from "react";
// import { TextField, Grid } from "@mui/material";
// import { OccupationalHealthcareFormValues } from "../../types";

// interface Props {
//   onChange: (value: typeof OccupationalHealthcareFormDefaultValues) => void;
// }

// export const OccupationalHealthcareFormDefaultValues = {
//   employerName: "",
//   sickLeave: {
//     startDate: "",
//     endDate: "",
//   },
// };

// const OccupationalHealthcareForm: React.FC<Props> = ({ onChange }) => {
//   const [values, setValues] = useState<OccupationalHealthcareFormValues>(OccupationalHealthcareFormDefaultValues);

//   useEffect(() => onChange(values), [values]);
//   const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [field]: event.target.value,
//     });
//   };

//   return (
//     <>
//       <Grid item xs={12}>
//         <TextField
//           label="Employer Name"
//           fullWidth
//           value={values.employerName}
//           onChange={handleInputChange("employerName")}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           type="date"
//           // label="Sick LeaveDate"
//           fullWidth
//           // value={values.sickLeaveDate}
//           onChange={handleInputChange("sickLeaveDate")}
//         />
//       </Grid>
//     </>
//   );
// };

// export default OccupationalHealthcareForm;

import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { OccupationalHealthcareFormValues } from "../../types";

interface Props {
  onChange: (value: typeof OccupationalHealthcareFormDefaultValues) => void;
}

export const OccupationalHealthcareFormDefaultValues = {
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  },
};

const OccupationalHealthcareForm: React.FC<Props> = ({ onChange }) => {
  const [values, setValues] = useState<OccupationalHealthcareFormValues>(OccupationalHealthcareFormDefaultValues);

  useEffect(() => onChange(values), [values]);

  const handleInputChange =
    (field: keyof OccupationalHealthcareFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues({
        ...values,
        [field]: value,
      });
    };

  const handleSickLeaveChange =
    (field: keyof typeof OccupationalHealthcareFormDefaultValues.sickLeave) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues({
        ...values,
        sickLeave: {
          ...values.sickLeave,
          [field]: value,
        },
      });
    };

  return (
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
          type="date"
          label="Sick Leave Start Date"
          fullWidth
          value={values.sickLeave.startDate}
          onChange={handleSickLeaveChange("startDate")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="date"
          label="Sick Leave End Date"
          fullWidth
          value={values.sickLeave.endDate}
          onChange={handleSickLeaveChange("endDate")}
        />
      </Grid>
    </>
  );
};

export default OccupationalHealthcareForm;
