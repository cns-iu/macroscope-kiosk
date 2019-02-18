/**
 * Typings for the Macroscope Data CSV.
 */
export interface MacroscopeData {

  /**
   * Holds the identifier that identifier the macroscope in given Iteration Id with given Macroscope Id
   */
  id: string;

  /**
   * Holds the identifier for the Macroscope
   */
  macroId: number;

  /**
   * Holds the identifier for the iteration
   */
  iterationId: number;

  /**
   * Title for the Macroscope
   */
  title: string;

  /**
   * Type of Macroscope, whether we show in Iframe of if it is a Video
   */
  type: string;

  /**
   * The subtitle for the Macroscope
   */
  subtitle: string;

  /**
   * The URL for the Macroscope which we display in the Iframe
   */
  url: string;

  /**
   * The logo for the Macroscope
   */
  logo: string;

  /**
   * The title for the description
   */
  descriptionTitle: string;

  /**
   * The brief detail about the Macroscope
   */
  descriptionShort: string;

  /**
   * Complete description about the Macroscope. This also gets displayed when you click on more info on the modal
   */
  descriptionLong: string;
}


/**
 * Typings for Macrsocope UI Description CSV
 */
export interface MacroscopeUiDescription {

  /**
   * Identifier for the Macroscope
   */
  id: string;

  /**
   * Title for the Macroscope description
   */
  descriptionTitle: string;

  /**
   * The brief detail about the Macroscope
   */
  descriptionShort: string;

  /**
   * The complete detail about the Macroscope
   */
  descriptionLong: string;
}
