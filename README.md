# vitest-typecheck-ts-config-reproduction

```sh
pnpm install
```

```sh
pnpm run test
```

Using `vitest.workspace.ts`, I cycle through all the folders in the `tests` directory.
For each folder, I check for the existence of a file starting with tsconfig.
For each matching file, I create a workspace with `test.typecheck.tsconfig` referencing the corresponding config file.

> [!CAUTION]
> When running `vitest`, I expect each case folder to contain two temporary `tsconfig` files.
> Currently, only one is present.
