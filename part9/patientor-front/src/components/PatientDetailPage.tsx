// // PatientDetailPage.tsx
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { apiBaseUrl } from "../constants";
// import { Patient, Diagnosis } from "../types";

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

//     fetchPatient();
//     fetchDiagnoses();
//     // void fetchPatient();
//     // void fetchDiagnoses();
//   }, [id]);

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
//               <p>Date: {entry.date}</p>
//               <p>Description: {entry.description}</p>
//               {entry.diagnosisCodes && (
//                 <p>
//                   Diagnosis Codes:{" "}
//                   <ul>
//                     {entry.diagnosisCodes.map((code) => (
//                       <span key={code}>
//                         <li>
//                           {code} {getDiagnosisName(code) && `(${getDiagnosisName(code)})`}
//                           {/* {code} {`(${getDiagnosisName(code)})`} */}
//                         </li>
//                       </span>
//                     ))}
//                   </ul>
//                 </p>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No entries found</p>
//       )}
//     </div>
//   );
// };

// export default PatientDetailPage;

// PatientDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
// import { Patient, Diagnosis, Entry } from "../types";
import { Patient, Diagnosis } from "../types";
import EntryDetail from "./EntryDetail";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
    </div>
  );
};

export default PatientDetailPage;
