
<script>
    import * as d3 from 'd3';

    // Define the pie data
    let data = [
	{ value: 1, label: "apples" },
	{ value: 2, label: "oranges" },
	{ value: 3, label: "mangos" },
	{ value: 4, label: "pears" },
	{ value: 5, label: "limes" },
	{ value: 5, label: "cherries" }
    ];

    // Generate the slice data using d3.pie()
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData = sliceGenerator(data);

    // Define the arc generator with D3
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // Generate the SVG path data for each arc
    let arcs = arcData.map(d => arcGenerator(d));

    // Define colors for the arcs using a D3 color scale
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

</script>

<!-- Add a container <div> around both pie <svg> and legend <ul>, apply flex layout to align horizontally -->
<div class="container">
    <svg viewBox="-50 -50 100 100">

        <!-- Iterate over arcs and render each path -->
        {#each arcs as arc, i}
            <path d={arc} fill={colors(i)} />
        {/each}
    </svg>

    <!-- Add the legend below the pie chart -->
    <ul class="legend">

        <!-- Svelte {#each} block is used to iterate over each item in the data array which is assigned to d -->
        {#each data as d, index}
            <!-- Each legend item <li> is a slice of pie -->
            <li style="--color: { colors(index) }">
                <!-- <span> is visual indicator for each legend item. class swatch enables it to acts like a colored box -->
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>

    /* Container to hold the pie chart and legend side by side */
    .container {
        display: flex;              /* Flex layout to align children side by side */
        align-items: center;        /* Align items vertically center */
        gap: 2em;                   /* Add space between pie chart and legend */
    }

    /* svg styling for the pie chart */
    svg {
        max-width: 20em;
        margin-block: 2em;
        overflow: visible;          /* Do not clip shapes outside the viewBox */
    }

    /* Legend styling */
    .legend {
        flex: 1;                    /* Make the legend occupy all available width */

        padding: 1em;
        margin: 1em 0;

        border: 1px solid #ccc;
        border-radius: 0.5em;       /* Rounded border */

        display: grid;              /* Turn the element (<ul> with class legend) into a CSS Grid container */
        
        /* Layout of columns within the grid container */
        /* repeat() function creates multiple grid tracks (columns) */
        /* auto-fill allows grid to create as many columns as possible that can fit */
        /* Auto-fill columns with a minimum width of 9em and distribute them evenly */
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
    }

    /* Individual legend items styling */
    .legend li {
        display: flex;            /* Flex layout to align swatch and text */
        align-items: center;      /* Align text and swatch vertically center */
        gap: 0.5em;               /* Space between swatch and text */
    }

    /* Swatch styling for the legend */
    .legend .swatch {
        width: 1em;
        height: 1em;
        aspect-ratio: 1 / 1;    /* Make it a square */
        background-color: var(--color); /* Use the color from the inline style */
        border-radius: 0.2em;   /* Add slight rounding to corners */
        display: inline-block;  /* Allow width and height to take effect */
    }

</style>