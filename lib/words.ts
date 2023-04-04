import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Types } from "../types/index";

export default class WordCloudHelper {
  private readonly metric: string[];

  constructor(metric: string[]) {
    this.metric = metric;
  }

  // @ts-ignore
  public xAccessor = (d: Types.Data) => d[this.metric[0]];

  // @ts-ignore
  public yAccessor = (d: Types.Data) => d[this.metric[1]];

  static getDimensions = (
    width: number,
    height: number,
    left: number,
    right: number,
    top: number,
    bottom: number
  ) => {
    const dimensions = {
      width,
      height,
      margin: {
        left,
        right,
        top,
        bottom,
      },
      boundedWidth: 0,
      boundedHeight: 0,
    };
    dimensions.boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    return dimensions;
  };

  static getScales = (
    data: string[],
    width: number,
    height: number,
    metric: string[]
  ) => {
    const helper = new WordCloudHelper(metric);
    return {
      layout: d3Cloud()
        .size([width, height])
        .words(
          data.map((d, index) => {
            const wordSize = 100 - index * 10
            // return { text: d, size: wordSize, test: "haha" };
            return { text: d, size: 10 + Math.random() * 50, test: "haha" };
          })
        )
        .padding(0)
        // eslint-disable-next-line no-bitwise
        // .rotate(() => (~~(Math.random() * 6) - 3) * 30)
        .rotate(0)
        .font("Roboto")
        // @ts-ignore
        .fontSize((d) => {
          return d.size;
        }),
    };
  };
}
