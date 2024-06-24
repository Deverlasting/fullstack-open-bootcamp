// import { course } from "../type";

// interface course {
//   name: string;
// }

// export const Header = (course: course) => {
export const Header = ({ course }: { course: string }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
};

export default Header;
