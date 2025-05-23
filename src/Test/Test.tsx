import React, { use, useState, useEffect } from "react";

type Props = {
  title: string;
};

type user = {
  username: string;
};

export default function Test({ title }: Props) {
  const [users, setUsers] = useState<user[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setColor(
      visible
        ? "bg-blue-100 w-1/2 h-1/2 border-2 border-black p-2"
        : "bg-red-100 w-1/2 h-1/2 border-2 border-black p-2"
    );
  }, [visible]);
  console.log(users);

  return (
    <div className={color}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {users.map((users) => (
        <div className="my-3">
          <p className=""> - {users.username}</p>
        </div>
      ))}
      <button
        className="border-2 p-1 bg-gray-400 hover:bg-gray-500"
        onClick={() => setVisible(!visible)}
      >
        TOGGLE COLOR
      </button>
    </div>
  );
}
