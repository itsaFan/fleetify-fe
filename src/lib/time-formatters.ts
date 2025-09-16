

export const TIME_OPTIONS: string[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00:00`;
});