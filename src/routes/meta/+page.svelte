<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];
    let stats = [];
    
    let width = 1000, height = 600; // Canvas dimensions
    let xScale, yScale, xAxis, yAxis, yAxisGridlines;

    let margin = {top: 10, right: 10, bottom: 30, left: 20}; // Margin for axes

    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom
    };

    let hoveredIndex = -1;
    $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};

    let cursor = { x: 0, y: 0 };  // Track mouse position

    // Color scale for time of day
    const colorScale = d3.scaleLinear()
        .domain([0, 6, 12, 18, 24])  // Midnight, morning, noon, evening, midnight
        .range(["#1f77b4", "#1f77b4", "#ff7f0e", "#ff7f0e", "#1f77b4"]);  // Blue to orange

    onMount(async () => {
        // Load csv file
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // convert line to a number
            depth: Number(row.depth), // convert depth to a number
            length: Number(row.length), // convert length to a number
            date: new Date(row.date + "T00:00" + row.timezone), // convert date with timezone
            datetime: new Date(row.datetime) // convert datetime to Date object
        }));

        // Group by commit and transform to desired structure
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit,
                url: "https://github.com/vis-society/lab-7/commit/" + commit,
                author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            // Like ret.lines = lines, but non-enumerable so it doesn’t show up in JSON.stringify
            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });

            return ret;
        });

        // Calculate the requested stats
        stats = [
            { label: "Commits", value: commits.length },
            { label: "Files", value: d3.rollups(data, v => v.length, d => d.file).length },
            { label: "Total LOC", value: data.length },
            { label: "Max Depth", value: d3.max(data, d => d.depth) },
            { label: "Longest Line", value: d3.max(data, d => d.length) },
            { label: "Max File Length", value: d3.max(d3.rollups(data, v => v.length, d => d.file), ([, lines]) => lines) }
        ];
            
        // Define scales
        xScale = d3.scaleTime()
            .domain(d3.extent(commits, d => d.datetime))  // Min and max date
            .range([usableArea.left, usableArea.right])  // Map to SVG width
            .nice();

        yScale = d3.scaleLinear()
            .domain([0, 24])  // 24-hour range
            .range([usableArea.bottom, usableArea.top])  // Invert for SVG coordinate system
            .nice();
    });

    // Render grid lines with color based on time of day
    $: if (yScale) {
        d3.select(yAxisGridlines)
            .call(
                d3.axisLeft(yScale)
                    .tickFormat("")
                    .tickSize(-usableArea.width)
            )
            .selectAll(".tick line")
            .attr("stroke", d => colorScale(d));  // Color each line
    }

    // Render axes
    $: if (xScale && yScale) {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(
            d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00")
        );
    }
</script>

<h1>Meta Analysis</h1>
<p>
    This page includes stats about the code of this website.
</p>

<!-- Display stats as a definition list -->
<dl class="stats">
    {#each stats as { label, value }}
        <dt>{label}</dt>
        <dd>{value}</dd>
    {/each}
</dl>

<h2>Commits by Time of Day</h2>

<dl 
    id="commit-tooltip" 
    class="info tooltip"
    hidden={hoveredIndex === -1}
    style="top: {cursor.y + 10}px; left: {cursor.x + 10}px;"
>
	<dt>Commit</dt>
	<dd><a href="{hoveredCommit.url}" target="_blank">{hoveredCommit.id}</a></dd>
	<dt>Date</dt>
	<dd>{hoveredCommit.datetime?.toLocaleString("en", {dateStyle: "full"})}</dd>
    <dt>Author</dt>
    <dd>{hoveredCommit.author}</dd>
    <dt>Lines Edited</dt>
    <dd>{hoveredCommit.totalLines}</dd>
</dl>

<svg viewBox={`0 0 ${width} ${height}`}>
    <!-- Grid lines with color based on time of day -->
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />

    <!-- Dots group element -->
    <g class="dots">
        {#each commits as commit, index}
            <circle
                cx={xScale(commit.datetime)}
                cy={yScale(commit.hourFrac)}
                r="5"
                fill="steelblue"
                on:mouseenter={(evt) => {
                    hoveredIndex = index;
                    cursor = { x: evt.clientX, y: evt.clientY };
                }}
                on:mouseleave={() => hoveredIndex = -1}
            />
        {/each}
    </g>

    <!-- Add x-axis and y-axis elements -->
    <g transform={`translate(0, ${usableArea.bottom})`} bind:this={xAxis} />
    <g transform={`translate(${usableArea.left}, 0)`} bind:this={yAxis} />

</svg>

<style>
    /* Style the stats list as a 4-column grid */
    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* Four equal columns */
        gap: 1rem;
    }
    /* Align dt and dd elements in their respective rows */
    .stats dt {
        font-weight: bold;
        grid-row: 1; /* Place all dt elements in the first row */
        text-align: center;
    }
    .stats dd {
        margin: 0;
        grid-row: 2; /* Place all dd elements in the second row */
        text-align: center;
    }
    svg {
        overflow: visible;
    }
    .dots circle {
        opacity: 0.7;
        transition: 200ms;
        transform-origin: center;
        transform-box: fill-box;
    }
    .dots circle:hover {
        fill: darkblue;
        opacity: 1;
    }
    .gridlines {
	stroke-opacity: .6;
    }
    /* Tooltip styling */
    .info.tooltip {
        position: fixed;
        background: oklch(100% 0% 0 / 80%); /* Semi-transparent background for frosted glass effect */
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0.5em 1em;
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Subtle shadow */
        backdrop-filter: blur(5px); /* Frosted glass effect */
        transition-duration: 500ms;
        transition-property: opacity, visibility;
    }

    /* Grid layout for labels and values side by side */
    .info.tooltip dt {
        font-weight: bold;
        text-align: left;
        grid-column: 1;
        margin-right: 1em; /* Space between dt and dd */
    }
    .info.tooltip dd {
        margin: 0;
        text-align: left;
        grid-column: 2;
    }
    .info.tooltip {
        display: grid;
        grid-template-columns: auto 1fr; /* Two columns */
        gap: 0.5em; /* Space between rows */
    }

    /* Fade effect for when hidden */
    .info[hidden]:not(:hover, :focus-within) {
        opacity: 0;
        visibility: hidden;
    }
</style>
