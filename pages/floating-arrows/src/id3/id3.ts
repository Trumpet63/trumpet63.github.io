import {ID3Tag, parse} from './id3Tag';
import {BrowserFileReader} from './browserFileReader';
import {Reader} from './reader';

/* This whole folder of code was taken from https://github.com/43081j/id3
   and then edited just to make it work without errors. It's MIT licensed.
*/

const SUPPORTS_FILE =
  typeof window !== 'undefined' &&
  'File' in window &&
  'FileReader' in window &&
  typeof ArrayBuffer !== 'undefined';

/**
 * Parses ID3 tags from a given reader
 * @param {Reader} reader Reader to use
 * @return {Promise<ID3Tag>}
 */
export async function fromReader(reader: Reader): Promise<ID3Tag | null> {
  await reader.open();

  const tags = await parse(reader);

  await reader.close();

  return tags;
}

/**
 * Parses ID3 tags from a File instance
 * @param {File} file File to parse
 * @return {Promise<ID3Tag>}
 */
export function fromFile(file: File): Promise<ID3Tag | null> {
  if (!SUPPORTS_FILE) {
    throw new Error(
      'Browser does not have support for the File API and/or ' + 'ArrayBuffers'
    );
  }

  return fromReader(new BrowserFileReader(file));
}
