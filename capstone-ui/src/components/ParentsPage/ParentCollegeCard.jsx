import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ParentCollegeCard({ childCollege }) {
  console.log("childCollege: ", childCollege);
  const [college, setCollege] = useState();

  console.log("college", college);
  useEffect(() => {
    axios
      .post("http://localhost:3010/info/" + `${childCollege?.name}`, {
        id: childCollege?.name,
      })
      .then((response) => {
        setCollege(response.data);
      });
  }, []);



  const PieChart = ({ data }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const pieData = Object.entries(data).map(([label, value]) => ({ label, value: +value }));
  
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie().value(d => d.value);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
      const svg = d3.select(chartRef.current);
      const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
  
      const slices = g.selectAll('.slice').data(pie(pieData)).enter().append('g').attr('class', 'slice');
  
      slices.append('path').attr('d', arc).attr('fill', (_, i) => colorScale(i));
      slices
        .append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => d.data.label);
  
    }, [data]);

  };

  return (
    <div className="parent-college-card">
        <svg ref={chartRef} width="400" height="400" />
      <h2>{childCollege?.name}</h2>
      <h3 className="tuition-information">
        Out of state tuition: ${parseInt(college?.tuition_out_of_state).toLocaleString()}
      </h3>
      <h3> In state tuition: ${parseInt(college?.tuition_in_state).toLocaleString()}</h3>
      <div>
        Net Price Breakdown:
        <h3>$0 - $30,000: ${parseInt(college?.net_price_0_30000).toLocaleString()}</h3>
        <h3>$30,001 - $48,000: ${parseInt(college?.net_price_30001_48000).toLocaleString()}</h3>
        <h3>$48,001 - $75,000: ${parseInt(college?.net_price_48001_75000).toLocaleString()}</h3>
        <h3>$75,001 - $111,000: ${parseInt(college?.net_price_75001_111000).toLocaleString()}</h3>
      </div>
      Average earnings{college?.earnings_1yr_after_completion}
    </div>
  );
}
