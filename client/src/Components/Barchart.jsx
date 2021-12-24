import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BarChart (props) {

    //const [barGroup, setBarGroup] = useState(barChartGroup)
    var data = props.data;
    var group = props.groups;
    var newGroup = [];

    //enters and formats the individual data break down for each year into the array newGroup
    for(let i = 0; i<group.length; i++) {
        for (let j = 0; j<=2; j++) {
            let total = Number(group[i][j]).toFixed(0)
            total = addCommas(total);
            newGroup.push(total);
        }
        // let total = Number(group[i][0]).toFixed(0)
        // total = addCommas(total);
        // newGroup.push(total);

        // let interest = Number(group[i][1]).toFixed(0)
        // interest = addCommas(interest);
        // newGroup.push(interest);

        // let addition = Number(group[i][2]).toFixed(0)
        // addition = addCommas(addition);
        // newGroup.push(addition);
    }
    
    console.log("my newGroup",newGroup);

    function addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	//const d3Chart = useRef()
    let d3Chart = React.createRef(null);
	// Ref for resize event update
	const update = useRef(false)

    // Update Function
    useEffect(function() {
        if (!(d3Chart.current && data)) 
            return;
        //If resize, remove the previous chart
        if(update.current){
            d3.select("#barChartSVG").selectAll('*').remove();      
        } 
        else {update.current = true}
        DrawChart(data);// had dimensions as seconf arg
    });

	//const margin = {top: 30, right:0, bottom: 30, left: 60}
    var margin = {top: 30, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

	function DrawChart(data){

		const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

		const svg = d3.select(d3Chart.current)
			.attr('width', chartwidth + margin.left + margin.right)
			.attr('height', chartheight + margin.top + margin.bottom)

		// x scale
		const x = d3.scaleBand()
			.domain(d3.range(data.length))
			.range([margin.left, chartwidth - margin.right])
			.padding(0.3)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat((i) => {if((data.slice(-1)[0].year <= 25)){return data[i].year}
                else if(!(i%5)){return (data[i].year)}}).tickSizeOuter(0))// when there are more than 25 bars the tick increment increases to 5
		const max = d3.max(data, function(d){return d.amount})// changed from .quantity

		// y scale
		const y = d3.scaleLinear()
			.domain([0, max])
			.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

        var tooltip = d3.select("#d3demo")
            .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px")
       
		//Draw bars
		svg.append('g')
			.attr('fill','#ffa600')
			.selectAll('rect')
			.data(data)
			.join('rect')
				.attr('x', (d,i) => x(i))
				.attr('y', d => y(d.amount))// changed from .quantity
				.attr('height', d=>y(0)-y(d.amount))// changed from .quantity
				.attr('width', x.bandwidth())

                .on("mouseover", function(d) { //On Hover create boarder
                    d3.select(this)
                        .style("stroke", 'black')
       			        .style("stroke-width", 1.3);
                    tooltip
                        .style("opacity", 1);
                })

                .on("mousemove", function(e,d) {
                  tooltip
                    .html("- Year: "+ d.year + " - <br/>"+
                      "Total: $"+ newGroup[0+(d.year*3)] + "<br/>"+
                      "Principal: $"+ newGroup[0] + "<br/>"+ 
                      "Interest: $" + newGroup[1+(d.year*3)] + "<br/>"+
                      "Additions: $" + newGroup[2+(d.year*3)])
                    .style('top', (e.pageY-200)+'px')
                    .style('left', (e.pageX+10)+'px') 
                })
               
                .on("mouseout", function() { //Off hover delete boarder
                    d3.select(this)
                        //.attr("fill", '#ffa600')
                        .style("stroke", 'none');
                    tooltip
                        .style("opacity", 0);
                });

//my new trial 

        // //make groups and subgroups
        // var groups = d3.map(data, function(d){return(d.group)}).keys()
        // let subgroups = ['principal', 'addition', 'interest'];
        // console.log('MY GROUPS',groups[0]);

        // // // Add X axisx
        // // var x = d3.scaleBand()
        // //     .domain(groups) //was groups
        // //     .range([0, width])
        // //     .padding([0.2])
        // // svg.append("g")
        // //     .attr("transform", "translate(0," + height + ")")
        // //     .call(d3.axisBottom(x).tickSizeOuter(0));

        // // // Add Y axis
        // // var y = d3.scaleLinear()
        // //     .domain([0, 60]) //[0, 60]
        // //     .range([ height, 0 ]);
        // // svg.append("g")
        // //     .call(d3.axisLeft(y));

        // var stack = d3.stack()
        //     .keys(['principal', 'addition', 'interest'])
        //     //(data)
        //     //.value((obj, key) => obj.fruitSales[key]);
        //     //.order(d3.stackOrderNone)
        //     //.offset(d3.stackOffsetNone);



        // // var stackGen = stack(data);

        // // for (var i=0; i< 3; i++) { 
        // //     console.log("MY STACKGETN: ",stackGen[i]);
        // // }

        // var color = d3.scaleOrdinal()
        //     .domain(subgroups)
        //     .range(['yellow','blue','green']);

        // //Draw the Bars
        // svg.append('g')
        //     .selectAll("g")
        //     // Enter in the stack data = loop key per key = group per group
        //     .data(stack)
        //     .enter().append("g")
        //         .attr("fill", function(d) { return color(d.key); })
        //         .selectAll("rect")
        //         // enter a second time = loop subgroup per subgroup to add all rectangles
        //         .data(function(d) { return d; })
        //         .enter().append("rect")
        //             .attr("x", function(d) { return x(d.data.group); })
        //             .attr("y", function(d) { return y(d[1]); })
        //             .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        //             .attr("width",x.bandwidth())


			// .attr('fill','#ffa600')
			// .selectAll('rect')
			// .data(data)
			// .join('rect')
			// 	.attr('x', (d,i) => x(i))
			// 	.attr('y', d => y(d.amount))// changed from .quantity
			// 	.attr('height', d=>y(0)-y(d.amount))// changed from .quantity
			// 	.attr('width', x.bandwidth())

                
                // .on("mouseover", function() { //On Hover create boarder
                //     d3.select(this)
                //         //.attr("fill", "#eda113")
                //         .style("stroke", 'black')
       			//         .style("stroke-width", 1);
                // })
                // .on("mouseout", function(d, i) { //Off hover delete boarder
                //     d3.select(this)
                //         //.attr("fill", '#ffa600')
                //         .style("stroke", 'none');
                // });

        // X axis label
        svg.append("text")
            .style("font-size", "12px")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", 85)
            .attr("y", 290 - 6)
            .text("Years");
        // Y axis label
        svg.append("text")
            .style("font-size", "12px")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", 75)
            .attr("y", 17)
            .text("Dollars ($)");
	}

	return (
		<div id='d3demo'>
		  <svg id="barChartSVG" ref={d3Chart} ></svg>
		</div>
	);
}

export default BarChart;