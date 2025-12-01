// simulated crypto utilities
export type SimulatedKeyPair = {
  publicKey: string;   // base64-ish string (not a real key)
  secretKeyHint: string; // small hint only
};

export type EncapsulationResult = {
  kem_ct: string;       // simulated ciphertext
  sharedSecret: ArrayBuffer; // raw bytes (kept in-memory)
};

function randBytes(len = 32) {
  const b = new Uint8Array(len);
  window.crypto.getRandomValues(b);
  return b;
}

function toHex(buf: ArrayBuffer) {
  const b = new Uint8Array(buf);
  return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function sha256(input: Uint8Array | ArrayBuffer) {
  // The input is copied into a new Uint8Array to ensure the underlying buffer
  // is a standard ArrayBuffer, not a SharedArrayBuffer, which is not
  // supported by crypto.subtle.digest.
  const data = input instanceof ArrayBuffer ? input : new Uint8Array(input);
  return window.crypto.subtle.digest("SHA-256", data);
}

/** Simulated key generation (demo only) */
export async function simulateKeyGen(): Promise<SimulatedKeyPair> {
  const pkRaw = randBytes(48);
  const skHint = randBytes(8);
  const pub = btoa(toHex(pkRaw.buffer)).slice(0, 64);
  const hint = btoa(toHex(skHint.buffer)).slice(0, 16);
  return { publicKey: pub, secretKeyHint: hint };
}

/** Simulated KEM encapsulation */
export async function simulateEncapsulate(recipientPub: string): Promise<EncapsulationResult> {
  // Create a random ct and a shared secret derived from ct+recipientPub
  const ctRaw = randBytes(1088 % 256 || 128); // length for demo
  const ctB64 = btoa(toHex(ctRaw.buffer)).slice(0, 200);
  const seed = new TextEncoder().encode(ctB64 + recipientPub);
  const shared = await sha256(seed);
  return { kem_ct: ctB64, sharedSecret: shared };
}

/** Simulated KEM decapsulation (receiver) */
export async function simulateDecapsulate(encapsulation: string, recipientSecretHint: string) {
  // in real KEM this would use secret; here we reconstruct in same way as encapsulate demo
  const seed = new TextEncoder().encode(encapsulation + recipientSecretHint);
  // We cannot reconstruct exactly — for demo, hash the encapsulation + hint
  return sha256(seed);
}

/** Derive an AEAD key (simulated HKDF-like) */
export async function deriveAeadKey(sharedSecret: ArrayBuffer, context = "kimi-v5") {
  // HKDF-like: HKDF-Extract (salt=self) + HKDF-Expand-like using SHA-256
  const info = new TextEncoder().encode(context);
  // simple derivation: hash(shared || info)
  const combined = new Uint8Array(sharedSecret.byteLength + info.byteLength);
  combined.set(new Uint8Array(sharedSecret), 0);
  combined.set(info, sharedSecret.byteLength);
  const ok = await sha256(combined);
  return ok; // 32 bytes
}

/** AEAD encrypt (simulated) - returns nonce + ciphertext (base64-ish) */
export async function simulatedAeadEncrypt(keyBuf: ArrayBuffer, plaintext: string) {
  const nonce = randBytes(24);
  // produce ciphertext as hash(key||nonce||plaintext) for demo
  const pt = new TextEncoder().encode(plaintext);
  const combined = new Uint8Array(keyBuf.byteLength + nonce.byteLength + pt.byteLength);
  combined.set(new Uint8Array(keyBuf), 0);
  combined.set(nonce, keyBuf.byteLength);
  combined.set(pt, keyBuf.byteLength + nonce.byteLength);
  const ct = await sha256(combined);
  return {
    nonce: btoa(toHex(nonce.buffer)).slice(0, 32),
    ciphertext: btoa(toHex(ct)).slice(0, 96),
  };
}

/** AEAD decrypt (simulated) - since we derived ct deterministically, decrypt returns plaintext only if key is same */
export async function simulatedAeadDecrypt(keyBuf: ArrayBuffer, nonceB64: string, ciphertextB64: string, expectedPlain: string) {
  // Recompute and compare
  const enc = await simulatedAeadEncrypt(keyBuf, expectedPlain);
  const ok = enc.ciphertext === ciphertextB64 && enc.nonce === nonceB64;
  if (!ok) throw new Error("Authentication failed (simulated)");
  return expectedPlain;
}