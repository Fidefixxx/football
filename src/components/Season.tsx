import React, { useState, useEffect } from "react";

type MatchResult = {
  resultID: number;
  resultName: string;
  pointsTeam1: number;
  pointsTeam2: number;
  resultDescription: string;
  resultOrderID: number;
  resultTypeID: number;
};

type Props = {
  shortcut: string;
  season: string;
};

export default function Season({ shortcut, season }: Props) {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://api.openligadb.de/getmatchdata/${shortcut}/${season}`
        );
        const data = await response.json();
        console.log(`Matches for ${season} (${shortcut}):`, data);
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
          <div
            key={index}
            className="p-4 bg-gray-50 rounded hover:bg-gray-100 border"
          >
            <p className="text-lg font-bold mb-2">{match.group.groupName}</p>
            <p className="text-black">
              {match.team1?.teamName}{" "}
              <span className="font-bold">
                {match.matchResults.find(
                  (r: MatchResult) => r.resultName === "Endergebnis"
                )?.pointsTeam1 || 0}
              </span>{" "}
              vs{" "}
              <span className="font-bold">
                {match.matchResults.find(
                  (r: MatchResult) => r.resultName === "Endergebnis"
                )?.pointsTeam2 || 0}
              </span>{" "}
              {match.team2?.teamName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
