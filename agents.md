# AI Agent Guidelines - Portfolio Project

This document contains universal guidelines for AI agents working on this portfolio project.

## Project Overview

This is an Astro-based portfolio website with multi-language support (Spanish and English). The project follows modern web development practices with TypeScript and component-based architecture.

## Core Rules

### 1. Multi-Language Support

**Structure**: All translations are organized in nested objects following the pattern `section.subsection.key`.

**Location**: Translation files are located in `/src/lang/`:

- `es.ts` - Spanish translations (default language)
- `en.ts` - English translations

**Usage**: Use the `useLang` utility to access translations:

```typescript
import useLang from "@/utils/useLang";

const { t, lang } = useLang(Astro.url);

// Access nested translations using dot notation
const aboutText = t("home.nav.about");
const title = t("home.title");
```

**Adding New Translations**:

1. Add the key to `es.ts` first (source of truth for type definitions)
2. Add the corresponding translation to `en.ts` (must match the structure)
3. Use dot notation to access: `t('section.subsection.key')`

**Example Structure**:

```typescript
const es = {
  home: {
    title: "Inicio",
    nav: {
      about: "Acerca de",
      projects: "Proyectos",
    },
  },
  about: {
    title: "Acerca de",
    description: "Información sobre mí",
  },
};
```

### 2. Code Organization

- **Components**: Place reusable components in `/src/components/`
- **Pages**: Astro pages go in `/src/pages/`
- **Utilities**: Helper functions and hooks in `/src/utils/`
- **Styles**: Global styles and CSS modules as needed

### 3. TypeScript Best Practices

- Always use TypeScript for type safety
- Export types when they're used across multiple files
- Use `Lang` type from `es.ts` to ensure translation consistency
- Avoid using `any` unless absolutely necessary

### 4. Naming Conventions

- **Files**: Use kebab-case for file names (e.g., `use-lang.ts`)
- **Components**: Use PascalCase for component names (e.g., `NavBar.astro`)
- **Functions**: Use camelCase for function names (e.g., `getLangFromUrl`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `DEFAULT_LANG`)

### 5. Documentation

When making significant changes:

1. Update relevant comments in the code
2. Update this `agents.md` if adding new patterns or rules
3. Document complex logic with JSDoc comments

## Common Tasks

### Adding a New Language

1. Create a new file in `/src/lang/` (e.g., `fr.ts`)
2. Import the `Lang` type from `es.ts`
3. Implement all translations matching the structure
4. Add the language to the `ui` object in `useLang.ts`
5. Update routing if needed

### Adding New Translation Keys

1. Add to `es.ts` first (maintains type safety)
2. Add to all other language files (`en.ts`, etc.)
3. Use in components with `t('your.new.key')`

### Working with Astro Components

- Use `Astro.url` to get the current URL for language detection
- Pass translations as props when needed
- Keep components focused and reusable

## Project-Specific Patterns

### Language Detection

The project uses URL-based language detection:

- `/es/...` - Spanish
- `/en/...` - English
- Default: Spanish

### Translation Function

The `t()` function:

- Accepts dot notation strings (e.g., `'home.nav.about'`)
- Returns the translated string
- Falls back to the key itself if translation not found

## Before Starting Work

1. Review the current language structure in `/src/lang/`
2. Check existing components for patterns to follow
3. Ensure you understand the nested translation structure

## After Completing Work

1. Test that all translations work correctly
2. Verify type safety (no TypeScript errors)
3. Ensure both languages have matching structures
4. Update documentation if you've added new patterns
