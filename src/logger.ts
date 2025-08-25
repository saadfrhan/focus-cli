import fs from "fs";

export async function log(
  filepath: string,
  start: Date,
  end: Date,
  minutes: number,
  label: string
) {
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, "START,END,MINUTES,LABEL\n");
  }
  const row = `${start.toISOString()},${end.toISOString()},${minutes},${label}`;
  fs.appendFileSync(filepath, row);
}
