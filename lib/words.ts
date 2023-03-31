import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";

const wordCloud = (wordList: Array<d3Cloud.Word>) => {
  let svg: any = d3.select("svg").attr("width", 850).attr("height", 350);
  d3.layout.cloud().size([800, 300]).words(wordList);
  return svg;
  // return <div>svg</div>;
};

export default wordCloud;
