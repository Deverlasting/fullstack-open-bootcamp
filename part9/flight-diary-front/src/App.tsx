// import { useState, useEffect } from "react";
// import "./App.css";
// import { Diary, NewDiary, Weather, Visibility } from "../types";
// import { getAllDiaries, createDiary } from "./services/diary";
// import axios from "axios";

// function App() {
//   // const [newDiary, setNewDiary] = useState<NewDiary>();
//   // const [newDiary, setNewDiary] = useState<NewDiary>({} as NewDiary);
//   const [newDiary, setNewDiary] = useState<NewDiary>({
//     date: "",
//     weather: Weather.empty,
//     visibility: Visibility.empty,
//     comment: "",
//   });

//   // const [diaries, setDiaries] = useState<Diary[]>([]);
//   const [diaries, setDiaries] = useState<Diary[]>([{} as Diary]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getAllDiaries().then((data) => {
//       setDiaries(data);
//     });
//   }, []);

//   const diaryCreation = (event: React.SyntheticEvent) => {
//     event.preventDefault();
//     console.log(newDiary);

//     createDiary(newDiary)
//       .then((data) => {
//         setDiaries(diaries.concat(data));
//       })
//       .catch((error) => {
//         if (axios.isAxiosError(error)) {
//           setError(error.response?.data as string);
//         } else {
//           setError("An error occurred while creating the diary entry.");
//         }
//         setTimeout(() => {
//           setError(null);
//         }, 5000);
//       });

//     // reset newDiary to empty values
//     setNewDiary({
//       date: "",
//       weather: Weather.empty,
//       visibility: Visibility.empty,
//       comment: "",
//     });
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = event.target;
//     setNewDiary((prevDiary) => ({
//       ...prevDiary,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <form onSubmit={diaryCreation} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <label>
//           Date:
//           {/* <input type="date" name="date" value={newDiary.date} onChange={handleInputChange} /> */}
//           <input type="date" name="date" value={newDiary.date} onChange={handleInputChange} />
//         </label>
//         {/* <label>
//           Visibility:
//           <input type="text" name="visibility" value={newDiary.visibility} onChange={handleInputChange} />
//         </label> */}
//         <div>
//           <label>Visibility:</label>
//           {Object.values(Visibility).map((visibility) => (
//             <label key={visibility}>
//               <input
//                 type="radio"
//                 name="visibility"
//                 value={visibility}
//                 checked={newDiary.visibility === visibility}
//                 onChange={handleInputChange}
//               />
//               {visibility}
//             </label>
//           ))}
//         </div>
//         {/* <label>
//           Weather:
//           <input type="text" name="weather" value={newDiary.weather} onChange={handleInputChange} />
//         </label> */}
//         <div>
//           <label>Weather:</label>
//           {Object.values(Weather).map((weather) => (
//             <label key={weather}>
//               <input
//                 type="radio"
//                 name="weather"
//                 value={weather}
//                 checked={newDiary.weather === weather}
//                 onChange={handleInputChange}
//               />
//               {weather}
//             </label>
//           ))}
//         </div>
//         <button type="submit">Add</button>
//       </form>

//       <h1>Diary entries</h1>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {diaries.map((diary, index) => (
//         <div key={index}>
//           {diary.date} - {diary.weather} - {diary.visibility}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "./App.css";
import { Diary, NewDiary, Weather, Visibility } from "../types";
import { getAllDiaries, createDiary } from "./services/diary";
import axios from "axios";

function App() {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: Weather.empty,
    visibility: Visibility.empty,
    comment: "",
  });

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data as string);
        } else {
          setError("An error occurred while creating the diary entry.");
        }
        setTimeout(() => {
          setError(null);
        }, 5000);
      });

    setNewDiary({
      date: "",
      weather: Weather.empty,
      visibility: Visibility.empty,
      comment: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewDiary((prevDiary) => ({
      ...prevDiary,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={diaryCreation} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Date:
          <input type="date" name="date" value={newDiary.date} onChange={handleInputChange} />
        </label>

        <div>
          <label>Visibility:</label>
          {Object.values(Visibility)
            .filter((v) => v !== Visibility.empty)
            .map((visibility) => (
              <label key={visibility}>
                <input
                  type="radio"
                  name="visibility"
                  value={visibility}
                  checked={newDiary.visibility === visibility}
                  onChange={handleInputChange}
                />
                {visibility}
              </label>
            ))}
        </div>

        <div>
          <label>Weather:</label>
          {Object.values(Weather)
            .filter((w) => w !== Weather.empty)
            .map((weather) => (
              <label key={weather}>
                <input
                  type="radio"
                  name="weather"
                  value={weather}
                  checked={newDiary.weather === weather}
                  onChange={handleInputChange}
                />
                {weather}
              </label>
            ))}
        </div>
        <label>
          Comment:
          <input type="string" name="comment" value={newDiary.comment} onChange={handleInputChange} />
        </label>
        <button type="submit">Add</button>
      </form>

      <h1>Diary entries</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {diaries.map((diary, index) => (
        <div key={index}>
          {diary.date} - {diary.weather} - {diary.visibility}
        </div>
      ))}
    </div>
  );
}

export default App;
