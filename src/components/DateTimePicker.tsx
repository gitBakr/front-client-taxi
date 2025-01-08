import React, { useMemo } from 'react';
import { Label } from './ui/label';

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  minDate?: string;
  label?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  label = "Date et heure"
}) => {
  // Obtenir la date et l'heure actuelles
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Générer les options de temps par intervalles de 30 minutes
  const timeOptions = useMemo(() => {
    const options = [];
    const isToday = date === today;

    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ['00', '30']) {
        // Pour aujourd'hui, ne montrer que les heures futures
        if (isToday) {
          const timeInMinutes = hour * 60 + parseInt(minute);
          const currentTimeInMinutes = currentHour * 60 + currentMinute;
          if (timeInMinutes <= currentTimeInMinutes) continue;
        }

        const formattedHour = hour.toString().padStart(2, '0');
        options.push(`${formattedHour}:${minute}`);
      }
    }
    return options;
  }, [date, today, currentHour, currentMinute]);

  // Sélectionner automatiquement le premier créneau disponible si l'heure actuelle n'est plus valide
  React.useEffect(() => {
    if (timeOptions.length > 0 && !timeOptions.includes(time)) {
      onTimeChange(timeOptions[0]);
    }
  }, [timeOptions, time, onTimeChange]);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => {
            onDateChange(e.target.value);
            // Si on change pour aujourd'hui, vérifier l'heure
            if (e.target.value === today && !timeOptions.includes(time)) {
              onTimeChange(timeOptions[0]);
            }
          }}
          className="p-2 border rounded-md"
        />
        <select
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="p-2 border rounded-md"
        >
          {timeOptions.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 