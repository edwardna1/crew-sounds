import React, { useEffect, useRef, useState } from "react";
// import "./WordCloudWidget.scss";
import * as d3 from "d3";
import { Types } from "types";
// import useWindowDimensions from "../../hooks/WindowDimensions";

import WordCloud from "./WordCloud";
import WordCloudHelper from "@/lib/words";
import { useWindowSize } from "usehooks-ts";

type props = {
  artists: string[];
};
const WordCloudWidget = ({ artists }: props) => {
  const [data, setData] = useState<string[]>([]);

  const [propertiesNames] = useState(["value", "text"]);
  const { width, height } = useWindowSize()

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

  const loadData = () => {
    const words = artists.map((artist: any) => {
      return artist.name;
    });
    setData(words);
  };

  useEffect(() => {
    if (data.length <= 1) loadData();
  });

  return (
    <>
      {data.length > 1 ? (
        <>
          <h3>Word Cloud</h3>
          <WordCloud
            dimensions={dimensions.current}
            data={data}
            propertiesNames={propertiesNames}
          />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};
export default WordCloudWidget;
