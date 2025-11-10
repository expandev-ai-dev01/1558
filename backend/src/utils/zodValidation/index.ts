/**
 * @summary Zod validation utilities
 * @module utils/zodValidation
 */

import { z } from 'zod';

/**
 * @summary String validation with max length
 */
export const zString = z.string().min(1);

/**
 * @summary Nullable string with max length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name field validation
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description field validation
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Foreign key validation
 */
export const zFK = z.number().int().positive();

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Bit field validation
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Date string validation
 */
export const zDateString = z.string().datetime();
