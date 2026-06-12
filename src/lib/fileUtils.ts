import { isBinaryFile } from 'isbinaryfile';
import { filesize } from 'filesize';

/**
 * Check if a file is binary
 * @param file - File object or path to check
 * @returns Promise<boolean> - true if file is binary
 */
export async function checkBinaryFile(file: File | string): Promise<boolean> {
  try {
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      return await isBinaryFile(Buffer.from(buffer));
    }
    return await isBinaryFile(file);
  } catch (error) {
    console.error('Binary check failed:', error);
    return false;
  }
}

/**
 * Format file size to human-readable string
 * @param bytes - Size in bytes
 * @param options - Formatting options
 * @returns Formatted size string (e.g., "1.65 kB")
 */
export function formatFileSize(
  bytes: number,
  options?: {
    locale?: string;
    standard?: 'jedec' | 'iec';
    round?: number;
  }
): string {
  return filesize(bytes, {
    standard: options?.standard || 'jedec',
    round: options?.round || 2,
    locale: options?.locale || 'en-US',
  });
}

/**
 * Filter binary files from a list
 * @param files - Array of File objects
 * @returns Promise<File[]> - Array of non-binary files
 */
export async function filterBinaryFiles(files: File[]): Promise<File[]> {
  const checks = await Promise.all(
    files.map(async (file) => ({
      file,
      isBinary: await checkBinaryFile(file),
    }))
  );

  return checks.filter((check) => !check.isBinary).map((check) => check.file);
}

/**
 * Get file info with size formatting
 * @param file - File object
 * @returns File info with formatted size
 */
export async function getFileInfo(file: File) {
  const isBinary = await checkBinaryFile(file);
  return {
    name: file.name,
    size: file.size,
    formattedSize: formatFileSize(file.size),
    type: file.type || 'unknown',
    isBinary,
    lastModified: file.lastModified,
  };
}
