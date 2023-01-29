import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const {
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    mutate: deleteMutate,
  } = useMutation((postId) => deletePost(postId));

  const {
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
  } = useMutation((postId) => updatePost(postId));

  if (isLoading) {
    return <h3>Loading!</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutate(post.id)}>Delete</button>
      <button onClick={() => updateMutate(post.id)}>Update title</button>
      {isDeleteError && <p style={{ color: "red" }}>Error deleting the post</p>}
      {isDeleteLoading && <p style={{ color: "purple" }}>Deleting the post</p>}
      {isDeleteSuccess && (
        <p style={{ color: "green" }}>Post has (not) been deleted</p>
      )}
      {isUpdateError && <p style={{ color: "red" }}>Error updating the post</p>}
      {isUpdateLoading && <p style={{ color: "purple" }}>Updating the post</p>}
      {isUpdateSuccess && (
        <p style={{ color: "green" }}>Post has (not) been updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
