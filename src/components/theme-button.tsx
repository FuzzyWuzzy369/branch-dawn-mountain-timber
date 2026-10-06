import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const THEME_KEY = "stray-table-theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {
    /* private mode can block storage */
  }
}

export function ThemeButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      aria-pressed={dark}
      onClick={() => {
        const next = !document.documentElement.classList.contains("dark");
        applyTheme(next);
        setDark(next);
      }}
    >
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
