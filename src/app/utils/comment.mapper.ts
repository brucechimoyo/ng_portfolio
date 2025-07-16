export default class CommentMapper {
  constructor() {}

  static mapToCreateComment(commentContent: string, blogId: string, name: string): any {
    return {
        author: name || "Guest",
        blogId: blogId,
        content: commentContent
    }
  }
}