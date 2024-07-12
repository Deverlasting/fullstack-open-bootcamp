// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { apiBaseUrl } from "../constants";
// import { Patient, Diagnosis, Entry, EntryFormValues } from "../types";
// import AddEntryForm from "./AddEntryForm";
// import EntryDetail from "./EntryDetail";

// const PatientDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
//         setPatient(patientData);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     const fetchDiagnoses = async () => {
//       try {
//         const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
//         setDiagnoses(diagnosesData);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     void fetchPatient();
//     void fetchDiagnoses();
//   }, [id]);

//   const handleAddEntry = async (values: EntryFormValues) => {
//     const entryData = {
//       date: values.date,
//       type: "Hospital",
//       description: values.description,
//       specialist: values.specialist,
//       discharge: {
//         date: values.dischargeDate,
//         criteria: values.dischargeCriteria,
//       },
//       diagnosisCodes: values.diagnosisCodes.split(",").map((code) => code.trim()),
//     };

//     try {
//       const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entryData);
//       setPatient((prevPatient) => {
//         if (!prevPatient) return null;
//         return {
//           ...prevPatient,
//           entries: [...prevPatient.entries, newEntry],
//         };
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleCancel = () => {
//     console.log("Cancelled");
//   };

//   const getDiagnosisName = (code: string): string | undefined => {
//     const diagnosis = diagnoses.find((d) => d.code === code);
//     return diagnosis ? diagnosis.name : undefined;
//   };

//   if (!patient) {
//     return <div>Patient not found</div>;
//   }

//   return (
//     <div>
//       <h2>{patient.name}</h2>
//       <p>Gender: {patient.gender}</p>
//       <p>Occupation: {patient.occupation}</p>
//       <p>Date of Birth: {patient.dateOfBirth}</p>
//       <p>SSN: {patient.ssn}</p>
//       <h3>Entries</h3>
//       {patient.entries.length > 0 ? (
//         <ul>
//           {patient.entries.map((entry) => (
//             <li key={entry.id}>
//               <EntryDetail entry={entry} getDiagnosisName={getDiagnosisName} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No entries found</p>
//       )}

//       <h3>Add New Entry</h3>
//       <AddEntryForm onSubmit={handleAddEntry} onCancel={handleCancel} />
//     </div>
//   );
// };

// export default PatientDetailPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Entry, EntryFormValues } from "../types";
import AddEntryForm from "./AddEntryForm";
import EntryDetail from "./EntryDetail";
import { Button } from "@mui/material";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(diagnosesData);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  const handleAddEntry = async (values: EntryFormValues, resetForm: () => void) => {
    const entryData = {
      date: values.date,
      type: "Hospital",
      description: values.description,
      specialist: values.specialist,
      discharge: {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria,
      },
      diagnosisCodes: values.diagnosisCodes.split(",").map((code) => code.trim()),
    };

    try {
      const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entryData);
      setPatient((prevPatient) => {
        if (!prevPatient) return null;
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newEntry],
        };
      });
      resetForm();
      setShowForm(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <h3>Entries</h3>
      {patient.entries.length > 0 ? (
        <ul>
          {patient.entries.map((entry) => (
            <li key={entry.id}>
              <EntryDetail entry={entry} getDiagnosisName={getDiagnosisName} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found</p>
      )}

      <Button variant="contained" color="primary" onClick={toggleForm}>
        {showForm ? "Cancel" : "Add New Entry"}
      </Button>

      {showForm && (
        <div>
          <h3>Add New Entry</h3>
          <AddEntryForm onSubmit={handleAddEntry} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
};

export default PatientDetailPage;
