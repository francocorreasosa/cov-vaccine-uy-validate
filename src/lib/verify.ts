import * as cbor from 'cbor-web';
import crypto from 'isomorphic-webcrypto';
import { Buffer } from 'buffer';

/**
 * Verifies signed data.
 * @param {string} QRData Qr string.
 * @param {string} publicKey String representation of a key.
 * @param {string} DGC_V1_HEADER Header prefix.
 * @param {number} KEY_DATA_VALUES Default map index data.
 * @returns JSON data or empty array.
 */
import { parse } from './parse';
import { KEY } from './key';

export const verify = async (qrData: string, header = 'HC1:') => {
  let { p, u, cwt, signers } = await parse(qrData, header);
  u = !u.size ? Buffer.alloc(0) : u;

  const sigStructure = ['Signature1', p, u, cwt];
  const toBeSigned = cbor.encode(sigStructure);

  await crypto.ensureSecure();
  const key = await crypto.subtle.importKey(
    'jwk',
    KEY,
    {
      name: 'RSA-PSS',
      hash: { name: 'SHA-256' },
    },
    false,
    ['verify']
  );

  let valid = await crypto.subtle.verify(
    { name: 'RSA-PSS', hash: { name: 'SHA-256' } },
    key,
    signers,
    toBeSigned
  );

  let data = [];

  if (valid) {
    let decodedData = cbor.decode(cwt);
    decodedData = decodedData.get(99);

    if (decodedData) {
      data = JSON.parse(decodedData);
    } else {
      valid = false;
    }
  }

  return {
    data,
    valid,
  };
};
