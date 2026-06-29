export const DEFAULT_CODE = `/**
 * @typedef {Object} FileOccurrence
 * @property {Object} position
 * @property {number} position.start
 * @property {number} position.end
 * @property {Object.<string, *>} metadata
 */

/**
 * @param {Object} segment
 * @param {string} segment.id
 * @param {string} segment.originalText
 * @param {string} segment.machineTranslation
 * @param {string} segment.manualTranslation
 * @param {Object.<sting, FileOccurrence[]>} segment.fileOccurrences
 * @return {Promise<void>}
 */
return async function (segment) {
  console.log("Hello, world!");
}`;
