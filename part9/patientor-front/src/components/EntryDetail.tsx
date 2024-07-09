import { FC } from "react";
import { Box, Divider } from "@mui/material";
import { LocalHospital, Work, FitnessCenter, Favorite } from "@mui/icons-material";
import { green, yellow, orange, red } from "@mui/material/colors";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";

interface EntryDetailProps {
  entry: Entry;
  getDiagnosisName: (code: string) => string | undefined;
}

const EntryDetail: FC<EntryDetailProps> = ({ entry, getDiagnosisName }) => {
  const renderEntryDetail = () => {
    switch (entry.type) {
      case "Hospital":
        const hospitalEntry = entry as HospitalEntry;
        return (
          <>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <LocalHospital fontSize="small" /> Hospital
            </h3>
            <p>Date: {hospitalEntry.date}</p>
            <p>Description: {hospitalEntry.description}</p>
            {hospitalEntry.diagnosisCodes && (
              <p>
                Diagnosis Codes:{" "}
                {hospitalEntry.diagnosisCodes.map((code) => (
                  <span key={code}>
                    {code} {getDiagnosisName(code) && `(${getDiagnosisName(code)})`}{" "}
                  </span>
                ))}
              </p>
            )}
            {hospitalEntry.discharge ? (
              <>
                <p>Discharge Date: {hospitalEntry.discharge.date}</p>
                <p>Discharge Criteria: {hospitalEntry.discharge.criteria}</p>
              </>
            ) : (
              <p>No discharge information available.</p>
            )}
          </>
        );
      case "OccupationalHealthcare":
        const occupationalEntry = entry as OccupationalHealthcareEntry;
        return (
          <>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <Work fontSize="small" /> Occupational Healthcare
            </h3>
            <p>Date: {occupationalEntry.date}</p>
            <p>Description: {occupationalEntry.description}</p>
            {occupationalEntry.diagnosisCodes && (
              <p>
                Diagnosis Codes:{" "}
                {occupationalEntry.diagnosisCodes.map((code) => (
                  <span key={code}>
                    {code} {getDiagnosisName(code) && `(${getDiagnosisName(code)})`}{" "}
                  </span>
                ))}
              </p>
            )}
            <p>Employer Name: {occupationalEntry.employerName}</p>
            {occupationalEntry.sickLeave ? (
              <p>
                Sick Leave: {occupationalEntry.sickLeave.startDate} to {occupationalEntry.sickLeave.endDate}
              </p>
            ) : (
              <p>No sick leave information available.</p>
            )}
          </>
        );
      case "HealthCheck":
        const healthCheckEntry = entry as HealthCheckEntry;
        let ratingColor;

        switch (healthCheckEntry.healthCheckRating) {
          case 0:
            ratingColor = green[500]; // Healthy
            break;
          case 1:
            ratingColor = yellow[700]; // LowRisk
            break;
          case 2:
            ratingColor = orange[800]; // HighRisk
            break;
          case 3:
            ratingColor = red[500]; // CriticalRisk
            break;
          default:
            ratingColor = "gray"; // Default color for unknown rating
        }

        return (
          <>
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <FitnessCenter fontSize="small" /> Health Check
            </h3>
            <p>Date: {healthCheckEntry.date}</p>
            <p>Description: {healthCheckEntry.description}</p>
            {healthCheckEntry.diagnosisCodes && (
              <p>
                Diagnosis Codes:{" "}
                {healthCheckEntry.diagnosisCodes.map((code) => (
                  <span key={code}>
                    {code} {getDiagnosisName(code) && `(${getDiagnosisName(code)})`}{" "}
                  </span>
                ))}
              </p>
            )}
            <p style={{ display: "flex", alignItems: "center" }}>
              Health Check Rating:
              <Favorite
                fontSize="small"
                sx={{
                  color: ratingColor,
                  ml: 1,
                }}
              />
            </p>
          </>
        );
      default:
        return <p>Unknown entry type</p>;
    }
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid lightgray", borderRadius: 2, mb: 2 }}>
      {renderEntryDetail()}
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default EntryDetail;
