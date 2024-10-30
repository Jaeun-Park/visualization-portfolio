<script>
    export let data = {}; // 'data' prop that will receive project info
    export let hLevel = 2; // Default heading level
</script>

<article>
    <!-- svelte:element to dynamically set the heading level -->
    <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>

    <img src="{data.image}" alt="{data.title} project image" />
       
    {#if data.url}
        <a href="{data.url}" target="_blank" rel="noopener noreferrer">View Project</a>
    {/if}

    <p>{data.description}</p>
    <p>{data.year}</p>
     
</article>

<style>
    /* CSS is scoped to this component */
    .projects {
      display: flex;
      gap: 0.5rem; /* Gap between items */
      justify-content: flex-start; /* Align items to the left */
      flex-wrap: wrap; /* Ensure items wrap to the next line if needed */
    }

    article {
      flex: 1 1 calc(33.33% - 1rem); /* Flex property for responsiveness */
      max-width: calc(33.33% - 1rem); /* Ensure three items fit in one row */
      min-width: 250px; /* Prevent shrinking on smaller screens */
    }
  
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
      border-radius: 8px;
    }
  
    h1, h2, h3, h4, h5, h6 {
      font-size: 1.25rem; /* Default font size for all heading levels */
      margin-bottom: 0.5rem;
    }
  
    /* Custom styles for different heading levels */
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1rem; }
    h6 { font-size: 0.875rem; }
  </style>