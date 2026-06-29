import data from "./projects-index.json";
import type { ProjectIndexEntry } from "@schemas/project-index";

export const projectIndex: readonly ProjectIndexEntry[] =
  data as readonly ProjectIndexEntry[];
