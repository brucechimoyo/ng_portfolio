export default class CommentMapper {
  constructor() {}

  static mapToCreateComment(commentContent: string, blogId: string): any {
    return {
        author: "Trevor Noah",
        blogId: blogId,
        content: commentContent
    }
  }
}