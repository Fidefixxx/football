import React, { useState, useEffect, use } from "react";
import Team from "./Team";

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

type MatchProps = {
  match: {
    matchID: number;
    group: {
      groupName: string;
    };
    team1: Team;
    team2: Team;
    matchResults: MatchResult[];
    matchDateTimeUTC: string;
  };
  index: number;
};

export default function Match({ match, index }: MatchProps) {
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);
  const [winner1, setWinner1] = useState<boolean>(false);
  const [winner2, setWinner2] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    setScore1(
      match.matchResults.find(
        (r: MatchResult) => r.resultName === "Endergebnis"
      )?.pointsTeam1 || 0
    );
    setScore2(
      match.matchResults.find(
        (r: MatchResult) => r.resultName === "Endergebnis"
      )?.pointsTeam2 || 0
    );
    console.log(match.matchDateTimeUTC);
  }, []);

  useEffect(() => {
    if (score1 > score2) {
      setWinner1(true);
      setWinner2(false);
    } else if (score2 > score1) {
      setWinner1(false);
      setWinner2(true);
    } else {
      setWinner1(true);
      setWinner2(true);
    }
  }, [score1, score2]);

  return (
    <div
      key={index}
      className="w-100 h-max p-4 bg-gray-50 rounded hover:bg-gray-100 border-1"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-bold">{match.group.groupName}</div>
        <div className="text-gray-600">
          {formatDate(match.matchDateTimeUTC)}
        </div>
      </div>
      <div className="relative flex border-1">
        <div className="flex-col border-1 w-full">
          <Team
            name={match.team1.teamName}
            icon={match.team1.teamIconUrl}
            score={score1}
            winner={winner1}
          />
          <Team
            name={match.team2.teamName}
            icon={match.team2.teamIconUrl}
            score={score2}
            winner={winner2}
          />
        </div>
      </div>
    </div>
  );
}
