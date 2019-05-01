import assert from "assert";
import util from "util";
import { ExtensionCodec, EXT_TIMESTAMP } from "../src/ExtensionCodec";
import { encodeUint32 } from '../src/utils/int';

describe("ExtensionCodec", () => {

  const defaultCodec = ExtensionCodec.defaultCodec;
  context("timestamp", () => {
    it("encodes and decodes a date without milliseconds (timestamp 32)", () => {
      const date = new Date(1556633024000);
      const encoded = defaultCodec.tryToEncode(date);
      assert.deepStrictEqual(defaultCodec.decode(EXT_TIMESTAMP, encoded!.data), date, `date: ${date.toISOString()}, encoded: ${util.inspect(encoded)}`);
    });

    it("encodes and decodes a date with milliseconds (timestamp 64)", () => {
      const date = new Date(1556633024123);
      const encoded = defaultCodec.tryToEncode(date);
      assert.deepStrictEqual(defaultCodec.decode(EXT_TIMESTAMP, encoded!.data), date, `date: ${date.toISOString()}, encoded: ${util.inspect(encoded)}`);
    });

    it("encodes and decodes a future date (timestamp 96)", () => {
      const date = new Date(0x400000000 * 1000);
      const encoded = defaultCodec.tryToEncode(date);
      assert.deepStrictEqual(defaultCodec.decode(EXT_TIMESTAMP, encoded!.data), date, `date: ${date.toISOString()}, encoded: ${util.inspect(encoded)}`);
    });
  });
});
