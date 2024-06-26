import { CoursePartBasic, CoursePartGroup, CoursePartBackground, CoursePartSpecial } from "../type";

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <h3>{part.name}</h3>
                {/* <p>Exercise Count: {part.exerciseCount}</p> */}
                <p>Description: {part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <h3>{part.name}</h3>
                {/* <p>Exercise Count: {part.exerciseCount}</p> */}
                <p>Group Project Count: {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <h3>{part.name}</h3>
                {/* <p>Exercise Count: {part.exerciseCount}</p> */}
                <p>Description: {part.description}</p>
                <p>
                  Background Material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                </p>
              </div>
            );
          case "special":
            return (
              <div key={index}>
                <h3>{part.name}</h3>
                {/* <p>Exercise Count: {part.exerciseCount}</p> */}
                <p>Description: {part.description}</p>
                <p>
                  Requirements: Requirements: {part.requirements.join(", ")}
                  {/* {part.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex}>{requirement}</div>
                  ))} */}
                </p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Part;

// import { CoursePartBasic, CoursePartGroup, CoursePartBackground } from "../type";

// type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

// const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
//   courseParts.forEach((part) => {
//     switch (part.kind) {
//       case "basic":
//         return part.name, part, part.exerciseCount;
//       case "group":
//         return part.name, part, part.exerciseCount, part.groupProjectCount;

//       case "background":
//         return part.name, part, part.exerciseCount, part.backgroundMaterial;
//     }
//   });

//   return null;
// };

// export default Part;
