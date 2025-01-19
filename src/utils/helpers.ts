/**
 * Converts a string value to a boolean.
 * @param value - The string value to convert (e.g., "1", "0", "true", "false").
 * @returns A boolean value (true or false).
 */
export const toBoolean = (value: any): boolean => {
    return value === '1' || value === true || value?.toString().toLowerCase() === 'true';
};

/**
 * Converts a string value to a number if possible.
 * @param value - The value to convert.
 * @returns A number or null if conversion is not possible.
 */
export const toNumber = (value: any): number | null => {
    const number = Number(value);
    return isNaN(number) ? null : number;
};

/**
 * Converts a date string to a JavaScript Date object.
 * @param value - The date string (e.g., "2024-05-02T11:43:24.183000").
 * @returns A Date object or null if the string is invalid.
 */
export const toDate = (value: string): Date | null => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
};

/**
 * Trims all string fields in an object recursively.
 * @param obj - The object to process.
 * @returns A new object with all string fields trimmed.
 */
export const trimStrings = (obj: Record<string, any>): any => {
    if (Array.isArray(obj)) {
      return obj.map(trimStrings);
    }
    if (obj && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] =
          typeof obj[key] === 'string' ? obj[key].trim() : trimStrings(obj[key]);
        return acc;
      }, {} as Record<string, any>);
    }
    return obj;
  };

/**
 * Validates required fields in an object.
 * @param obj - The object to validate.
 * @param fields - An array of field names to check.
 * @throws An error if a required field is missing or empty.
 */
export const validateRequiredFields = (obj: any, fields: string[]): void => {
    fields.forEach(field => {
        if (!obj[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    });
};

/**
 * Logs an operation duration for debugging purposes.
 * @param label - The label for the operation.
 * @param startTime - The start time as a Date object.
 */
export const logOperationDuration = (label: string, startTime: Date): void => {
    const duration = new Date().getTime() - startTime.getTime();
    console.log(`${label} completed in ${duration}ms`);
};