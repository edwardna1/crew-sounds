import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Types, WordMap } from "../types/index";
import { Eczar } from "@next/font/google";
import { bangers } from "util/fonts";
const eczar = Eczar({
  subsets: ["latin"],
  variable: "--font-eczar",
});
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
    data: WordMap[],
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
            return {
              text: d.name,
              size: d.size,
              color: d.color,
              shadow: d.shadow
            };
            // return { text: d, size: 10 + Math.random() * 50, test: "haha" };
          })
        )
        .padding(0)
        // eslint-disable-next-line no-bitwise
        .rotate((d, index) => {
          return index !== 0 ? (~~(Math.random() * 6) - 3) * 5 : 0;
        })
        // .spiral("archemidean")
        // .rotate(0)
        .font((d, index) => {
          return bangers.style.fontFamily;
        })
        // @ts-ignore
        .fontSize((d) => {
          return d.size;
        })
        .random(() => {
          return 0.5;
        }),
    };
  };
}
