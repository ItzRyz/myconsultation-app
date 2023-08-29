import Journal from "@/models/Journal";
import React from "react";

const JournalCard = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-black mt-8 mb-6">Jurnal</h1>
      <div className="bg-neutral-300 rounded-md w-full h-[70px] flex items-center px-4">
        <div className="bg-gray-700 h-12 w-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default JournalCard;
