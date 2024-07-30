import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { keyValue } from "@/app/polling/page";

interface leaderboardProps {
  goldIndex: number;
  silverIndex: number;
  bronzeIndex: number;
  names: keyValue[];
}
const Leaderboard: React.FC<leaderboardProps> = ({
  goldIndex,
  silverIndex,
  bronzeIndex,
  names,
}) => {
  let goldName = "NaN";
  let silverName = "NaN";
  let bronzeName = "NaN";
  if (goldIndex != -1) goldName = names[goldIndex].value;
  if (silverIndex != -1) silverName = names[silverIndex].value;
  if (bronzeIndex != -1) bronzeName = names[bronzeIndex].value;
  return (
    <div className="fixed right-20">
      <Popover>
        <PopoverTrigger className="text-xl">Your choices</PopoverTrigger>
        <PopoverContent>
          <h1 className="text-center text-2xl font-bold mb-3">Medals</h1>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <Image src="gold.svg" width={30} height={30} alt="gold.svg" />
              <Image src="silver.svg" width={30} height={30} alt="silver.svg" />
              <Image src="bronze.svg" width={30} height={30} alt="bronze.svg" />
            </div>
            <div className="flex flex-col gap-3">
              <p>{goldName}</p>
              <p>{silverName}</p>
              <p>{bronzeName}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Leaderboard;
