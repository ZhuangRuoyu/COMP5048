// setup of main_visualization basics
height_Main = 1120,
width_Main = 980;

svg_Main = d3.select("#Main").append("svg")
    .attr("height",height_Main)
    .attr("width",width_Main)
    .attr("viewBox","-570 -320 1180 650");

var div_main = d3.select("#Main").append("div_main")
    .attr("class", "tooltip")
    .style("opacity", 0);

// setup of barchart basics
// height_barchart = 1120,
// width_barchart = 980;

// svg_barchart = d3.select("#barChart").append("svg")
//     .attr("height", height_barchart)
//     .attr("width", width_barchart)

//load data
queue()
.defer(d3.json,"Main_visualization2.json")
.defer(d3.json,"core_node_ordered.json")
.defer(d3.json,"crust_node_ordered.json")
// .defer(d3.json,"")
.await(ready);

function ready(error, countries, core_node, crust_node) {
    if (error) throw error;
    // console.log(countries)
    core_node_ordered = []
    core_node.forEach(function (node) {
        core_node_ordered.push(node[0])
    })

    crust_node_ordered = []
    crust_node.forEach(function (node) {
        crust_node_ordered.push(node[0])
    })

    nodes = countries.nodes;
    //seperate core nodes and shell nodes
    // nodes.sort(function(a, b) {
    //     return a.type - b.type ||
    //     a.confederation - b.confederation;
    // });

    // console.log(nodes)

    core_nodes = [];
    shell_nodes = [];
    nodes.forEach(function (node){
        if (node.type === "core") {
            core_nodes.unshift(node);
        } else {
            shell_nodes.unshift(node);
        }
    });
    // console.log(core_nodes)
    // console.log(nodes.length)
    links = countries.links;
    // console.log(countries.nodes)
    // make scale for node size based on node weight
    max_node_weight = Math.max.apply(Math,nodes.map(function(o){return o.weight;}))
    min_node_weight = Math.min.apply(Math,nodes.map(function(o){return o.weight;}))

    cScale = d3.scale.ordinal()
        .domain(["CONMEBOL", "CONCACAF", "UEFA", "CAF", "AFC"])
        .range(["#fbd7b7", "#ecb4bf", "#c6acc7", "#78adb2", "#c9b992"]);
        // light purple, light red, orange, yellow, light blue

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links);

    // Initialize node location placement parameter
    var increment_inner = core_nodes.length,
        increment_outer = shell_nodes.length,
        center = {"x": 0, "y": 0},
        angle_init = 0,
        i_out = 0,
        i_in = 0,
        angle_i = 360 / increment_inner + 0.1,
        angle_o = 360 / increment_outer ;

    // console.log(angle)
    // circular_position is used to calculate the postion of nodes which are evenly distributed on an arc
    function circular_position(node, index, angle, radius ) {
        x = (center.x + radius * Math.cos(angle * index * Math.PI / 180));
        y = (center.y + radius * Math.sin(angle * index * Math.PI / 180));
        return x, y;
    }
    // console.log (nodes)
    force.start();

    nodes.forEach(function(d) {
        // console.log(i)
        if (d.type === "core") {
            i_in = core_node_ordered.indexOf(d.id)
            var coord = circular_position(d, i_in, angle_i, d.type === "core" ? 350 : 500)
            // console.log(i_in)
        } else {
            i_out = crust_node_ordered.indexOf(d.id)
            var coord = circular_position(d, i_out, angle_o, d.type === "core" ? 350 : 500)
        }
        d.x = x;
        d.y = y;
    });

    // color for edges

    var loser = "#fe9496"
    var winner = "#19aba7"


    var defs = svg_Main.append("defs");
    var gradient = defs.append("linearGradient")
       .attr("id", "svgGradient")
       .attr("x1", "0%")
       .attr("x2", "100%")
       .attr("y1", "0%")
       .attr("y2", "100%");
    gradient.append("stop")
       .attr('class', 'start')
       .attr("offset", "0%")
       .attr("stop-color", loser)
       .attr("stop-opacity", 0.15);
    gradient.append("stop")
       .attr('class', 'end')
       .attr("offset", "100%")
       .attr("stop-color", winner)
       .attr("stop-opacity", 1);

    var defs1 = svg_Main.append("defs1");
    var gradient = defs.append("linearGradient")
        .attr("id", "svgGradient1")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
    gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", winner)
        .attr("stop-opacity", 1);
    gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", loser)
        .attr("stop-opacity", 0.15);

    var defs2 = svg_Main.append("defs2");
    var gradient = defs.append("linearGradient")
        .attr("id", "svgGradient2")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "100%")
        .attr("y2", "0%");
    gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", winner)
        .attr("stop-opacity", 1);
    gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", loser)
        .attr("stop-opacity", 0.15);

    var defs3 = svg_Main.append("defs3");
    var gradient = defs.append("linearGradient")
        .attr("id", "svgGradient3")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "100%")
        .attr("y2", "0%");
    gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", loser)
        .attr("stop-opacity", 0.15);
    gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", winner)
        .attr("stop-opacity", 1);

    function defineDirection(x1, x2, y1, y2) {
        if (x1 > x2 && y1 > y2) {
            return "url(#svgGradient)";
        } else if (x1 < x2 && y1 < y2) {
            return "url(#svgGradient1)"
        } else if (x1 < x2 && y1 > y2) {
            return "url(#svgGradient2)"
        } else {
            return "url(#svgGradient3)"
        }
    };
    // console.log(path)
    var lines = svg_Main.selectAll("line")
    .data(links)
    .enter()
    .append("line")
    // .attr("class", "edges")
    .attr("stroke-width", function(d) { return d.weight * 1.5; })
    .attr("stroke", function(d) { return defineDirection(d.source.x, d.target.x, d.source.y, d.target.y)})
    .attr("stroke-opacity", 0.15)
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

    var gnodes = svg_Main.selectAll('g.gnode')
        .data(nodes)
        .enter()
        .append('g')
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y +")"
        });
    var node = gnodes.append("circle")
        .attr("r", function(d) { return d.weight / 1.2 + 0.5; })
        // .attr("class", "nodes")
        .attr("fill", function(d) { return cScale(d.confederation); })
        .on("mouseenter", function(d) {
            is_connected(d, 0.05)
            node.transition()
            .duration(200)
            .attr("r", function(d) { return d.weight / 1.2 + 0.5; })
            d3.select(this)
            .transition()
            .duration(200)
            .attr("r", function(d) { return d.weight / 0.75 + 0.5; })
            div_main.transition()
            .duration(200)
            .style("opacity", 0.8);
            // .style("display", "inline");
            div_main
            .html("Name: " + d.id + "<br/>"
                + "Confederation: " + d.confederation + "<br/>"
                + "Year Paticipated: " + linebreaker(d.year_participate) +"<br/>"
            )
            // console.log(d.id)
            .style("left", (d3.event.pageX - 320) + "px")
            .style("top", (d3.event.pageY - 200) + "px");
        })
        .on("mouseleave", function(d) {
            node.transition()
            .duration(200)
            .attr("r", function(d) { return d.weight / 1.2 + 0.5; })
            // <!-- .lines.transition().style("stroke-opacity", 0.15); -->
            not_connected(d, 0.15);
            div_main.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function(d){
            updateplot(d)
        })

    var labels = gnodes.append("text")
        .attr("dy", 0.1)
        .text(function(d){return d.id})
        // .attr("transform", function(d) { return "rotate(" + (d.x - 300) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 600 ? "" : "rotate(180)"); })
        .attr("text-anchor", function(d) { return d.x > 0 ? "start" : "end"; })
        .attr("font-size","1em")
        .style("opacity", 0.5)

    // function used to distinguish select and non-selected edges
    var is_connected = function(d, opacity) {
        lines.transition().style("stroke-opacity", function(o) {
    return o.source === d || o.target === d ? 1 : opacity;
    });
    }

    var not_connected = function(d, opacity) {
        lines.transition().style("stroke-opacity", function(o) {
    return o.source === d || o.target === d ? opacity : 0.15;
    });
    }

    // linebraker is used for soft wrap the line in tooltip
    function linebreaker(d) {
        if (d.length >= 6 && d.length <= 12) {
            return d.slice(0,6) + "<br/>" + d.slice(6,12) + "<br/>"
        } else if (d.length > 12) {
            return d.slice(0,6) + "<br/>" + d.slice(6,12) + "<br/>" + d.slice(12,18) + "<br/>"
        } else {
            return d.slice(0,6) + "<br/>"
        }
    }

    function updateplot(d) {
        updateBarChart(d.id)
    }

/*################### barchart #############*/
//svg dimension
height_barchart = 120,
width_barchart = 80;

// Initialize barchart data
    var barchartcountry = "Brazil";

// fetch data based on selected country
    function fetchdata(country) {
        var data = [];
        for (x in nodes) {
            if (nodes[x].id === country) {
                data.push(nodes[x]);
            }
        }
        return data;
    }

    dataset = fetchdata(barchartcountry)
    // console.log(dataset)
    var xScale = d3.scale.linear()
        .domain([0, 10])
        .range([0,width_barchart]);

    var yScale = d3.scale.linear()
        .domain([0, 18])
        .range([height_barchart, 0]);

    var svg_barchart = d3.select("#barChart")
        .append("svg")
        .attr("width", width_barchart)
        .attr("height", height_barchart)
        .attr("id","barChartplot");

    var plot = svg_barchart.append("g")
        // .attr("transform", "translate(" + 30 + "," + 10 + ")");

        plot.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", xScale(5))
            .attr("width", width_barchart/2)
            .attr("y", function(d) {
                    return yScale(d.year_participate.length);
                })
            .attr("height", function(d){
                    return height_barchart - yScale(d.year_participate.length);
                })
            .attr("fill", "grey");

    function updateBarChart(country) {

        var currentbarchartdata = fetchdata(country);
        // console.log(currentbarchartdata.year_participate)
        var svg_barchart = d3.select("#barChart svg");

        var plot = d3.select("#barChartplot")
            .datum(currentbarchartdata);

        plot.selectAll("rect")
            .data(currentbarchartdata)
            .transition()
            .duration(500)
            .attr("x", xScale(5))
            .attr("width", width_barchart/2)
            .attr("y", function(d) {
                console.log(yScale(d.year_participate.length))
                return yScale(d.year_participate.length);
                })
            .attr("height", function(d){
                return height_barchart - yScale(d.year_participate.length);
                })
            .attr("fill", function(d) {
                return cScale(d.confederation);
            });
        }
    }
