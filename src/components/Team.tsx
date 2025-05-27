import React, { useState, useEffect, use } from "react";
import default_image from "./default.png";

type Props = {
  name: string;
  icon: string;
  score: number;
  winner: boolean;
};

export default function Team({ name, icon, score, winner }: Props) {
  const [style, setStyle] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setStyle(winner ? "w-10 text-2xl font-bold px-5" : "w-10 text-xl px-5");
  }, [winner]);

  return (
    <div className="flex border-1 border-gray-400 p-1">
      <div className="flex-1">{name}</div>
      <div>
        {hasError ? (
          <img className="w-10 h-10" src={default_image} alt="" />
        ) : (
          <img
            className="w-10 h-10"
            src={icon}
            alt=""
            onError={(err) => setHasError(true)}
          />
        )}
      </div>
      <div className={`${style} flex justify-center items-center`}>{score}</div>
    </div>
  );
}
