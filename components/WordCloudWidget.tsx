"use client";
import React, { useEffect, useRef, useState } from "react";
// import "./WordCloudWidget.scss";
import * as d3 from "d3";
import { Types } from "types";
// import useWindowDimensions from "../../hooks/WindowDimensions";
import Image from "next/image";
import WordCloud from "./WordCloud";
import WordCloudHelper from "@/lib/words";
import { useWindowSize } from "usehooks-ts";
import { WordMap } from "../types/index";
import { bangers } from "util/fonts";

type props = {
  artists: WordMap[];
  name: string;
};
const WordCloudWidget = ({ artists, name }: props) => {
  const [data, setData] = useState<WordMap[]>([]);

  const [propertiesNames] = useState(["value", "text"]);
  const { width, height } = useWindowSize();
  // const width = 550;
  // const height = 844;
  const dimensions = useRef() as { current: Types.Dimensions };
  dimensions.current = WordCloudHelper.getDimensions(
    width * 0.9,
    height * 0.9,
    10,
    10,
    0,
    50
  );

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current =
      WordCloudHelper.getDimensions(width * 0.9, height * 0.9, 10, 10, 0, 50);
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
        <div className="flex flex-col items-center z-40 relative">
          {/* <Image
            alt="comic-book"
            src="/cover.png"
            width={300}
            height={550}
            className="w-[30rem] absolute"
          /> */}
          <h1
            className={`text-slate-500 text-3xl ${bangers.className} absolute right-10`}
          >
            {name}
          </h1>
          <h1
            className={`text-white text-2xl ${bangers.className} relative left-7 -rotate-[40deg] top-10`}
          >
            {new Date().toDateString()}
          </h1>
          <h1
            className={`text-slate-500 text-3xl ${bangers.className} absolute`}
          >
            Starring
          </h1>
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
