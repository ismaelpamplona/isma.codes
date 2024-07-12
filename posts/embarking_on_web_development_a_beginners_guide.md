---
title: Getting started with web development - a guide for beginners
date: '2024-04-09'
description: >-
  This comprehensive guide demystifies the basics of web development and provides beginners with a solid foundation to understand how the web and the Internet work, what key technologies are involved, and gives practical advice on how to get started.
categories:
  - web
  - networking
  - internet
  - infrastructure
---

## Content

## Introduction

Entering the world of web development can seem daunting at first, but understanding the core concepts and technologies can demystify the process considerably. This guide is designed to give beginners a comprehensive overview of how the web and the internet work, the technologies involved in web development and how to take your first steps in this exciting field.

## Understanding How the Web and the Internet Work

**How the Internet Works:** The Internet is a global network of interconnected computers that communicate and exchange data. When you access the Internet, your device connects to other computers and servers through various networks, enabling you to retrieve information, access services, and communicate with others. This network operates using a set of protocols, including the Internet Protocol (IP) and Transmission Control Protocol (TCP), which ensure that data is transmitted reliably and efficiently.

**How the Web Works:** The web, or World Wide Web, is a service built on top of the Internet. It consists of interlinked documents and resources, primarily in the form of web pages, that are accessible through web browsers. These web pages are located using URLs (Uniform Resource Locators), which serve as addresses for specific resources on the web. When you enter a URL in a web browser, it sends a request to the appropriate server, which then delivers the requested content back to your browser for display.

The web operates using the Hypertext Transfer Protocol (HTTP), which defines how messages are formatted and transmitted, and how web servers and browsers should respond to various commands. The web also employs other technologies, such as HTML (Hypertext Markup Language) for structuring content, CSS (Cascading Style Sheets) for styling, and JavaScript for interactive elements.

Together, the Internet and the web enable a vast array of activities, from browsing websites and sending emails to streaming videos and participating in social media, revolutionizing how we access and share information globally.
ible via web browsers that use URLs (Uniform Resource Locators) to find specific pages or content on the web.

## Key technologies and terms in web development

- **HTML (HyperText Markup Language):** HTML is the backbone of every website and determines the structure and content of web pages.
- **CSS (Cascading Style Sheets):** CSS is used for the styling and visual organization of HTML elements on a page.
- **SCSS:** An extension of CSS, SCSS (Sassy CSS), allows for variables, nested rules and more, making stylesheets easier to maintain.
- **JavaScript (JS):** A programming language that enables dynamic interactions and functionality on web pages.
- **TypeScript (TS):** A superset of JavaScript that provides static types to detect errors early in the development process.
- **Node.js:** A JavaScript runtime environment that builds on Chrome's V8 JavaScript engine and enables server-side execution of JavaScript.
- **Python:** A versatile programming language that can be used for backend web development, among other things.

## The Journey of a URL: What Happens When You Press Enter?

When you type a URL into your browser and press enter, the browser initiates a series of steps to display the requested web page. Here's a detailed breakdown of this process:

1. **URL Parsing:** The browser parses the URL to understand the protocol (usually HTTP or HTTPS), the domain name, and any path to specific resources.

2. **DNS Resolution:** The browser checks its cache for the IP address associated with the domain name. If not found, it queries the DNS (Domain Name System) servers to resolve the domain name to an IP address.

3. **TCP/IP Connection:** The browser establishes a connection to the server using the IP address via the Transmission Control Protocol (TCP).

4. **Sending HTTP Request:** Once the connection is established, the browser sends an HTTP request to the server. This request includes the method (GET, POST, etc.), the URL, headers, and possibly a body.

5. **Server Processing:** The server processes the request, accesses the requested resources, and prepares an HTTP response.

6. **Receiving HTTP Response:** The server sends back an HTTP response, which includes a status code, headers, and the requested content (HTML, CSS, JavaScript, images, etc.).

7. **Rendering the Page:** The browser receives the response and begins to render the page. It parses the HTML, applies CSS for styling, and executes JavaScript for dynamic content. The browser may also make additional requests for resources like images or scripts.

8. **Displaying the Page:** Finally, the browser displays the fully rendered web page to the user.

Here's a visual representation of this process:

