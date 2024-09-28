<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->

<script>
    import projects from '$lib/projects.json'; // Import the project data
    import Project from "$lib/Project.svelte"; // Import the Project component
    let username = 'Jaeun-Park';
    // let profilePromise = fetch(`https://api.github.com/users/${username}`);

    let profilePromise = {
    ok: true,
    json: async () => ({
        followers: 100,
        following: 100,
        public_repos: 100,
        public_gists: 100,
    })
};
</script>

<svelte:head>
	<title>Jan Park: Personal site and portfolio</title>
</svelte:head>

<h1>Jan Park</h1>

<img src="images/profilephoto.jpg" width=400px alt="Profile Photo of Jan Park">
<p>
    Master’s in Business Intelligence & Data Analytics at CMU | Corporate Loan Manager at Korea Development Bank | Financial Solutions, Project Management, Client Communication, Technology Assessment
</p>


<p>With over ten years of experience at Korea Development Bank, I have built a strong foundation in client communication, industry context absorption, and leveraging data to craft tailored financial solutions. As a Corporate Loan Manager, I successfully led a $200 million syndication loan arrangement, skillfully navigating the diverse needs of clients, partner institutions, internal stakeholders, and international regulatory frameworks.</p>
<p>My passion for integrating financial expertise with technological innovation drove me to the role of Biotech Research Analyst. In this capacity, I conducted technology assessments and developed data-driven strategies for biotech and pharmaceutical clients. These efforts culminated in 30+ new investment partnerships, directly contributing to the bank’s growth and positioning it as a leader in biotechnology sector investment.</p>
<p>In addition to my technical roles, I have played a key part in KDB’s recruitment initiatives, participating in the hiring process for over 280 employees. My commitment to excellence was recognized with the KDB Star Award and the Commendation by the chairman for outstanding performance and compliance.</p>
<p>My mission has always been to connect finance and cutting-edge technological progress, driving impactful change across industries. Most recently, I am pursuing a Master of Information Systems Management at Carnegie Mellon University, specializing in Business Intelligence and Data Analytics, to sharpen my ability to interpret data and develop actionable insights. My diverse background allows me to collaborate effectively with clients, align stakeholder interests, and advance the organization's objectives through data-driven decisions.</p>

<h1>Latest Projects</h1>
    <div class="latest projects">
        {#each projects.slice(0, 3) as p}
        <Project data={p} hLevel=3 />
        {/each}
    </div>


<!-- Await block to handle the fetch request -->
{#await profilePromise}
<p>Loading profile data...</p>
{:then response}
{#await response.json()}
    <p>Decoding data...</p>
{:then data}
    <!-- Displaying GitHub profile data using a grid-style description list -->
    <div class="github-stats">
        <h2>My GitHub Stats</h2>
        <dl>
            <dt>Followers</dt>
            <dt>Following</dt>
            <dt>Public Repositories</dt>
            <dt>Public Gists</dt>

            <dd>{data.followers}</dd>
            <dd>{data.following}</dd>
            <dd>{data.public_repos}</dd>
            <dd>{data.public_gists}</dd>
        </dl>
    </div>
{:catch error}
    <p class="error">
        Something went wrong: {error.message}
    </p>
{/await}
{:catch error}
<p class="error">
    Something went wrong: {error.message}
</p>
{/await}

<style>
    .projects { /* Layout of the project list */
      display: flex;
      gap: 1rem; /* Space between the project items */
      justify-content: space-between; /* Space items evenly */
      flex-wrap: wrap; /* Allows items to wrap if necessary */
    }

    .github-stats {
        margin-top: 2rem;
    }

    .github-stats dl {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* Four equal-sized columns */
        gap: 1rem; /* Space between items */
    }

    .github-stats dt {
        font-weight: bold;
        grid-row: 1; /* All dt elements in the first row */
        text-align: center;
    }

    .github-stats dd {
        margin: 0; /* No default margin from dd */
        grid-row: 2; /* All dd elements in the second row */
        text-align: center;
    }

    .github-stats dl > * {
        margin-bottom: 0.5rem;
    }
</style>