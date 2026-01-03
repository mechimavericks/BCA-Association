import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getFingerprint() {
  const fp = await FingerprintJS.load();
  const res = await fp.get();
  return res.visitorId;
}
