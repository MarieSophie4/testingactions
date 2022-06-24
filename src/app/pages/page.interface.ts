/**
 * Interface for a page that needs to be loaded in
 */
export interface Pages {
  /**
   * Render a script in module form
   * @param src the source of the script through a link
   * @returns
   */
  renderExternalScript(src: string): HTMLScriptElement;
}
