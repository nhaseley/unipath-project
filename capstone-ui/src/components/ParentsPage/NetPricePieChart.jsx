import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    function getCustomLabels(label) {
      switch (label) {
        case "net_price_0_30000":
          return "$0-$30,000";
        case "net_price_30001_48000":
          return "$30,001-$48,000";
        case "net_price_48001_75000":
          return "$48,001-$75,000";
        case "net_price_75001_111000":
          return "$75,001-$111,000";
        default:
          return "";
      }
    }

    const pieData = Object.entries(data).map(([label, value]) => ({
      label: getCustomLabels(label),
      value: +value,
    }));

    let customColors = [
      "#3F4B3B",
      "#9DCBBA",
      "#1f77b4",
      "#A8763E",
      "#734B5E",
      "#44633F",
      "#3F4B3B",
      "#2ca02c",
      "#8c564b",
    ];
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const colorScale = d3.scaleOrdinal(customColors);
    // console.log("colorScale", d3.schemeCategory10)
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const svg = d3.select(chartRef.current);
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const slices = g
      .selectAll(".slice")
      .data(pie(pieData))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colorScale(i));
    slices
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => {
        const percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
        return `${percentage.toFixed(1)}%`;
      });

    // Add a legend to the pie chart
    const legend = g
      .selectAll(".legend")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (_, i) => `translate(150, ${i * 25 - 50})`);
// .attr('transform', (_, i) => `translate(${width / 2 + radius + 20}, ${i * 25 - pieData.length * 12.5})`);
    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (_, i) => colorScale(i));

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text((d) => d.label);
  }, [data]);

  return <svg ref={chartRef} width="400" height="400" />;
}
