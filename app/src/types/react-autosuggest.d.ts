declare module 'react-autosuggest/dist/theme' {
  declare const defaultTheme: Record<string, string>;
  declare function mapToAutowhateverTheme(theme: Record<string, string>): Record<string, string>;

  export { defaultTheme, mapToAutowhateverTheme };
}
