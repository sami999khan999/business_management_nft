"use client";

import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";
import React, { ReactNode } from "react";

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: CustomThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
