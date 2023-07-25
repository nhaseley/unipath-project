import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PieChart({ netPriceData, customColors }) {
  const chartRef = useRef(null);

  useEffect(() => {
    function getCustomLabels(label) {
      switch (label) {
        case "net_price_0_30000":
          return "$0 - $30,000";
        case "net_price_30001_48000":
          return "$30,001 - $48,000";
        case "net_price_48001_75000":
          return "$48,001 - $75,000";
        case "net_price_75001_111000":
          return "$75,001 - $111,000";
        default:
          return "";
      }
    }

    // Prepare the data
    const data = Object.entries(netPriceData).map(([timePoint, earnings]) => ({
      timePoint: getCustomLabels(timePoint),
      earnings: +earnings,
    }));

    const width = 600;
    const height = 400;
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
      .domain([0, d3.max(data, (d) => d.earnings)])
      .range([innerHeight, 0]);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + 200)
      .attr("height", height + 50);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top + 30})`);

    // Create bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.timePoint) + 25)
      .attr("y", (d) => yScale(d.earnings))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => d.earnings? innerHeight - yScale(d.earnings): 0)
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
      .text((d) => `${d.earnings? "$" + d.earnings.toLocaleString(): ""}`);

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
      .style("font-size", "18px")
      .text("Net Price ($)");

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2 + 25)
      .attr("y", height + 40) // Position the label at the bottom of the chart
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Income Level ($)");

    // Add a legend
    const legend = g
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (_, i) => `translate(600, ${i * 25 - 25})`);
    // .style("font-size", "14px");
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
      .text((d) => d.timePoint)
      .style("font-size", "14px");
    
    // Add chart title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2 + 20)
      .attr("y", margin.top / 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .text("Net Price Breakdown by Income Level");
  }, [netPriceData]);

  return <svg ref={chartRef} />;
}

// pie chart: DO NOT DELETE (for now)
// import { useEffect, useRef } from "react";
// import * as d3 from "d3";

// export default function PieChart({ netPriceData, customColors }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     function getCustomLabels(label) {
//       switch (label) {
//         case "net_price_0_30000":
//           return "$0 - $30,000";
//         case "net_price_30001_48000":
//           return "$30,001 - $48,000";
//         case "net_price_48001_75000":
//           return "$48,001 - $75,000";
//         case "net_price_75001_111000":
//           return "$75,001 - $111,000";
//         default:
//           return "";
//       }
//     }

//     const pieData = Object.entries(netPriceData).map(([label, value]) => ({
//       label: getCustomLabels(label),
//       value: +value,
//     }));
//     const margin = { top: 20, right: 20, bottom: 30, left: 40 };

//     const width = 400;
//     const height = 400;
//     const radius = Math.min(width, height) / 2;
//     // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
//     const colorScale = d3.scaleOrdinal(customColors);
//     // console.log("colorScale", d3.schemeCategory10)
//     const pie = d3.pie().value((d) => d.value);
//     const arc = d3.arc().innerRadius(0).outerRadius(radius);

//     const svg = d3.select(chartRef.current);
//     const g = svg
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2 + 30})`);

//     const slices = g
//       .selectAll(".slice")
//       .data(pie(pieData))
//       .enter()
//       .append("g")
//       .attr("class", "slice");

//     slices
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (_, i) => colorScale(i));
//     slices
//       .append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("text-anchor", "middle")
//       .text((d) => {
//         const percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
//         return `${percentage.toFixed(1)}%`;
//       })
//       .style("font-size", "20px");

//     // Add a legend to the pie chart
//     const legend = g
//       .selectAll(".legend")
//       .data(pieData)
//       .enter()
//       .append("g")
//       .attr("class", "legend")
//       .attr("transform", (_, i) => `translate(250, ${i * 25 - 50})`);
//     // .style("font-size", "14px");
//     // .attr('transform', (_, i) => `translate(${width / 2 + radius + 20}, ${i * 25 - pieData.length * 12.5})`);
//     legend
//       .append("rect")
//       .attr("width", 20)
//       .attr("height", 20)
//       .attr("fill", (_, i) => colorScale(i));

//     legend
//       .append("text")
//       .attr("x", 30)
//       .attr("y", 15)
//       .text((d) => d.label)
//       .style("font-size", "14px");

//     // Add chart title
//     svg
//       .append("text")
//       .attr("class", "chart-title")
//       .attr("x", width / 2)
//       .attr("y", margin.top / 2 + 10)
//       .attr("text-anchor", "middle")
//       .style("font-size", "20px")
//       .text("Net Price Breakdown by Income Level");
//   }, [netPriceData]);

//   return <svg ref={chartRef} width="650" height="450" />;
// }
