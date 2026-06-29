import { z } from "zod";

export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const PROJECT_TYPES = ["web", "mobile", "api"] as const;
export const PROJECT_CATEGORIES = [
  "test-case",
  "product/client",
  "product/myself",
] as const;

export const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;

const localizedString = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

const localizedPath = z.string().min(1);

export const projectImageMedia = z.object({
  kind: z.literal("image"),
  src: localizedPath,
  alt: z.string().min(1),
});

export const projectVideoMedia = z.object({
  kind: z.literal("video"),
  src: localizedPath,
  sources: z
    .object({
      es: localizedPath.optional(),
      en: localizedPath.optional(),
    })
    .optional(),
  poster: localizedPath.optional(),
  posterBackground: z.string().optional(),
  posterSize: z.string().optional(),
  title: z.union([z.string().min(1), localizedString]),
});

export const projectMedia = z.discriminatedUnion("kind", [
  projectImageMedia,
  projectVideoMedia,
]);

export const projectManifest = z.object({
  $schema: z.string().url().optional(),
  version: z.string().regex(SEMVER_REGEX),
  title: z.string().min(1),
  type: z.enum(PROJECT_TYPES),
  category: z.enum(PROJECT_CATEGORIES),
  description: localizedString,
  technologies: z.array(z.string().min(1)).min(1),
  links: z
    .object({
      github: z.string().url().optional(),
      overview: z.string().url().optional(),
      demo: z.string().url().optional(),
    })
    .optional(),
  media: projectMedia,
});

export type ProjectManifest = z.infer<typeof projectManifest>;
export type ProjectMediaManifest = z.infer<typeof projectMedia>;
export type ProjectVideoMediaManifest = z.infer<typeof projectVideoMedia>;
export type ProjectImageMediaManifest = z.infer<typeof projectImageMedia>;

export const CURRENT_MANIFEST_VERSION = "1.0.0";
