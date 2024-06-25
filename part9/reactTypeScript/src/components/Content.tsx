import Part from "./Part";
import { CoursePart } from "../type";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return <Part courseParts={courseParts} />;
};

export default Content;
