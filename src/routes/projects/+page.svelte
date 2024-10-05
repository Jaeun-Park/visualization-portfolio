<script>
    import projects from '$lib/projects.json';  // Import the project data
    import Project from "$lib/Project.svelte";  // Import the Project component
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';

    let query = "";                             // Variable to hold the search query
    let filteredProjects;
    let pieData;
    let selectedYearIndex = -1;                 // Variable to hold the selected index from the pie chart

    // Filter projects based on the search query (Case-insensitive, Search across all project metadata)
    $: filteredProjects = projects.filter(project => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    // Reactive block to update pieData whenever filteredProjects changes
    $: {
        // Group projects by year and count them using d3
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

        // Convert the rolledData to the format required by the Pie component
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

    // Reactive variable to determine the selected year
    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    // Filter projects by the selected year
    let filteredByYear;
    $: filteredByYear = selectedYear
        ? filteredProjects.filter(project => project.year === selectedYear)
        : filteredProjects;

</script>

<svelte:head>
	<title>My Projects</title>
</svelte:head>

<h1>Projects and Achievements</h1>

<!-- Pass pieData to the Pie component -->
<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />

<!-- Search input for filtering projects -->
<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />

<!-- Render projects filtered by year -->     
<div class="projects">
    {#each filteredByYear as p}
        <Project data={p} />
    {/each}
</div>

<style>
    .projects { /* Layout of the project list */
      display: flex;
      gap: 1rem; /* Space between the project items */
      justify-content: space-between; /* Space items evenly */
      flex-wrap: wrap; /* Allows items to wrap if necessary */
    }
</style>