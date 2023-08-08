import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function StudentDemographicsPieChart({
  studentDemographicsData,
  customColors,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    function getCustomLabels(label) {
      switch (label) {
        case "white_students":
          return "White";
        case "black_students":
          return "Black";
        case "asian_student":
          return "Asian";
        case "hispanic_students":
          return "Hispanic";
        case "nhpi_students":
          return "Native Hawaiian and Pacific Islander";
        case "aian_students":
          return "American Indian and Alaska Native";
        case "two_or_more_students":
          return "Two or more";
        case "unknown_students":
          return "Unknown";
        default:
          return "";
      }
    }

    const data = Object.entries(studentDemographicsData).map(
      ([label, value]) => ({
        label: getCustomLabels(label),
        value: +value,
      })
    );

    // Calculate the total value of all data points
    const totalValue = data.reduce((sum, d) => sum + d.value, 0);

    // Filter out data points with percentages below 2%
    // In order to get rid of overlapping wedge labels
    const filteredData = data.filter(
      (d) => (d.value / totalValue) * 100 >= 2
    );


    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const colorScale = d3.scaleOrdinal(customColors);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const svg = d3.select(chartRef.current);
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2 + 30})`);

    const slices = g
      .selectAll(".slice")
      .data(pie(filteredData))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colorScale(i))
      .attr("stroke", "white") // Add a white stroke around each wedge
      .attr("stroke-width", 2); // Adjust the stroke width as needed
    slices
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => {
        const percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
        return `${percentage.toFixed(1)}%`;
      })
      .style("font-size", "20px");

    // Add a legend to the pie chart
    const legend = g
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(250, -100)`); // Move the legend to the right

    // Add title for the legend
    legend
      .append("text")
      .attr("x", 0)
      .attr("y", -10) // Move the title above the legend
      .text("Race/Ethnicity")
      .style("font-size", "14px")
      .style("font-weight", "bold");

    // Add the legend items
    const legendItems = legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(0, ${i * 25})`);

    legendItems
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (_, i) => colorScale(i));

    legendItems
      .append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text((d) => d.label)
      .style("font-size", "14px");

        // Add a legend message at the bottom
        legend
        .append("text")
        .attr("class", "legend-message")
        .attr("x", 0)
        .attr("y", 220) // Adjust the y position as needed
        .style("font-size", "12px")
        .style("font-style", "italic")
        .text("Wedges encompassing less than 2% were removed for stylistic reasons.");
  
    // Add chart title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Student Body Demographics");
    

  }, [studentDemographicsData]);

  return <svg ref={chartRef} width="800" height="450" />;
}
