export const getTime = (timestamp: Date) => {
  if (!(timestamp instanceof Date)) return "Invalid Date";
  const units = [
    {divisor: 30 * 24 * 60 * 60 * 1000, singular: "month", plural: "months"},
    {divisor: 7 * 24 * 60 * 60 * 1000, singular: "week", plural: "weeks"},
    {divisor: 24 * 60 * 60 * 1000, singular: "day", plural: "days"},
    {divisor: 60 * 60 * 1000, singular: "hour", plural: "hours"},
    {divisor: 60 * 1000, singular: "minute", plural: "minutes"},
  ];

  const timeDifference = Date.now() - timestamp.getTime();

  for (const unit of units) {
    if (timeDifference >= unit.divisor) {
      const timeAgo = Math.floor(timeDifference / unit.divisor);
      return `${timeAgo} ${timeAgo > 1 ? unit.plural : unit.singular} ago`;
    }
  }

  return "just now";
};

export const getDate = (date: Date): string => {
  // Extract the day, month, and year from the date.
  const day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "long",
  });
  const year = date.getFullYear();

  // Determine the correct ordinal suffix for the day.
  // Ie, zeroth, first, second
  const suffix =
    day > 3 && day < 21
      ? "th"
      : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][day % 10];

  // Return the formatted date string.
  return `${month} ${day}${suffix}, ${year}`;
};

export const getDollarProfit = (
  profit: number,
  {
    dollar = false,
    precision = false,
    abbreviate = false,
  }: {dollar?: boolean; precision?: boolean; abbreviate?: boolean} = {}
) => {
  const abbreviateNumber = (num: number) => {
    const absNum = Math.abs(num);
    if (absNum >= 1_000_000_000)
      return (absNum / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "b";
    if (absNum >= 1_000_000)
      return (absNum / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
    if (absNum >= 1_000)
      return (absNum / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return absNum.toFixed(0);
  };

  const formattedProfit = abbreviate
    ? abbreviateNumber(profit)
    : commafy(profit, precision);
  const formattedString = dollar ? `$${formattedProfit}` : formattedProfit;

  if (profit < 0) {
    return `-${formattedString}`;
  } else {
    return formattedString;
  }
};

export const commafy = (num: number, precision = false) => {
  if (precision)
    return Math.abs(num)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Math.abs(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getFormString = (key: string, formData: FormData): string =>
  (formData.get(key) as string | null) ?? "";
