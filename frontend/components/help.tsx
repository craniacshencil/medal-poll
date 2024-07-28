import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const Help: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-2xl hover:underline mb-3">
        Learn More
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">How does this work?</DialogTitle>
          <DialogDescription className="text-md">
            Each card here represents an idea put forward by the members. You
            can award 3 ideas a medal including gold, silver and bronze
            respectively
            <br />
            <Image
              className="inline m-1 mt-3"
              src="gold.svg"
              width={30}
              height={30}
              alt="gold.svg"
            />
            is the gold medal contributing 3 points
            <br />
            <Image
              className="inline m-1"
              src="silver.svg"
              width={30}
              height={30}
              alt="silver.svg"
            />
            is the silver medal contributing 2 points
            <br />
            <Image
              className="inline m-1"
              src="bronze.svg"
              width={30}
              height={30}
              alt="bronze.svg"
            />
            is the bronze medal contributing 1 point
            <br />
            After all users have voted, the idea with the most votes would be
            selected
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Help;
