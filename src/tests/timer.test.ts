import { describe, it, expect } from "vitest";
import { msRemaining } from "../timer.js";

describe("msRemaining", () => {
  it("1 minute input", () => {
    const end = new Date(60000);
    const now = new Date(0);
    expect(msRemaining(end, now)).toEqual({ ms: 60000, mm: "01", ss: "00" });
  });

  it("0 minute 30 seconds input", () => {
    const end = new Date(30_000);
    const now = new Date(0);
    expect(msRemaining(end, now)).toEqual({ ms: 30000, mm: "00", ss: "30" });
  });
});
