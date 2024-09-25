<svelte:head>
	<title>Contact me</title>
</svelte:head>

<h1>Contact</h1>
    <form action="mailto:example@gmail.com" method="POST" enctype="text/plain">
        <label for="email">Email:</label>
        <input id="email" name="email" type="email" />
        
        <label for="subject">Subject:</label>
        <input id="subject" name="subject" type="text" />

        <label for="message">Message:</label>
        <textarea id="message" name="message"></textarea>
        
        <button type="submit">Send</button>
    </form>