import React from "react";

export type MenuSection = {
  id: string;
  name: string;
  icon?: string;
  badge?: number;
  url?: string;
  parentSectionId: string | null;
};
