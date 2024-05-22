export default interface Comment {
  postDate?: Date;
  id?: number;
  content: string;
  author: string;
  blogId: string;
  updatedAt: Date;
  createdAt: Date;
}
