<script>
    // import { page } from '$app/stores'; // Import the page store to access the current route
    // import { page, base } from '$app/stores'; // Import the base and page store
    import { page } from '$app/stores'; // For current route detection
    import { base } from '$app/paths';  // Base path for GitHub Pages

    let pages = [
        {url: "/", title: "Home"},
        {url: "/projects", title: "Projects"},
        {url: "/contact", title: "Contact"},
        { url: "https://github.com/Jaeun-Park", title: "Profile" }
    ];
</script>

<nav>
  {#each pages as p}
      <a href={base + p.url} 
          target={p.url.startsWith("http") ? "_blank" : null} 
          rel={p.url.startsWith("http") ? "noopener noreferrer" : null}
          class:current={$page.url.pathname === base + p.url}>
          {p.title}
      </a>
  {/each}
</nav>

<slot /> <!-- Render the content of the specific page -->

<style>
    nav {
      display: flex;
      margin-bottom: 1em;
      border-bottom: 1px solid var(--border-color);
    }
  
    /* nav ul, li {
      display: contents;
    } */
  
    nav a {
      flex: 1;
      text-decoration: none;
      color: inherit;
      text-align: center;
      padding: 0.5em;
    }
  
    /* Style for the current page link */
    nav a.current {
      border-bottom: 0.4em solid var(--border-color);
      padding-bottom: 0.1em;
    }
  
    nav a:hover {
      border-bottom: 0.4em solid var(--color-accent);
      background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
      padding-bottom: 0.1em;
    }
</style>