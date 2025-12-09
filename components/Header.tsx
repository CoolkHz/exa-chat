"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg text-foreground">Exa Search</span>
        </div>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
