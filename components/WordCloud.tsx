import React, { useEffect, useCallback, useState } from "react";
// import "./WordCloud.scss";
import * as d3 from "d3";
import { Types } from "types";
import WordCloudHelper from "@/lib/words";
import { WordMap } from "types";
import { Eczar, Cedarville_Cursive } from "@next/font/google";
import { bangers, lato } from "util/fonts";

interface IWordCloudProps {
  dimensions: Types.Dimensions;
  data: WordMap[];
  propertiesNames: string[];
}

const WordCloud = (props: IWordCloudProps) => {
  const [loaded, setLoaded] = useState(false);

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height);
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width);

  const memoizedDrawCallback = useCallback(() => {
    d3.select("#chart-group").selectAll("*").remove();
  }, []);

  const memoizedUpdateCallback = useCallback(() => {
    const scales = WordCloudHelper.getScales(
      props.data,
      props.dimensions.boundedWidth,
      props.dimensions.boundedHeight,
      props.propertiesNames
    );

    const randomFillColor = () => {
      const x = Math.floor(Math.random() * 256);
      const y = 100 + Math.floor(Math.random() * 256);
      const z = 50 + Math.floor(Math.random() * 256);
      return `rgb(${x},${y},${z})`;
    };

    // draw chart

    const draw = (words: string[]) => {
      d3.select("#chart-group")
        .append("svg")
        .attr("text-anchor", "middle")
        .attr("id", "chart-group-svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("fill", (d) => {
          console.log("ddd", d);
          // @ts-ignore
          return `${d.color}`;
        })
        .style("font-size", (d) => {
          // @ts-ignore
          // return `80px`;
          return `${d.size}px`;
        })
        .style("font-family", bangers.style.fontFamily)
        // .style("font-family", `Impact`)
        .attr("text-anchor", "middle")
        .attr("transform", (d) => {
          // @ts-ignore
          return `translate(${[d.x, d.y]})rotate(${d.rotate})`;
        })
        .text((d) => {
          // @ts-ignore
          return d.text;
        });
    };

    const layout = scales.layout.on("end", draw);

    layout.start();
  }, [props.data, props.dimensions, props.propertiesNames]);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      memoizedDrawCallback();
      memoizedUpdateCallback();
    } else {
      memoizedDrawCallback();
      memoizedUpdateCallback();
    }
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback]);

  useEffect(() => {
    const isNewHeight = prevHeight !== props.dimensions.height;
    const isNewWidth = prevWidth !== props.dimensions.width;
    if (isNewHeight || isNewWidth) {
      setPrevWidth(props.dimensions.height);
      setPrevHeight(props.dimensions.width);
      memoizedDrawCallback();
      memoizedUpdateCallback();
    }
  }, [
    memoizedDrawCallback,
    memoizedUpdateCallback,
    prevHeight,
    prevWidth,
    props.dimensions.height,
    props.dimensions.width,
  ]);

  return (
    <div id="div">
      <svg
        id="wrapper"
        width={props.dimensions.width}
        height={props.dimensions.height}
      >
        <g
          id="bounds"
          style={{
            transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)`,
          }}
        >
          <g id="chart-group" />
        </g>
      </svg>
    </div>
  );
};

export default WordCloud;
