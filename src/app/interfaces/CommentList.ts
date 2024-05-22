class CommentList<T> {
  value!: T;
  next: CommentList<T> | null = null;
  prev: CommentList<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
