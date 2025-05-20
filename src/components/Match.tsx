import React from "react";

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
  };
  index: number;
};

export default function Match({ match, index }: MatchProps) {
  console.log("Team1:", match.team1);
  return (
    <div
      key={index}
      className="p-4 bg-gray-50 rounded hover:bg-gray-100 border"
    >
      <p className="text-lg font-bold mb-2">{match.group.groupName}</p>
      <div className="flex items-center justify-between mb-2 border">
        <div className="flex items-center gap-2 border">
          <img
            src={match.team1.teamIconUrl}
            alt=""
            className="w-8 h-8 object-contain border"
          />
          <span>{match.team1.teamName}</span>
        </div>
        <div className="flex items-center gap-2 border">
          <span className="font-bold">
            {match.matchResults.find(
              (r: MatchResult) => r.resultName === "Endergebnis"
            )?.pointsTeam1 || 0}
          </span>
          <span>:</span>
          <span className="font-bold">
            {match.matchResults.find(
              (r: MatchResult) => r.resultName === "Endergebnis"
            )?.pointsTeam2 || 0}
          </span>
        </div>
        <div className="flex items-center gap-2 border">
          <span>{match.team2.teamName}</span>
          <img
            src={match.team2.teamIconUrl}
            alt=""
            className="w-8 h-8 object-contain border"
          />
        </div>
      </div>
    </div>
  );
}
