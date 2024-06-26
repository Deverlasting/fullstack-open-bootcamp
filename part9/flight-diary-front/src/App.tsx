import { useState, useEffect } from "react";
import "./App.css";
import { Diary } from "../types";
import { getAllDiaries } from "./services/diary";
// interface Diary {
//   id: number;
//   content: string;
// }

function App() {
  // const [newDiary, setNewDiary] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  console.log(diaries);

  // const diaryCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault();

  //  createDiary({content: newDiary}).then(data =>{
  //   setDiaries(diaries.concat(data))
  //  })

  //   setNewDiary("");
  // };

  return (
    <>
      <h1>Diary entries</h1>
      {diaries.map((diary, index) => (
        <div key={index}>
          {diary.date} - {diary.weather} - {diary.visibility}
        </div>
      ))}
    </>
  );
}

export default App;
