"use client";
import { Inter } from "next/font/google";
import MyCard from "@/components/mycard";
import { useState } from "react";
import Help from "@/components/help";
import Leaderboard from "@/components/leaderboard";
import { Button } from "@/components/ui/button";
import { createToast } from "@/components/createToast";
import { useRouter } from "next/navigation";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export interface keyValue {
  key: number;
  value: string;
}

interface validationResult {
  success: boolean;
  missingMedal: string | null;
}

interface pollData {
  choices: keyValue[];
  medals: keyValue[];
}

export default function Polling() {
  const router = useRouter();
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

  /**
   *Update index whenever medal is assigned to a choice
   */
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

  /**
   *Validation function checking whether all medals have been submitted
   */
  function validateMedals(): validationResult {
    if (goldIndex == -1) {
      return { success: false, missingMedal: "Gold" };
    } else if (silverIndex == -1) {
      return { success: false, missingMedal: "Silver" };
    } else if (bronzeIndex == -1) {
      return { success: false, missingMedal: "Bronze" };
    }
    return { success: true, missingMedal: null };
  }

  /**
   *Submits the medal allocation to the backend for processing and displays valid output to the end-user
   */
  async function submitMedals(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const result: validationResult = validateMedals();
    // validation failed
    if (!result.success) {
      createToast(
        `${result.missingMedal} is missing`,
        `Please assign your ${result.missingMedal} medal`,
      );
      return;
    }

    //validation successful
    const pollURL: string = process.env.NEXT_PUBLIC_POLL as string;
    const medals: keyValue[] = [
      choices[goldIndex],
      choices[silverIndex],
      choices[bronzeIndex],
    ];
    const polldata: pollData = { choices, medals };

    try {
      const response: Response = await fetch(pollURL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(polldata),
      });
      const data = await response.json();
      if (response.ok) {
        createToast(
          "Your response has been recorded",
          "Redirecting to submission...",
        );
        setTimeout(() => {
          router.push("/submission");
        }, 800);
      } else {
        createToast("Client Side Error", data.error);
      }
    } catch (err) {
      createToast("Server Error", "Oops! Something went wrong");
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
      />
    </li>
  ));

  return (
    <div>
      <div className="m-10 flex justify-center">
        <Leaderboard
          goldIndex={goldIndex}
          silverIndex={silverIndex}
          bronzeIndex={bronzeIndex}
          names={choices}
        />
        <section className="flex items-center flex-col w-2/3 mt-20 m-5 mb-2 gap-3">
          <h1 className={`${inter.className} text-5xl font-extrabold mb-3`}>
            Make your choices here
          </h1>
          <Help />
          <ul className="w-full">{cardItems}</ul>
        </section>
      </div>
      <div className="text-center">
        <Button
          onClick={submitMedals}
          className="text-xl font-semibold mb-20 p-5 px-10"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
