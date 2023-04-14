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
import { bangers, justHand, kalam } from "util/fonts";

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
        <div className="flex relative w-5/6 md:w-[45rem] bg-[url('/cover.png')] bg-contain bg-center image justify-center items-center">
          <div className="absolute top-4 right-10 flex flex-col items-center">
            <h1 className={`text-slate-500 text-3xl ${justHand.className}`}>
              Starring
            </h1>
            <h1 className={`text-slate-500 text-6xl ${justHand.className}`}>
              {name}
            </h1>
          </div>
          <h1
            className={`text-white text-2xl ${justHand.className} absolute left-1.5 -rotate-[40deg] top-12`}
          >
            {new Date().toDateString()}
          </h1>
          <WordCloud
            dimensions={dimensions.current}
            data={data}
            propertiesNames={propertiesNames}
          />
          <h1
            className={`text-white text-2xl ${kalam.className} absolute left-10 bottom-20  flex flex-wrap`}
          >
            Short term edition
          </h1>
          <h1
            className={`text-white text-2xl absolute right-2 bottom-10 ${kalam.className}`}
          >
            (Test)
          </h1>
        </div>
      ) : (
        // </div>
        <>Loading</>
      )}
    </>
  );
};
export default WordCloudWidget;
