import zlib from 'pako';
import * as base45 from 'base45-ts';
import * as cbor from 'cbor-web';
import { cleanInput } from './clean';

/**
 * Parse QR base45 and cbor encoded.
 * @param {string} data Qr string
 * @param {string} DGC_V1_HEADER Prefix header
 * @returns Decoded object
 */
export const parse = async (data: string, DGC_V1_HEADER: string) => {
  const cleaned = cleanInput(data, DGC_V1_HEADER);

  if (!cleaned) {
    throw new Error('Invalid QR data');
  }

  try {
    const b45decoded = base45.decode(cleaned);
    const decompress = zlib.inflate(b45decoded);
    const decoded = await cbor.decodeFirst(decompress);
    let [p, u, cwt, signers] = decoded.value;

    return {
      p,
      u,
      cwt,
      signers,
    };
  } catch (err) {
    throw new Error(`malformed code: ${err}`);
  }
};
