/**
 * [ custom component life cycle ]
 *
 * <create>
 * 1. constructor
 * 2. connectedCallback
 *
 * <move element>
 * 1. disconnectedCallback
 * 2. adoptedCallback
 * 3. connectedCallback
 *
 */

export interface LifeCycle {
  connectedCallback(): void;  // invoked when the custom element is first connected to the document's dom
  adoptedCallback?(): void  // invoked when the custom element is moved to a new document. ( adoptNode() )
  attributeChangedCallback?(): void;  // invoked when one of the custom element's attributes is added, removed or changed
  disconnectedCallback?(): void;  // invoked when the custom element is disconnected from the document's DOM
}
