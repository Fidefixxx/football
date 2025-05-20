import React, { useState, useEffect } from "react";
import Season from "./Season";
import Match from "./match";

type Props = {};
///https://api.openligadb.de/getmatchdata/{leagueShortcut}/{leagueSeason}
//https://api.openligadb.de/getavailableleagues
// cl       2008
// cl       2009
// cl1011   2010
// cl1112   2011
// cl       2012
// cl       2013
// cl2014nf 2014
// cl       2015
// cl1617   2016
// cl1718   2017
// cl1819   2018

// uefacl   2020
// uefacl   2021
// uefacl22 2022

const ligaseasonlist = [
  { shortcut: "cl", season: "2008" },
  { shortcut: "cl", season: "2009" },
  { shortcut: "cl1011", season: "2010" },
  { shortcut: "cl1112", season: "2011" },
  { shortcut: "cl", season: "2012" },
  { shortcut: "cl", season: "2013" },
  { shortcut: "cl2014nf", season: "2014" },
  { shortcut: "cl", season: "2015" },
  { shortcut: "cl1617", season: "2016" },
  { shortcut: "cl1718", season: "2017" },
  { shortcut: "cl1819", season: "2018" },
  { shortcut: "cl1920german", season: "2019" },
  { shortcut: "uefacl", season: "2020" },
  { shortcut: "uefacl", season: "2021" },
  { shortcut: "uefacl22", season: "2022" },
];

export default function Liga({}: Props) {
  const [ligen, setLigen] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.openligadb.de/getavailableleagues")
      .then((response) => response.json())
      .then((data) => setLigen(data))
      .catch((error) => console.error("Fehler beim Laden der Ligen:", error));
    console.log(ligen);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium">Champions League</h1>
      {/* <div>
        {ligaseasonlist.map((item, index) => (
          <Season key={index} shortcut={item.shortcut} season={item.season} />
        ))}
      </div> */}
      <Season shortcut={"cl"} season={"2008"} />
    </div>
  );
}
