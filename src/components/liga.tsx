import React, { useEffect, useRef, useState } from "react";

interface League {
  id: number;
  name: string;
  shortcut: string;
  season: number;
}
type Props = {};

export default function liga({}: Props) {
  const [input, setInput] = useState("");
  const [leagues, setLeagues] = useState<League[]>([]);

  console.log(input);

  useEffect(() => {
    fetch("https://api.openligadb.de/getavailableleagues").then((res) =>
      res.json().then((data: League[]) => {
        const newData = data.map((league) => ({
          id: data.LeagueId,
        }));
        setLeagues(leagues);
        console.log(leagues);
      })
    );
  });

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div>
      <div>
        <input
          className="border"
          type="text"
          onChange={(el) => setInput(el.target.value)}
        />
      </div>
      ligastandings
      <div>team</div>
    </div>
  );
}
