import { memo } from "react";

interface FlagProps {
  countryCode: string;
  className?: string;
}

// This should match the vertical order of flags.png (from top to bottom)
const COUNTRY_CODES = [
  "AUT",
  "BLR",
  "CAN",
  "CHN",
  "FRA",
  "GER",
  "ITA",
  "NED",
  "NOR",
  "RUS",
  "SUI",
  "SWE",
  "USA",
];

const FLAG_WIDTH = 28;
const FLAG_HEIGHT = 17;

const Flag = memo(({ countryCode, className = "" }: FlagProps) => {
  const index = COUNTRY_CODES.indexOf(countryCode);
  const backgroundPositionY = index >= 0 ? `-${index * FLAG_HEIGHT}px` : "0px";

  return (
    <div
      className={`bg-no-repeat overflow-hidden ${className}`}
      style={{
        width: `${FLAG_WIDTH}px`,
        height: `${FLAG_HEIGHT}px`,
        backgroundImage: "url(/flags.png)",
        backgroundPosition: `0 ${backgroundPositionY}`, // X is 0, Y moves down
      }}
      aria-label={`${countryCode} flag`}
    />
  );
});

Flag.displayName = "Flag";

export default Flag;
