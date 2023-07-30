import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TuitionBarChart({ tuitionData, customColors }) {
  const chartRef = useRef(null);

  useEffect(() => {
    function getCustomLabels(label) {
      switch (label) {
        case "tuition_in_state":
          return "In State";
        case "tuition_out_of_state":
          return "Out of State";
        default:
          return "";
      }
    }

    // Prepare the data
    const data = Object.entries(tuitionData).map(([timePoint, earnings]) => ({
      timePoint: getCustomLabels(timePoint),
      earnings: +earnings,
    }));

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define color scale using custom colors
    const colorScale = d3.scaleOrdinal(customColors);

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.timePoint))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.earnings) + 10000])
      .range([innerHeight, 0]);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + 100)
      .attr("height", height + 100);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top + 40})`);

    // Create bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.timePoint) + 25)
      .attr("y", (d) => yScale(d.earnings))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.earnings))
      .attr("fill", (_, i) => colorScale(i)); // Use the color scale to set the fill color of each bar

    // Add data labels
    g.selectAll(".data-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "data-label")
      .attr("x", (d) => xScale(d.timePoint) + xScale.bandwidth() / 2 + 25)
      .attr("y", (d) => yScale(d.earnings) - 5) // Position the label above each bar
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text((d) => `${d.earnings ? "$" + d.earnings.toLocaleString() : ""}`);

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(25,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style("font-size", "14px");

    // Add y-axis
    g.append("g")
      .attr("transform", `translate(25,0)`)
      .call(d3.axisLeft(yScale));

    // Add y-axis label
    g.append("text")
      .attr("class", "y-axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left) // Adjust the position to fit the label nicely
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Tuition ($/yr)");

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2 + 25)
      .attr("y", height + 50) // Position the label at the bottom of the chart
      .attr("text-anchor", "middle")
      .text("Residency");

    // Add chart title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2 + 30)
      .attr("y", margin.top / 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .text("Tuition by Residency");
  }, [tuitionData]);

  return <svg ref={chartRef} />;
}
