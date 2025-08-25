import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { log } from "../logger.js";

describe("logger", () => {
  it("writes a row to a CSV file", async () => {
    const testFile = path.join(__dirname, "test-worklog.csv");
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date("2025-01-01T00:25:00Z");

    await log(testFile, start, end, 25, "Cooking");

    const content = fs.readFileSync(testFile, "utf-8");

    expect(content).toContain("START,END,MINUTES,LABEL");
    expect(content).toContain("Cooking");
    expect(content).toContain("25");

    // Cleanup
    fs.unlinkSync(testFile);
  });
});
