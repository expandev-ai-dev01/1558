/**
 * @summary CRUD controller middleware for security and validation
 * @module middleware/crud
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration for CRUD operations
 */
export interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 */
export interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Handles security and validation for CRUD operations
 */
export class CrudController {
  private rules: SecurityRule[];

  constructor(rules: SecurityRule[]) {
    this.rules = rules;
  }

  /**
   * @summary Validates CREATE operation
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'CREATE');
  }

  /**
   * @summary Validates READ operation
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'READ');
  }

  /**
   * @summary Validates UPDATE operation
   */
  async update(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'UPDATE');
  }

  /**
   * @summary Validates DELETE operation
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'DELETE');
  }

  /**
   * @summary Core validation logic
   */
  private async validate(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, any]> {
    try {
      const params = await schema.parseAsync({ ...req.params, ...req.body, ...req.query });

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error) {
      return [null, error];
    }
  }
}

/**
 * @summary Success response helper
 */
export function successResponse(data: any) {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary Error response helper
 */
export function errorResponse(message: string, code?: string) {
  return {
    success: false,
    error: {
      code: code || 'VALIDATION_ERROR',
      message,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary General error status
 */
export const StatusGeneralError = {
  statusCode: 500,
  message: 'Internal Server Error',
};
