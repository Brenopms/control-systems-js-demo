import { useState, useEffect } from "react";
import { COLORS } from "../constants/colors";

function ThemeColorSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    setColor(document.documentElement.dataset.color || COLORS[0].id);
  }, []);

  useEffect(() => {
    if (!mounted || color === undefined) return;

    document.documentElement.dataset.color = color;
    localStorage.setItem("color", color);
  }, [color]);

  const onToggle = (newColor: string) => () => {
    setColor(newColor);
  };

  if (!mounted) return null;

  return (
    <div className="mb-16 flex items-center justify-center space-x-3">
      {COLORS.map(({ id, name }) => (
        <span
          key={id}
          onClick={onToggle(id)}
          className={`theme-color ${name} ${color == id && "active"}`}
        ></span>
      ))}
    </div>
  );
}

export default ThemeColorSwitcher;
