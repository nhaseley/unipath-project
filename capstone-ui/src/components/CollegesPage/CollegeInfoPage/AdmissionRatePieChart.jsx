import { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function AdmissionRatePieChart({ admissionRate }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { label: "Admitted", value: admissionRate },
      { label: "Not Admitted", value: 100 - admissionRate },
    ];

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const colorScale = d3.scaleOrdinal().range(["#4caf50", "#b7091d"]);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const svg = d3.select(chartRef.current);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const slices = g
      .selectAll(".slice")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colorScale(i));

    // Data labels
    slices
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "white")
      .text((d) => `${d.data.value.toFixed(1)}%`);
    // Legend
    const legend = g
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (_, i) => `translate(120, ${i * 25 - 50})`);

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
  }, [admissionRate]);

  return <svg ref={chartRef} width="400" height="200" />;
}