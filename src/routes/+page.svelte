<script>
    import projects from '$lib/projects.json'; // Import the project data
    import Project from "$lib/Project.svelte"; // Import the Project component
    import keypoints from '$lib/keypoints.json';

    let username = 'Jaeun-Park';
    let profilePromise = fetch(`https://api.github.com/users/${username}`);
</script>

<svelte:head>
	<title>Jaeun (Jan) Park</title>
</svelte:head>

<!-- Intro Section -->
<section class="intro">
    <h1>Data Strategist & Financial Technology Leader</h1>

    <div class="profile-photo-container">
        <!-- Left: Skills -->
        <div class="skills-container">
            <h2>Bridging finance and technology with data-driven solutions</h2>
            <div class="skill-tag">Python</div>
            <div class="skill-tag">Java</div>
            <div class="skill-tag">SQL</div>
            <div class="skill-tag">Project Management</div>
            <div class="skill-tag">Data Science</div>
            <div class="skill-tag">Machine Learning</div>
            <div class="skill-tag">Financial and Accounting Analysis</div>
            <div class="skill-tag">Clinical Data Analysis</div>
        </div>
    
        <!-- Right: Profile Photo -->
        <img src="images/profilephoto.jpg" alt="Profile Photo of Jan Park" class="profile-photo">
    </div>
</section>


<!-- Keypoints Section -->
<section id="keypoints" class="keypoints">
    <ul class="keypoints-grid">
        {#each keypoints as k}
            <li class="keypoint-card">
                <!-- Image always visible -->
                <img src={k.image} alt={k.title} class="keypoint-image">

                <!-- Hover Overlay: Covers the whole card -->
                <div class="keypoint-hover">
                    <h3 class="keypoint-title">{k.title}</h3>
                    <p class="keypoint-description">{k.description}</p>
                    {#if k.url}
                        <a href={k.url} target="_blank" class="keypoint-link">Learn More →</a>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</section>


<!-- Profile Section -->
<section class="profile">
    <div class="profile-title">
        <h1>I'm Jaeun (Jan) Park, bringing 10+ years of financial expertise combined with Carnegie Mellon's data analytics education to drive innovative solutions at the intersection of finance and technology.</h1>
        <h4 class="subtitle">MISM-BIDA @ Carnegie Mellon | Korea Development Bank</h4>
    </div>
</section>


<!-- Styles -->
<style>

    /* Intro section */
    .intro {
    padding: 3rem 0;
    text-align: left;
    }

    .intro h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    }

    .intro h2 {
    font-size: 1.5rem;
    font-weight: 400;
    max-width: 600px;
    }

    /* Profile Section */
    .profile {
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem;
    }
    /* Header Layout (Profile Info + Image) */
    .profile-header {   
        display: grid;
        grid-template-columns: 1fr auto; /* Text on the left, photo on the right */
        gap: 3rem;
        align-items: center;
        padding: 3rem;
    }
    /* Align skills to the left and photo to the right */
    .profile-photo-container {
        /* display: flex; */
        display: grid;
        grid-template-columns: 1fr auto; /* Left column takes more space, right column fits image */
        align-items: center;
        justify-content: space-between; /* Skills on left, photo on right */
        gap: 2rem;
        width: 100%;
    }

    /* Ensure skills take up left space */
    .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        justify-content: flex-start; /* Aligns skills to the left */
        width: 100%; /* Force it to take full space */
    }

    /* Skill Tags */
    .skill-tag {
        background-color: rgba(232, 62, 140, 0.15);
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        border: 1px solid rgba(232, 62, 140, 0.3);
        transition: all 0.2s ease;
    }

    .skill-tag:hover {
        background-color: rgba(232, 62, 140, 0.3);
        transform: translateY(-2px);
    }
    

    /* Profile Photo (Right) */
    .profile-photo {
        width: 300px;
        height: 300px;
        border-radius: 10%;
        object-fit: cover;
        border: 4px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .profile-photo:hover {
        transform: scale(1.02);
        border-color: rgba(232, 62, 140, 0.6);
    }


    /* Keypoints Section */

    /* Keypoints Section */
    /* Keypoints Section */
    .keypoints {
        text-align: center;
        padding: 4rem 1.5rem;
    }

    /* Grid Layout */
    .keypoints-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 1.5rem;
        max-width: 1200px;
        margin: auto;
        list-style: none;
        padding: 0;
        align-items: stretch; /* Ensures all items stretch equally */
    }

    /* Individual Keypoint Cards */
    .keypoint-card {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease-in-out;
        height: 320px; /* Ensures uniform height */
        min-height: 320px; /* Prevents inconsistency */
    }

    .keypoint-card:hover {
        transform: scale(1.02);
    }

    /* Ensure Image Fills the Card */
    .keypoint-image {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ensures all images fit without distortion */
        transition: filter 0.3s ease-in-out;
    }

    /* Hover Overlay */
    .keypoint-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        color: white;
        text-align: center;
        border-radius: 12px;
    }

    .keypoint-card:hover .keypoint-hover {
        opacity: 1;
    }

    /* Title, Description, and Link Centering */
    .keypoint-title {
        font-size: 1.4rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--accent-color, #ff4081);
        margin-bottom: 10px;
    }

    .keypoint-description {
        font-size: 1rem;
        line-height: 1.5;
        max-width: 80%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        text-align: center;
        margin-bottom: 10px;
    }

    /* Clickable URL */
    .keypoint-link {
        font-size: 1rem;
        font-weight: bold;
        color: var(--accent-color, #ff4081);
        text-decoration: none;
        transition: color 0.2s ease-in-out;
    }

    .keypoint-link:hover {
        color: #ff79b0;
    }

</style>