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

export type WordMap = {
  name: string;
  size: number;
  color: string;
  shadow: string;
};
