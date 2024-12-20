import { readdirSync } from "node:fs";
import { defineWorkspace } from "vitest/config";
import type { UserProjectConfigExport } from "vitest/config";

export default defineWorkspace(
  readdirSync("./tests", { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .reduce<UserProjectConfigExport[]>((workspaces, dir) => {
      const dirPath = `tests/${dir.name}` as const;

      const tsConfigFiles = readdirSync(dirPath).filter(
        // Do not include temporary vitest tsconfig files
        (it) =>
          it.startsWith("tsconfig.") &&
          it.endsWith(".json") &&
          !it.includes("vitest-temp")
      );

      tsConfigFiles.forEach((tsConfigFileName) => {
        const workspaceName =
          tsConfigFileName === "tsconfig.json"
            ? dir.name
            : `${dir.name}-${tsConfigFileName.split(".")[1]}`;

        const testWorkspaceDir = `${process.cwd()}/${dirPath}`;

        const workspaceConfig: UserProjectConfigExport = {
          test: {
            dir: testWorkspaceDir,
            name: workspaceName,
            include: [],
            exclude: [],
            alias: {},
            typecheck: {
              enabled: true,
              only: true,
              include: ["**/*.test.ts"],
              tsconfig: `${testWorkspaceDir}/${tsConfigFileName}`,
            },
          },
        };
        workspaces.push(workspaceConfig);
      });

      return workspaces;
    }, [])
);
