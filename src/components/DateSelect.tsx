import { Calendar } from "lucide-react";

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateSelect = ({ value, onChange }: DateSelectProps) => {
  return (
    <div className="relative">
      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
      <input
        type="date"
        value={value}
        min={new Date().toISOString().split('T')[0]}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 h-10 rounded-md border border-input bg-background"
      />
    </div>
  );
}; 