import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Props to be passed
interface myCardProps {
  goldIndex: number;
  silverIndex: number;
  bronzeIndex: number;
  title: string;
  itemNo: number;
  toggleMedal: (medal: "gold" | "silver" | "bronze", idx: number) => void;
}
const MyCard: React.FC<myCardProps> = ({
  goldIndex,
  silverIndex,
  bronzeIndex,
  title,
  itemNo,
  toggleMedal,
}) => {
  // Call function from parent component to update medal index
  function setMedal(medal: "gold" | "silver" | "bronze", itemNo: number) {
    toggleMedal(medal, itemNo);
  }

  // Create function because tailwind classes where not being rendered by shadcn
  function setBg() {
    if (goldIndex == itemNo) {
      return "#FDE047";
    } else if (silverIndex == itemNo) {
      return "#71717A";
    } else if (bronzeIndex == itemNo) {
      return "#D97706";
    } else return "white";
  }

  // Use variable to keep tract of bgColor
  const bgColor = setBg();

  return (
    <Card style={{ backgroundColor: bgColor }} className="p-0 mb-7">
      <CardHeader className="m-0 flex">
        <CardTitle className="m-0 text-3xl">{title}</CardTitle>
        <CardContent className="block flex self-end gap-5 m-0">
          <Button
            className="p-7 border-2 border-slate-900 bg-slate-100"
            onClick={() => setMedal("gold", itemNo)}
          >
            <Image src="gold.svg" width={40} height={40} alt="gold.svg" />
          </Button>
          <Button
            className="p-7 border-2 border-slate-50 bg-slate-100"
            onClick={() => setMedal("silver", itemNo)}
          >
            <Image src="silver.svg" width={40} height={40} alt="silver.svg" />
          </Button>
          <Button
            className="p-7 border-2 border-slate-50 bg-slate-100"
            onClick={() => setMedal("bronze", itemNo)}
          >
            <Image src="bronze.svg" width={40} height={40} alt="bronze.svg" />
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default MyCard;
