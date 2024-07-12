// // import React from "react";
// // import { Button, TextField, Grid } from "@mui/material";

// // export interface EntryFormValues {
// //   date: string;
// //   specialist: string;
// //   description: string;
// //   diagnosisCodes: string;
// //   dischargeDate: string;
// //   dischargeCriteria: string;
// // }

// // interface Props {
// //   onSubmit: (values: EntryFormValues) => void;
// //   onCancel: () => void;
// // }

// // const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
// //   const [values, setValues] = React.useState<EntryFormValues>({
// //     date: "",
// //     specialist: "",
// //     description: "",
// //     diagnosisCodes: "",
// //     dischargeDate: "",
// //     dischargeCriteria: "",
// //   });

// //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = event.target;
// //     setValues({
// //       ...values,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     onSubmit(values);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12}>
// //           <TextField
// //             label="Date"
// //             name="date"
// //             type="date"
// //             value={values.date}
// //             onChange={handleChange}
// //             fullWidth
// //             InputLabelProps={{
// //               shrink: true,
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <TextField label="Specialist" name="specialist" value={values.specialist} onChange={handleChange} fullWidth />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <TextField label="Description" name="description" value={values.description} onChange={handleChange} fullWidth />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <TextField
// //             label="Diagnosis Codes"
// //             name="diagnosisCodes"
// //             value={values.diagnosisCodes}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <TextField
// //             label="Discharge Date"
// //             name="dischargeDate"
// //             type="date"
// //             value={values.dischargeDate}
// //             onChange={handleChange}
// //             fullWidth
// //             InputLabelProps={{
// //               shrink: true,
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <TextField
// //             label="Discharge Criteria"
// //             name="dischargeCriteria"
// //             value={values.dischargeCriteria}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //         </Grid>
// //         <Grid item xs={12}>
// //           <Button type="submit" color="primary" variant="contained">
// //             Add
// //           </Button>
// //           <Button color="secondary" variant="contained" onClick={onCancel}>
// //             Cancel
// //           </Button>
// //         </Grid>
// //       </Grid>
// //     </form>
// //   );
// // };

// // export default AddEntryForm;

// import React from "react";
// import { Button, TextField, Grid } from "@mui/material";
// import { EntryFormValues } from "../types";
// // export interface EntryFormValues {
// //   date: string;
// //   specialist: string;
// //   description: string;
// //   diagnosisCodes: string;
// //   dischargeDate: string;
// //   dischargeCriteria: string;
// //   type: string;
// // }

// interface Props {
//   onSubmit: (values: EntryFormValues) => void;
//   onCancel: () => void;
// }

// const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
//   const [values, setValues] = React.useState<EntryFormValues>({
//     date: "",
//     specialist: "",
//     description: "",
//     diagnosisCodes: "",
//     dischargeDate: "",
//     dischargeCriteria: "",
//     type: "Hospital", // Añadido tipo predeterminado
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     onSubmit(values);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             label="Date"
//             name="date"
//             type="date"
//             value={values.date}
//             onChange={handleChange}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField label="Specialist" name="specialist" value={values.specialist} onChange={handleChange} fullWidth />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField label="Description" name="description" value={values.description} onChange={handleChange} fullWidth />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Diagnosis Codes"
//             name="diagnosisCodes"
//             value={values.diagnosisCodes}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Discharge Date"
//             name="dischargeDate"
//             type="date"
//             value={values.dischargeDate}
//             onChange={handleChange}
//             fullWidth
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Discharge Criteria"
//             name="dischargeCriteria"
//             value={values.dischargeCriteria}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" color="primary" variant="contained">
//             Add
//           </Button>
//           <Button color="secondary" variant="contained" onClick={onCancel}>
//             Cancel
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default AddEntryForm;

import React from "react";
import { Button, TextField, Grid } from "@mui/material";
import { EntryFormValues } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues, resetForm: () => void) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [values, setValues] = React.useState<EntryFormValues>({
    date: "",
    specialist: "",
    description: "",
    diagnosisCodes: "",
    dischargeDate: "",
    dischargeCriteria: "",
    type: "Hospital",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values, () => {
      setValues({
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: "",
        dischargeDate: "",
        dischargeCriteria: "",
        type: "Hospital",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Specialist" name="specialist" value={values.specialist} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Description" name="description" value={values.description} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Diagnosis Codes"
            name="diagnosisCodes"
            value={values.diagnosisCodes}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Discharge Date"
            name="dischargeDate"
            type="date"
            value={values.dischargeDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Discharge Criteria"
            name="dischargeCriteria"
            value={values.dischargeCriteria}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Button type="submit" color="primary" variant="contained">
            Add
          </Button>
          <Button color="secondary" variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
