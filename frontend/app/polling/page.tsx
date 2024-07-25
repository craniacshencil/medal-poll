"use client";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import MyCard from "@/components/ui/mycard";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
interface keyValue {
  key: number;
  value: string;
}

export default function Polling() {
  const choices: keyValue[] = [
    { key: 1, value: "Fintech" },
    { key: 2, value: "Biotech" },
    { key: 3, value: "Computational Physics" },
    { key: 4, value: "Origamic Architecture" },
    { key: 5, value: "Quantum Computing" },
    { key: 6, value: "Computational Biology" },
    { key: 7, value: "Computer Science" },
    { key: 8, value: "Disaster Management" },
    { key: 9, value: "Cybersecurity" },
  ];
  const cardItems = choices.map((item) => (
    <li key={item.key}>
      <MyCard title={item.value} />
    </li>
  ));
  return (
    <div className="m-10 flex justify-center">
      <section className="flex items-center flex-col w-2/3 mt-20 m-5 gap-3">
        <h1 className={`${inter.className} text-5xl font-extrabold mb-3`}>
          Make your choices here
        </h1>
        <Button className="max-w-xs text-xl">Learn more</Button>
        <ul className="w-full">{cardItems}</ul>
      </section>
    </div>
  );
}
