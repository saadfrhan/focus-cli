# focus cli

a command-line timer & work logger

## setup

```bash
git clone https://github.com/saadfrhan/focus-cli
cd focus-cli
pnpm i
pnpm test
pnpm build
node dist/index.js --help
```

25-min focus session

```bash
node dist/index.js 25 "Deep work"
```

abort with ctrl+c => logs as ABORTED

completed sessions are saved in `worklog.csv`

```
START,END,MINUTES,LABEL
2025-08-25T09:00:00Z,2025-08-25T09:25:00Z,25,Deep Work
2025-08-25T10:00:00Z,2025-08-25T10:12:00Z,12,ABORTED
```
