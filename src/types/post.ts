export type Post = {
  _id: string;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  slug: string;
};
