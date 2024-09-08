import { toast } from "sonner";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export function createToast(title: string, message: string) {
  toast(
    <div className={inter.className + "px-4"}>
      <strong className="text-base">{title}</strong>
      <p>{message}</p>
    </div>,
  );
}
