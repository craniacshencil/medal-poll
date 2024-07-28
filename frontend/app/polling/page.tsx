"use client";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import MyCard from "@/components/mycard";
import { useState } from "react";
import Help from "@/components/help";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface keyValue {
  key: number;
  value: string;
}

export default function Polling() {
  //All the possible choices that users have
  const choices: keyValue[] = [
    { key: 0, value: "Fintech" },
    { key: 1, value: "Biotech" },
    { key: 2, value: "Computational Physics" },
    { key: 3, value: "Origamic Architecture" },
    { key: 4, value: "Quantum Computing" },
    { key: 5, value: "Computational Biology" },
    { key: 6, value: "Computer Science" },
    { key: 7, value: "Disaster Management" },
    { key: 8, value: "Cybersecurity" },
  ];

  // setting up global states keeping track of all medals
  const [goldIndex, setGoldIndex] = useState(-1);
  const [silverIndex, setSilverIndex] = useState(-1);
  const [bronzeIndex, setBronzeIndex] = useState(-1);

  // Assgin index whenever medal is given to a choice
  function toggleMedal(medal: "gold" | "silver" | "bronze", idx: number): void {
    if (medal == "gold") {
      // reset other medals if current idx already had a medal assigned
      if (silverIndex == idx) setSilverIndex(-1);
      else if (bronzeIndex == idx) setBronzeIndex(-1);
      setGoldIndex(idx);
    } else if (medal == "silver") {
      if (bronzeIndex == idx) setBronzeIndex(-1);
      else if (goldIndex == idx) setGoldIndex(-1);
      setSilverIndex(idx);
    } else {
      if (goldIndex == idx) setGoldIndex(-1);
      else if (silverIndex == idx) setSilverIndex(-1);
      setBronzeIndex(idx);
    }
  }

  const cardItems = choices.map((item) => (
    <li key={item.key}>
      <MyCard
        goldIndex={goldIndex}
        silverIndex={silverIndex}
        bronzeIndex={bronzeIndex}
        toggleMedal={toggleMedal}
        title={item.value}
        itemNo={item.key}
        className="bg-yellow-300"
      />
    </li>
  ));

  return (
    <div className="m-10 flex justify-center">
      <section className="flex items-center flex-col w-2/3 mt-20 m-5 gap-3">
        <h1 className={`${inter.className} text-5xl font-extrabold mb-3`}>
          Make your choices here
        </h1>
        <Help />
        <ul className="w-full">{cardItems}</ul>
      </section>
    </div>
  );
}