<pre class="mermaid">
sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant DNS as DNS Server
    participant Server as Web Server

    User->>Browser: Enter URL and press Enter
    Browser->>DNS: Request IP address for domain
    DNS-->>Browser: Respond with IP address
    Browser->>Server: Establish TCP connection
    Server-->>Browser: Confirm connection
    Browser->>Server: Send HTTP request
    Server-->>Browser: Send HTTP response
    Browser->>User: Render and display web page
</pre>

## Understanding Web Servers and Hosting

A web server is both software and hardware that stores, processes, and delivers web pages to users. Here's a detailed breakdown of its functions and how hosting works:

**What is a Web Server?**

1. **Hardware Aspect:** The physical machine (server) that stores web files, such as HTML documents, images, and scripts. This machine is connected to the Internet and is designed to handle multiple requests from users simultaneously.

2. **Software Aspect:** The web server software (like Apache, Nginx, or IIS) runs on the hardware and is responsible for processing incoming requests from clients (browsers). It determines how to handle each request and serves the appropriate resources.

**How a Web Server Works**

1. **Listening for Requests:** The web server listens for incoming requests from clients. When a user enters a URL in their browser, a request is sent to the server hosting the website.

2. **Processing Requests:** The web server software processes the request. This involves determining which resources (HTML pages, images, etc.) are being requested.

3. **Sending Responses:** The server sends back the requested resources along with an HTTP response status code (e.g., 200 OK for a successful request).

4. **Handling Dynamic Content:** For dynamic web applications, the server may interact with other software like databases or application servers to generate the content dynamically before sending it back to the client.

**What is Web Hosting?**

Web hosting is the service of providing storage space and access to web servers for websites and applications. Here's how it works:

1. **Hosting Providers:** Companies that offer web hosting services provide the infrastructure (servers, storage, bandwidth) needed to host websites.

2. **Deployment:** When you deploy a web application, you upload your files and resources to the hosting provider's server.

3. **Access:** The hosting provider's server makes your web application accessible via the Internet, allowing users to access your site by entering its URL.

Here’s a visual representation of the interaction between a web server and a client:

<pre class="mermaid">
sequenceDiagram
    participant User as User
    participant Browser as Web Browser
    participant Server as Web Server
    participant DB as Database

    User->>Browser: Enter URL and press Enter
    Browser->>Server: Send HTTP request
    Server-->>Browser: Receive and process request
    Server->>DB: Query database (if needed)
    DB-->>Server: Return data
    Server-->>Browser: Send HTTP response with resources
    Browser->>User: Render and display web page
</pre>

## Main elements of a web application

The main elements of a web application include

- **Frontend:** The client-side part of the application that users interact with directly. It is mainly created with HTML, CSS and JavaScript.
- **Backend:** The server-side logic of the application that handles database interactions, user authentication and server configuration. Languages such as JavaScript (Node.js) and Python are usually used.
- **Database:** This is where the data is stored and retrieved by the web application, which is essential for dynamic content.

## Getting started: Recommended courses

To start your journey into web development, you should attend these selected courses:

1. **(New) Responsive Web Design** - [FreeCodeCamp](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
2. **JavaScript Algorithms and Data Structures** - [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
3. **CSS - The Complete Guide 2023 (incl. Flexbox, Grid & Sass)** - [Academing/Udemy](https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/)
4. **JavaScript - The Complete Guide 2023 (Beginner + Advanced)** - [Academind/Udemy](https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/)
5. **Understanding TypeScript** - [Academind/Udemy](https://www.udemy.com/course/understanding-typescript/)

Expand your knowledge in parallel with:

- **Svelte.js - The Complete Guide** - [Academind/Udemy](https://www.udemy.com/course/sveltejs-the-complete-guide/)
- **Svelte.js - Tutorial** - [Svelte.js tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- **Svelte kit - Tutorial** - [Sveltekit tutorial](https://learn.svelte.dev/tutorial/introducing-sveltekit)
- **Git & GitHub Crash Course 2023** - [YouTube](https://www.youtube.com/watch?v=ulQA5tjJark)
- **100 Days of Code Web Development Bootcamp** - [Udemy](https://www.udemy.com/course/100-days-of-code-web-development-bootcamp/)

## Conclusion

Embarking on web development is a journey of continuous learning and exploration. By understanding the basics of how the web works, familiarizing yourself with key technologies, and diving into hands-on practice through courses, you'll be well on your way to building your own web applications. Welcome to the exciting world of web development!
