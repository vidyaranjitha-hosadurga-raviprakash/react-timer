const getGreet = (hrs) => {
  if (hrs < 12) return { DE: "Guten Morgen", EN: "Good Morning" };
  if (hrs >= 12 && hrs <= 18) return { DE: "Guten Tag", EN: "Good Afternoon" };
  if (hrs >= 18 && hrs <= 21) return { DE: "Guten Abend", EN: "Good Evening" };
  return { DE: "Gute Nacht", EN: "Good Night" };
};

const options = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: false,
};

export const getTimeDate = () => {
  const d = new Date();
  const hrs = d.getHours();
  let [date, time] = d.toLocaleString("en-IN", options).split("at");
  const greet = getGreet(hrs);
  return { date, time, greet };
};
