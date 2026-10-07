import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEME_KEY = "stray-table-theme";

function applyTheme(light: boolean) {
  document.documentElement.classList.toggle("light", light);
  document.documentElement.classList.remove("dark");
  try {
    localStorage.setItem(THEME_KEY, light ? "light" : "dark");
  } catch {
    /* private mode can block storage */
  }
}

export function ThemeButton() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      aria-pressed={light}
      onClick={() => {
        const next = !document.documentElement.classList.contains("light");
        applyTheme(next);
        setLight(next);
      }}
    >
      {light ? "Casino" : "Cream"}
    </Button>
  );
}
