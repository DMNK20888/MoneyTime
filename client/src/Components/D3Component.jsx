import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function MyD3Component (props) {
  
    // gets connected to svg drawn by React by variable name and its ref attribute
    let d3Container = React.createRef(null);
     
    let dimensions = ({
      width: props.width ? props.width : 250,
      height: props.height ? props.height : 250,
      padding: props.padding ? props.padding : 20
    });
 
    const data = props.data;
    const name = props.name;
    
    let pie = d3.pie()
                .sort(null)
                .value(d => d.value);

    let arc = d3.arc()
                .innerRadius(70)
                .outerRadius(Math.min(dimensions.width, dimensions.height) / 2 - 1);
  
    // init code - only run on startup
    useEffect(function() {

      if (!(d3Container.current && data)) 
        return;
        
      let chartSvg = d3.select(d3Container.current);

      //.attr('id', "pieChart")
      chartSvg.append('g')
        .attr('id',name) 
        .attr('class', 'chart-content')
        .attr('transform', `translate(
        ${dimensions.width / 2 + dimensions.padding},
        ${dimensions.height/2 + dimensions.padding})`);
      },[]);


    // Update Function
    // Uses onSliceOver and onSliceOut
    useEffect(function() {
      
      if (!(d3Container.current && data)) 
          return;
          
      const valueSum = d3.sum(data, d => d.value);
      if (100 - valueSum > 0) {
        console.log("EMPTY UPDATE!!!");
        data.push({
          name: '$empty',
          value: (100 - valueSum),
          color: '#7f8187'
        });
      }

      const arcs = pie(data);

      //const g = d3.select("#pieChart");
      const g = d3.select("#"+name);
      g.selectAll('path')
          .data(arcs)
          .join('path')
          .on('mouseover', (event, d) => onSliceOver(event, d))
          .on('mouseout', (event, d) => onSliceOut(event, d))
          //.transition().duration(500)
          .attr('fill', d => d.data.color)
          .attr('transform', d => d.data.name === '$empty' ? 'scale(0.95)' : '') //0.95
          .attr('d', arc)
      }, [props, d3Container.current ]
    ); // useEffect update function

    //when hover over wedge
    function onSliceOver(event, d) {
      if (d.data.name === '$empty')
        return;

      //let pointer = d3.pointer(event);

      d3.select(event.currentTarget)
        .style("stroke", 'black')
        .style("stroke-width", 1.5)
        .transition().duration(150)
        .attr('transform', 'scale(1.08)'); //1.1
      
      const g = d3.select("#"+name);
      g.select('#chart-tooltip').remove();
      //CHANGE PIECHART TEXT
      g.append('text')
          .attr('x',  0)
          .attr('y', 0)
          .attr('fill', 'black')
          .attr("font-size", 14)
          .attr("font-weight", 650)
          .attr('text-anchor', 'middle')
          .attr('id', 'chart-tooltip')
          .text(`${d.data.name} ${d.data.value.toFixed(2)}%`)
    }

    //when hover off
    function onSliceOut(event, d) {
      if (d.data.name === '$empty')
        return;

      d3.select(event.currentTarget)
        .style("stroke", 'none')
        .transition().duration(100)
        .attr('transform', 'scale(1)');
       
      const g = d3.select("#"+name);
      g.select('#chart-tooltip').remove();

    }

  return (
        <svg
            className="pie-chart"
            width={dimensions.width + 2*dimensions.padding}
            height={dimensions.height + 2*dimensions.padding}
            ref={d3Container}
        />
    );
}


export default MyD3Component;