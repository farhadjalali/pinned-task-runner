import * as fs from "node:fs";
import * as vscode from "vscode";
import { parse as parseJsonc } from "jsonc-parser";

// Metadata that only exists in the raw tasks.json — vscode.Task (from
// fetchTasks()) doesn't expose `icon`/`color`, so we read the file ourselves.
export type TaskMeta = {
  icon?: string;
  color?: string;
  detail?: string;
};

type RawTask = {
  label?: string;
  detail?: string;
  icon?: { id?: string; color?: string };
};

function readTasksJson(folder: vscode.WorkspaceFolder): RawTask[] {
  const path = vscode.Uri.joinPath(folder.uri, ".vscode", "tasks.json").fsPath;
  try {
    const text = fs.readFileSync(path, "utf8");
    const root = parseJsonc(text) as { tasks?: RawTask[] } | undefined;
    return root?.tasks ?? [];
  } catch {
    return [];
  }
}

// Keyed by task label (== vscode.Task.name for workspace-defined tasks).
export function loadTaskMeta(): Map<string, TaskMeta> {
  const map = new Map<string, TaskMeta>();
  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    for (const raw of readTasksJson(folder)) {
      if (!raw.label) continue;
      map.set(raw.label, {
        icon: raw.icon?.id,
        color: raw.icon?.color,
        detail: raw.detail,
      });
    }
  }
  return map;
}
