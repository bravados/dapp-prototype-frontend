/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: number;
  String: string;
  Address: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Scalar for exposing dates or date times. `Date` should always be used when you're API is exposing
   * dates or date times. It's an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) `String`
   * based on the `Zulu` timezone. This is is basically the same format our API gateway `xws` uses.
   * Valid values are for example `2007-12-24T18:21Z` or `2008-02-01T09:00:22Z`.
   * Also partial dates complaint with [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) like `2020-02`.
   */
  Date: string;
  /** Scalar to signal that this field contains an email address. The contained type is just a `String` */
  Email: string;
  /**
   * An [RFC 3986][rfc_3986], [RFC 3987][rfc_3987], and [RFC 6570][rfc_6570] (level 4) compliant URL `String`.
   */
  URL: string;
  /**
   * A __universally unique identifier (UUID)__ is a 128-bit number used to identify information in computer systems.
   * The term __globally unique identifier (GUID)__ is also used.
   *
   * In its canonical textual representation, the sixteen octets of a `UUID` are represented as 32 hexadecimal (base 16) digits, i
   * displayed in five groups separated by hyphens, in the form `8-4-4-4-12` for a total of 36 characters (32 alphanumeric characters and four hyphens).
   *
   * For example:
   *
   * - `123e4567-e89b-12d3-a456-426655440000`
   * - `xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx`
   *
   * See [here](https://en.wikipedia.org/wiki/Universally_unique_identifier) for more information
   */
  UUID: string;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: number;
};

export type { Scalars };
