import pym from 'pym.js';

/**
 * @param message The message data.
 */
export interface onMessageCallback {
  (message: string): void
}

/**
 * Configuration for the child instance.
 */
export interface ChildConfig {
  /**
   * Callback invoked after receiving a resize event from the parent
   */
  renderCallback?(): void
  /**
   * xdomain to validate messages received
   */
  xdomain?: string
  /**
   * polling frequency in milliseconds to send height to parent
   */
  polling?: number
  /**
   * parent container id used when navigating the child iframe to a new page but we want to keep it responsive.
   */
  id?: number
  /**
   * if passed it will be override the default parentUrl query string parameter name expected on the iframe src
   */
  parenturlparam?: string
}

/**
 * A class for creating a child window.
 */
export declare class Child {
  /**
   * @param config Configuration for the child instance.
   */
  constructor(config?: ChildConfig)
  /**
   * Navigate parent to a given url.
   * @param url The url to navigate to.
   */
  navigateParentTo(url: string): void
  /**
   * Bind a callback to a given messageType from the child.
   * 
   * Reserved message names are: `width`.
   * @param messageType The type of message being listened for.
   * @param callback The callback to invoke when a message of the given type is received.
   */
  onMessage(messageType: string, callback: onMessageCallback): void
  /**
   * Unbind child event handlers and timers.
   */
  remove(): void
  /**
   * Scroll parent to a given element id.
   * @param hash The id of the element to scroll to.
   */
  scrollParentTo(hash: string): void
  /**
   * Scroll parent to a given child element id.
   * @param id The id of the child element to scroll to.
   */
  scrollParentToChildEl(id: string): void
  /**
   * Scroll parent to a particular child offset.
   * @param pos The offset of the child element to scroll to.
   */
  scrollParentToChildPos(pos: number): void
  /**
   * Transmit the current iframe height to the parent.
   * 
   * Call this directly in cases where you manually alter the height of the iframe contents.
   */
  sendHeight(): void
  /**
   * Send a message to the the Parent
   * @param messageType The type of message to send.
   * @param message The message data to send.
   */
  sendMessage(messageType: string, message: string): void
}

/**
 * Configuration for the parent instance.
 */
export interface ParentConfig {
  xdomain?: string
  title?: string
  name?: string
  id?: string
  allowfullscreen?: boolean
  sandbox?: string
  parenturlparam?: string
  parenturlvalue?: string
  optionalparams?: string
  trackscroll?: boolean
  scrollwait?: number
}

/**
 * The Parent half of a response iframe.
 */
export declare class Parent {
  /**
   * @param id The id of the div into which the iframe will be rendered.
   * @param url The url of the iframe source.
   * @param config Configuration for the parent instance.
   */
  constructor(id: string, url: string, config?: ParentConfig)
  /**
   * Bind a callback to a given messageType from the child.
   * 
   * Reserved message names are: `height`, `scrollTo` and `navigateTo`.
   * @param messageType The type of message being listened for.
   * @param callback The callback to invoke when a message of the given type is received.
   */
  onMessage(messageType: string, callback: onMessageCallback): void
  /**
   * Remove this parent from the page and unbind it's event handlers.
   */
  remove(): void
  /**
   * Send a message to the the child.
   * @param messageType The type of message to send.
   * @param message The message data to send.
   */
  sendMessage(messageType: string, message: string): void
  /**
   * Transmit the current viewport and iframe position to the child.
   * Sends viewport width, viewport height
   * and iframe bounding rect top-left-bottom-right
   * all separated by spaces
   * 
   * You shouldn't need to call this directly.
   */
  sendViewportAndIFramePosition(): void
  /**
   * Transmit the current iframe width to the child.
   * 
   * You shouldn't need to call this directly.
   */
  sendWidth(): void
}

interface Pym {
  Child: typeof Child
  Parent: typeof Parent
  autoInitInstances: []
  autoInit(doNotRaiseEvents: boolean): void
}

export * from 'pym.js';
export default pym as Pym
