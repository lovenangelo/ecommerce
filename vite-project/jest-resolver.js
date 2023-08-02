/* eslint-disable no-undef */
import { resolve as _resolve } from "path";

export function resolve(source, file, options) {
  // Handle alias mapping for the @ symbol
  if (source.startsWith("@/")) {
    const srcAlias = _resolve(options.basedir, "src");
    const relativePath = source.slice(2); // Remove the @/ from the source path
    return _resolve(srcAlias, relativePath);
  }

  // For other modules, fall back to the default resolver
  return options.defaultResolver(source, file, options);
}
