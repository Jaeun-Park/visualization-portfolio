<script>
    import { page } from '$app/stores'; // For current route detection
    import { base } from '$app/paths';  // Base path for GitHub Pages
    import "../style.css"; // Import the global CSS
    import { onMount } from 'svelte';

    // Navigation links
    let pages = [
        {url: "/", title: "Home"},
        {url: "/projects", title: "Projects"},
        {url: "/contact", title: "Contact"},
        { url: "https://github.com/Jaeun-Park", title: "Profile" }
    ];

    // Use globalThis to get the root element safely
    let root = globalThis?.document?.documentElement;

    // Define a local variable that represents localStorage or an empty object if localStorage is not available
    let localStorage = globalThis?.localStorage ?? {};

    // Initialize color scheme
    let colorScheme = "auto";
    if (localStorage.colorScheme) {
        colorScheme = localStorage.colorScheme;
    }

    // Update the color scheme CSS property
    $: {
        root?.style.setProperty("color-scheme", colorScheme);
        // Save the color scheme to localStorage whenever it changes
        localStorage.colorScheme = colorScheme;
    }

</script>

<nav>
  {#each pages as p}
      <a href={p.url.startsWith("http") ? p.url : base + p.url}
          target={p.url.startsWith("http") ? "_blank" : "_self"} 
          rel={p.url.startsWith("http") ? "noopener noreferrer" : null}
          class:current={$page.url.pathname === base + p.url}>
          {p.title}
      </a>
  {/each}

  <!-- Theme switcher HTML -->
  <label class="color-scheme">
		Theme:
    <select bind:value={colorScheme}>
      <option value="auto">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
		</select>
	</label>`
</nav>

<slot /> <!-- Render the content of the specific page -->

<style>
    nav {
      display: flex;
      margin-bottom: 1em;
      border-bottom: 1px solid var(--border-color);
    }
  
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
    
    .color-scheme {
      margin-left: 1em;
      align-self: center;
    }

</style>