"use client";
import React, { useEffect, useRef, useState } from "react";
// import "./WordCloudWidget.scss";
import * as d3 from "d3";
import { Types } from "types";
// import useWindowDimensions from "../../hooks/WindowDimensions";

import WordCloud from "./WordCloud";
import WordCloudHelper from "@/lib/words";
import { useWindowSize } from "usehooks-ts";
import { WordMap } from "../types/index";

type props = {
  artists: WordMap[];
  name: string;
};
const WordCloudWidget = ({ artists, name }: props) => {
  const [data, setData] = useState<WordMap[]>([]);

  const [propertiesNames] = useState(["value", "text"]);
  // const { width, height } = useWindowSize()
  const width = 880;
  const height = 1000;

  const dimensions = useRef() as { current: Types.Dimensions };
  dimensions.current = WordCloudHelper.getDimensions(
    width * 0.9,
    height * 0.9,
    30,
    50,
    10,
    50
  );

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current =
      WordCloudHelper.getDimensions(width * 0.9, height * 0.9, 30, 50, 10, 50);
    // console.log(dimensions.current)
  }, [width, height, dimensions]);

  const loadData = async () => {
    setData(artists);
  };

  useEffect(() => {
    if (data.length <= 1) loadData();
  });

  return (
    <>
      {data.length > 1 ? (
        <div className="flex flex-col items-center">
          <h1>{name}`s word cloud: </h1>
          <WordCloud
            dimensions={dimensions.current}
            data={data}
            propertiesNames={propertiesNames}
          />
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};
export default WordCloudWidget;
