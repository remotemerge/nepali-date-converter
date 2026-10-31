# Contributing

Changes to Nepali Date Converter must preserve correct date conversions and public API compatibility.

## Before you start

Search existing issues before opening a new one. Use the bug report or change request template when
creating an issue.

Report suspected vulnerabilities through the private process in [SECURITY.md](SECURITY.md). Do not
include sensitive reports in issues, discussions, or pull requests.

## Requirements

Use Bun `>=1.4.3 <2.0.0` to install dependencies, run scripts, and test changes.

Install dependencies from the lockfile:

```sh
bun install --frozen-lockfile
```

## Making changes

Keep each change focused. Preserve the default `DateConverter` export, `toAd()` and `toBs()`, the
result shape `{ year, month, date, day }`, and documented input formats unless the change
explicitly requires otherwise.

Change calendar data in `src/years.ts` or the supported range of 1975 to 2099 BS only with a
reliable source. Never replace the calendar data with a fixed month length or a simple year offset.
Conversions work with calendar days. Keep date arithmetic in UTC so results do not depend on the
user's timezone.

## Tests

Add tests for behavior changes and regression tests for bug fixes. For conversion changes, cover both
directions, first and last supported dates, BS month and year transitions, Gregorian leap days, and
invalid or out-of-range input. Never change reference fixtures in `__tests__/data.json` just to
make a test pass.

Run `bun run test`, `bun run lint`, and `bun run build` before every pull request.
For changes to exports, bundling, or types, also run `bun run test:package` after the build.
This checks ESM and CommonJS consumers under Bun and Node.js, the browser bundle in a Node.js VM,
and TypeScript declarations. Node.js and npm must be installed for these compatibility checks.

Available commands:

| Command                | What it does                                                                   |
| ---------------------- | ------------------------------------------------------------------------------ |
| `bun run test`         | Runs the tests and writes an LCOV coverage report                              |
| `bun run lint`         | Checks code with Oxlint, types with `bun check`, and formatting with `bun fmt` |
| `bun run build`        | Builds bundles and TypeScript declarations                                     |
| `bun run test:package` | Checks the built package after `build`                                         |
| `bun run lint:fix`     | Applies lint fixes and formatting                                              |

## Pull requests

Explain the problem and how your change fixes it. List the checks you ran and their results.
Link the relevant issue when one exists. For calendar data changes, cite the source and add fixtures for the affected
dates in both directions.

Keep the diff limited to the requested change. Do not include generated `dist/` or coverage files,
debugging output, unrelated formatting, or temporary artifacts.
