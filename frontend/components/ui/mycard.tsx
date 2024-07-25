import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function MyCard({ title }) {
  return (
    <Card className="mb-7">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>This is a card</CardDescription>
    </Card>
  );
}
