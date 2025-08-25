#!/usr/bin/env node

import { Command } from "commander";
import { log } from "./logger.js";
import { msRemaining } from "./timer.js";

const program = new Command()
  .argument("<minutes>", "Duration of the timer", (value) =>
    parseInt(value, 10)
  )
  .argument("<label>", "Label of the timer")
  .action((minutes: number, label: string) => {
    if (isNaN(minutes) || minutes <= 0) {
      console.error("Minutes must be a positive integer");
      process.exit(1);
    }

    const start = new Date();
    const endTime = new Date(start.getTime() + minutes * 60 * 1000);

    process.on("SIGINT", async () => {
      const now = new Date();
      const elapsedMinutes = Math.floor(
        (now.getTime() - start.getTime()) / 60000
      );
      await log("worklog.csv", start, now, elapsedMinutes, "ABORTED");
      console.log(`\n⚠️  Aborted after ${elapsedMinutes} min`);
      process.exit(0);
    });

    const timer = setInterval(async () => {
      const now = new Date();

      const { ms, mm, ss } = msRemaining(endTime, now);

      if (ms <= 0) {
        clearInterval(timer);
        await log("worklog.csv", start, now, minutes, "ABORTED");
        console.log(
          `\n✅ ${minutes} min focus on "${label}" complete. Logged!`
        );
        process.exit(0);
      }

      process.stdout.write(`\r${mm}:${ss} ${label}`);
    }, 1000);
  })
  .description("Starts a focus timer.");

program.name("focus").description("Focus CLI");

program.parse(process.argv);
