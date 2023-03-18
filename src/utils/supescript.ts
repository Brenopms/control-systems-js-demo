const superMap = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

const powerRegexp = /(s\^[0-9]*)/g;

export const toSuperscriptExpression = (expression: string): string => {
  const superscriptExpression = expression.replaceAll(
    powerRegexp,
    (subString) => {
      const replacement =
        "s" +
        subString
          .split("")
          .filter((char) => char !== "s" && char !== "^")
          .map((num) => superMap[num as keyof typeof superMap])
          .join("");

      return replacement;
    }
  );

  return superscriptExpression;
};
