import React, { use, useState, useEffect } from "react";

type Props = {
  text: string;
};

export default function Test({ text }: Props) {
  const [comments, setComments] = useState<[]>([]);
  const [active, setActive] = useState<boolean>(false);
  let color = "";
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((data) => setComments(data));
    console.log(comments);
  }, []);
  useEffect(() => {
    if (active) {
      color = "bg-green-200";
    } else {
      color = "bg-gray-100";
    }
  }, [active]);
  return (
    <div className={`${color}`}>
      <h1>Hallo</h1>
      {comments.map((comment) => (
        <p>{comment}</p>
      ))}
      <button onClick={() => setActive(!active)}>Click me</button>
    </div>
  );
}
