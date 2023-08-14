export const formatTime = (secondsLeft: number): string => {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${
      seconds !== 1 ? "s" : ""
    }`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }
};

export function btcToSatoshis(btc: number) {
  return btc * Math.pow(10, 8);
}

export function satoshisToBtc(satoshis: number) {
  return satoshis / Math.pow(10, 8);
}
