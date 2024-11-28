import React from "react";

export type MenuSection = {
  id: string;
  name: string;
  icon?: string;
  badge?: number;
  component?: React.ReactNode;
  parentSectionId?: string;
};
