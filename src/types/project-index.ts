import type { ProjectCardSize, ProjectCategory, ProjectType } from "@consts/projects";

export interface ProjectOverrides {
  size?: ProjectCardSize;
  category?: ProjectCategory;
  type?: ProjectType;
}

export interface ProjectIndexEntryExplicit {
  kind: "explicit";
  github: string;
  branch?: string;
  overrides?: ProjectOverrides;
}

export interface ProjectIndexDiscovery {
  kind: "discovery";
  discovery: {
    owner: string;
    topic?: string;
    includeForks?: boolean;
    includeArchived?: boolean;
    branch?: string;
  };
}

export type ProjectIndexEntry = ProjectIndexEntryExplicit | ProjectIndexDiscovery;

export interface DiscoveredProject {
  github: string;
  branch: string;
  overrides?: ProjectOverrides;
}
