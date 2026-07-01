# Pinned Task Runner

A drop-in replacement for VS Code's **Tasks: Run Task** picker that adds _real_
pinning. When you pin a task it moves into a loud **★ Pinned** section at the top
and is **removed from the "Recently used" list** — so it never shows up twice.

## Why

VS Code's built-in Run Task picker only has a "recently used" section — there is
no native pinning, and there is no way to keep a task from re-appearing in
recents. This extension fixes that.

## Features

- **★ Pinned** section at the top, always visible.
- Pinned tasks are stripped out of **Recently used** (no duplicates).
- Pin / unpin inline with the pin icon on each row.
- Pins are stored **per workspace**.
- Configurable recents length (`pinnedTaskRunner.maxRecent`, default 5).
- Reads each task's own `icon`/`color`/`detail` straight from `.vscode/tasks.json`
  (the same fields VS Code uses for the task's terminal tab icon) and renders
  them in the picker, e.g.:

  ```jsonc
  {
    "label": "Build",
    "type": "shell",
    "command": "npm run build",
    "icon": { "id": "tools", "color": "terminal.ansiBlue" },
    "detail": "Compiles the TypeScript sources",
  }
  ```

  Tasks without an `icon` fall back to a section-appropriate default (pin /
  history / gear).

## Keybinding

Ships bound to a `cmd+r cmd+r` chord. To match the exact chord you use, open
Keyboard Shortcuts, search `pinnedTaskRunner.run`, and rebind. To fully replace
the built-in, also rebind `workbench.action.tasks.runTask` to something else (or
remove it).
