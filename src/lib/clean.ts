/**
 * Removes QR prefix.
 * @param {string} data - QR String
 * @param {string} DGC_V1_HEADER - Prefix to be removed
 * @returns QR string without the prefix
 */
export const cleanInput = (data: string, DGC_V1_HEADER: string) => {
  let result = null;
  if (data.startsWith(DGC_V1_HEADER)) {
    result = data.substring(DGC_V1_HEADER.length);
  }
  return result;
};
