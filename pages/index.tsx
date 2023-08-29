import HistoryCard from "@/components/HistoryCard";
import JournalCard from "@/components/JournalCard";
import LayananCard from "@/components/LayananCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <JournalCard />
      <LayananCard />
      <HistoryCard />
    </>
  );
}
