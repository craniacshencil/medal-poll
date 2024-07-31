"use client";
import Image from "next/image";
import { createToast } from "../polling/page";
import { useState } from "react";

interface Medals {
  Gold: Medal;
  Silver: Medal;
  Bronze: Medal;
}

interface Medal {
  String: string;
  Valid: boolean;
}

export default function submission() {
  const [goldMedalChoice, setgoldMedalChoice] = useState<string>(
    "Gold Medal Placeholder",
  );
  const [silverMedalChoice, setsilverMedalChoice] = useState<string>(
    "Silver Medal Placeholder",
  );
  const [bronzeMedalChoice, setbronzeMedalChoice] = useState<string>(
    "Bronze Medal Placeholder",
  );
  async function getMedals() {
    try {
      const submissionURL: string = process.env.NEXT_PUBLIC_SUBMIT as string;
      const response: Response = await fetch(submissionURL, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) storeMedals(data);
      else {
        createToast("Client Side Error", data.error);
      }
    } catch (err) {
      createToast("Server Error", "Oops! Something went wrong");
    }
  }
  function storeMedals(medalObject: Medals) {
    setgoldMedalChoice(medalObject.Gold.String);
    setsilverMedalChoice(medalObject.Silver.String);
    setbronzeMedalChoice(medalObject.Bronze.String);
  }
  getMedals();
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-10">
      <div>
        <h1 className="text-5xl font-bold">Your Medals</h1>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Image src="gold.svg" height={80} width={80} alt="gold.svg" />
        <div className="flex items-center text-3xl font-semibold">
          {goldMedalChoice}
        </div>
        <Image src="silver.svg" height={80} width={80} alt="silver.svg" />
        <div className="flex items-center text-3xl font-semibold">
          {silverMedalChoice}
        </div>
        <Image src="bronze.svg" height={80} width={80} alt="bronze.svg" />
        <div className="flex items-center text-3xl font-semibold">
          {bronzeMedalChoice}
        </div>
      </div>
    </div>
  );
}
