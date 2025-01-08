import { Users } from "lucide-react";

interface PassengerSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const PassengerSelect = ({ value, onChange }: PassengerSelectProps) => {
  return (
    <div className="relative">
      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <select 
        id="passengers"
        className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num}>
            {num} {num === 1 ? "passager" : "passagers"}
          </option>
        ))}
      </select>
    </div>
  );
}; 