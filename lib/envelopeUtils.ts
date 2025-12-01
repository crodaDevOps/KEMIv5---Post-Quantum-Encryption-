
export function short(s?: string) {
  if (!s) return "";
  if (s.length < 32) return s;
  return `${s.slice(0, 12)}…${s.slice(-8)}`;
}

export function toBase64Hex(buf: ArrayBuffer) {
  const u = new Uint8Array(buf);
  const hex = Array.from(u).map((b) => b.toString(16).padStart(2, "0")).join("");
  return btoa(hex).slice(0, 128);
}

export function randHex(len = 16) {
  const arr = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function demoSha256(input: string) {
  const enc = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return toBase64Hex(digest);
}

export function estimateEnvelopeSize(envelope: Record<string, any>) {
  // rough size estimator in bytes (utf-8 length)
  const str = JSON.stringify(envelope);
  return new TextEncoder().encode(str).length;
}

/** shallow diff of two JSON-compatible objects */
export function jsonDiff(a: any, b: any) {
  const diffs: { path: string; a: any; b: any }[] = [];
  function walk(x: any, y: any, path: string) {
    if (typeof x !== typeof y) {
      diffs.push({ path, a: x, b: y });
      return;
    }
    if (x && y && typeof x === "object") {
      const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
      keys.forEach((k) => walk(x[k], y[k], path ? `${path}.${k}` : k));
      return;
    }
    if (x !== y) diffs.push({ path, a: x, b: y });
  }
  walk(a, b, "");
  return diffs;
}
