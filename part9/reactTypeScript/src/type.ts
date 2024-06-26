export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartWithDescription {
  // description: string;
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartWithDescription {
  // description: string;
  backgroundMaterial: string;
  kind: "background";
}
export interface CoursePartSpecial extends CoursePartWithDescription {
  // description: string;
  requirements: string[];
  kind: "special";
}

// interface CoursePartDescription extends CoursePartWithDescription {
//   // description: string;
//   kind: "description";
// }

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
