<script>
    import projects from '$lib/projects.json'; // Import the project data
    import Project from "$lib/Project.svelte"; // Import the Project component
</script>

<svelte:head>
	<title>My Projects</title>
</svelte:head>

<!-- Display the project count -->
<h1>{projects.length} Projects</h1>
    <div class="projects">
        {#each projects as p}
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