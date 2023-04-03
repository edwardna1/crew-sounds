export namespace Types {
  export type Data = {
    value?: number;
    text?: string;
  };
  export type Dimensions = {
    width: number;
    height: number;
    margin: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    boundedWidth: number;
    boundedHeight: number;
  };
}
