export type Meal = {
  _id: string;
  title: string;
  summary: string;
  creator: string;
  image: string | ArrayBuffer | File;
  slug: string;
  instructions: string;
  creator_email: string;
};
// here you can disrtucture the props
