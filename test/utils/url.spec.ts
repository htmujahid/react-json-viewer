import { isUrl } from "../../src/utils/url";

describe('URL utils', () => {
  test('should return true if url is valid', () => {
    expect(isUrl('https://www.google.com')).toBeTruthy();
  });

  test('should return false if url is invalid', () => {
    expect(isUrl('htts://www.google')).toBeFalsy();
  });
});

