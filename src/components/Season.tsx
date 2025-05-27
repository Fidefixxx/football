import React, { useState, useEffect } from "react";
import Match from "./Match";

type MatchResult = {
  resultID: number;
  resultName: string;
  pointsTeam1: number;
  pointsTeam2: number;
  resultDescription: string;
  resultOrderID: number;
  resultTypeID: number;
};

type Team = {
  teamId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
};

type MatchData = {
  matchID: number;
  group: {
    groupName: string;
  };
  team1: Team;
  team2: Team;
  matchResults: MatchResult[];
};

type Props = {
  shortcut: string;
  season: string;
};

export default function Season({ shortcut, season }: Props) {
  const [matches, setMatches] = useState<MatchData[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://api.openligadb.de/getmatchdata/${shortcut}/${season}`
        );
        const data = await response.json();
        console.log("Full API Response:", JSON.stringify(data, null, 2));
        console.log("First match data:", data[0]);
        console.log("First match team1:", data[0]?.team1);
        console.log("First match team2:", data[0]?.team2);
        setMatches(data);
      } catch (error) {
        console.error(`Error for ${season}:`, error);
      }
    };

    fetchMatches();
  }, [shortcut, season]);
  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow-md border">
      <div className="text-2xl font-bold mb-4 text-gray-800">
        Season {season} - {shortcut}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {matches.map((match, index) => (
          <Match key={index} match={match} index={index} />
        ))}
      </div>
    </div>
  );
}
