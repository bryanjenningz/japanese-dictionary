export const formatTime = (time: number): string => {
  const date = new Date(time);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString(undefined, {
      timeStyle: "short",
      hourCycle: "h12",
    })
  );
};
