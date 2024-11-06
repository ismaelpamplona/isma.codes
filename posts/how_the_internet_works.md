---
title: 'How the Internet Works?'
date: '2024-10-22'
description: >-
  Applicant: Ismael Pamplona
categories:
  - web
  - security
  - cybersecurity
  - web-development
  - interview
show: false
---

## Contents

## Introduction

**The Role of the Internet in Modern Software Development**

The Internet plays a fundamental role in modern software development. It serves as the backbone for many services, applications, and platforms that developers build and maintain. With the rise of cloud computing, microservices architectures, and distributed systems, developers increasingly rely on the Internet to:

- Deploy and maintain applications hosted remotely (cloud services, SaaS solutions).
- Enable communication between different services, databases, and external APIs.
- Facilitate team collaboration through version control systems like Git, hosted on platforms such as GitHub or GitLab.

In addition to powering web applications, the Internet allows for the creation of mobile, IoT, and desktop applications that depend on web-based communication. The constant availability of the Internet also enables continuous integration and deployment (CI/CD) pipelines, ensuring smooth and automatic updates to software. Modern software development would be impossible at scale without understanding how the Internet works and how to leverage it efficiently.

**Overview of Key Internet Technologies and Protocols**

The Internet functions through a combination of technologies and protocols that enable data transfer and communication between systems. Key technologies include:

- **Domain Name System (DNS):** Resolves human-readable domain names (like `example.com`) into IP addresses used by computers to locate servers.

- **Transmission Control Protocol/Internet Protocol (TCP/IP):** The suite of protocols that enable reliable data transfer over networks. TCP ensures data packets are transmitted reliably, while IP handles routing them to their destination.

- **Hypertext Transfer Protocol (HTTP/HTTPS):** The primary protocol for transmitting web content. HTTPS is a secure version that encrypts data using SSL/TLS.

- **Sockets:** Provide a mechanism for communication between a client and server. They form the foundation for protocols like HTTP, WebSockets, and others.

- **Load Balancers and Content Delivery Networks (CDNs):** Ensure scalability and performance by distributing traffic across multiple servers and caching data closer to users.

These technologies work together to enable the web, mobile applications, APIs, and backend systems to communicate seamlessly. Understanding how each of these components interacts with one another is critical for efficient software development, especially in distributed systems where multiple microservices communicate across the Internet.

## DNS (Domain Name System)

DNS (Domain Name System) is like the Internet’s phonebook, mapping human-readable domain names (such as `www.example.com`) to machine-readable IP addresses (such as `192.168.1.1`). Since remembering IP addresses for all websites is impractical for users, DNS simplifies Internet navigation. When you type a URL into your browser, DNS resolves it to the corresponding IP address, allowing your device to connect to the web server hosting the site.

DNS is critical because it abstracts the complexities of IP addresses and enables a smooth user experience. It also supports services like email, web browsing, and cloud applications by providing a reliable way to map domain names to IPs.

**How DNS Resolves Domain Names to IP Addresses**

The process of DNS resolution involves a series of queries made to different types of DNS servers. Here’s a typical flow:

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
  participant User as User
  participant RecursiveResolver as Recursive Resolver
  participant RootDNS as Root DNS
  participant TLDServer as TLD Server
  participant AuthDNS as Authoritative DNS
  participant WebServer as Web Server

  User->>RecursiveResolver: Request IP for www.example.com
  RecursiveResolver->>RootDNS: Query root DNS
  RootDNS-->>RecursiveResolver: Respond with TLD server
  RecursiveResolver->>TLDServer: Query TLD server for .com
  TLDServer-->>RecursiveResolver: Respond with Authoritative DNS
  RecursiveResolver->>AuthDNS: Query Authoritative DNS for example.com
  AuthDNS-->>RecursiveResolver: Respond with IP address
  RecursiveResolver-->>User: Return IP address
  User->>WebServer: Request webpage from www.example.com
</pre>

1. **Recursive Resolver:** The user’s request is sent to a recursive DNS resolver, which is responsible for navigating the DNS hierarchy to resolve the domain name.
2. **Root DNS Server:** The resolver queries a root DNS server, which knows where to find the top-level domain (TLD) servers (.com, .org, etc.).
3. **TLD DNS Server:** The root server responds with the location of the relevant TLD DNS server. The resolver queries the TLD DNS server.
4. **Authoritative DNS Server:** The TLD server responds with the IP of the authoritative DNS server for the requested domain (example.com), which provides the final answer.
5. **Web Server:** The recursive resolver returns the IP address to the user, who can then send the actual web request to the resolved IP.

**Types of DNS Records (A, CNAME, MX, etc.)**

DNS relies on various types of records to perform different tasks. Some common DNS records include:

| Record Type | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| A           | Maps a domain to an IPv4 address                                          |
| AAAA        | Maps a domain to an IPv6 address                                          |
| CNAME       | Aliases one domain to another (canonical name)                            |
| MX          | Specifies mail exchange servers for a domain                              |
| NS          | Identifies the authoritative name servers for the domain                  |
| TXT         | Stores arbitrary text, often used for domain verification and SPF records |

Each type of DNS record serves a specific purpose in managing domain names and their associated services.

**Recursive and Iterative DNS Queries**

There are two main types of DNS queries: **recursive** and **iterative**.

- **Recursive Queries:** The DNS resolver (often managed by an ISP) handles all the work to fully resolve a domain name. The client sends a query, and the recursive resolver continues querying various DNS servers until it finds the IP address, returning the final result to the client.
- **Iterative Queries:** In an iterative query, the DNS resolver returns the best answer it can at each stage, typically referring the client to another DNS server that is closer to resolving the query. The client itself makes multiple requests to different DNS servers until it receives the IP address.

**DNS Caching and Its Impact on Performance**

DNS caching is a technique that stores DNS query results temporarily to speed up future requests for the same domain. When a DNS server or a local machine caches DNS records, it reduces the need to repeat the entire resolution process for every request.

Caching can occur at various levels:

1. **Browser Cache:** Modern browsers store DNS results for a short time to improve performance.
2. **OS Cache:** Operating systems maintain their own DNS cache for frequently accessed domains.
3. **Recursive Resolver Cache:** DNS resolvers cache results to reduce the time and load of repeated queries.

The Time-to-Live (TTL) value associated with each DNS record determines how long it remains cached before being refreshed. While caching enhances performance by reducing query latency, changes to DNS records (e.g., moving a website to a new server) may take time to propagate across caches, potentially leading to temporary inconsistencies.

## TCP/IP Model

The TCP/IP model is the foundation for how data is transmitted across networks. It defines a set of standardized communication protocols that ensure data can be sent and received reliably, regardless of the underlying hardware or software. The model has four layers:

1. **Application Layer:** This layer provides the interface for end-user applications to access network services. It handles high-level protocols like HTTP, FTP, and SMTP that users interact with directly.

2. **Transport Layer:** Responsible for ensuring that data is transferred reliably between hosts. It provides services like error checking and flow control. Key protocols include TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).

3. **Internet Layer:** This layer handles routing and forwarding of data packets across different networks. The primary protocol is IP (Internet Protocol), which assigns addresses to devices and determines the best path for data to travel.

4. **Link Layer:** The lowest layer, which manages the physical transmission of data over network media (e.g., Ethernet cables, Wi-Fi). It is responsible for framing data into packets and handling error detection on the physical link.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart TB
    A(Application Layer) --> B(Transport Layer)
    B --> C(Internet Layer)
    C --> D(Link Layer)
</pre>

**Key Protocols in Each Layer**

Each layer of the TCP/IP model uses different protocols to accomplish its tasks:

| Layer           | Key Protocols                      |
| --------------- | ---------------------------------- |
| **Application** | HTTP, HTTPS, FTP, SMTP, DNS        |
| **Transport**   | TCP, UDP                           |
| **Internet**    | IP, ICMP                           |
| **Link**        | Ethernet, Wi-Fi (IEEE 802.11), ARP |

Each protocol operates within its respective layer, ensuring that data is passed between layers correctly.

**Differences Between TCP and UDP**

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two primary transport-layer protocols. While both serve to transport data, they differ significantly in how they do so.

| Feature          | TCP                                 | UDP                                  |
| ---------------- | ----------------------------------- | ------------------------------------ |
| **Connection**   | Connection-oriented (reliable)      | Connectionless (unreliable)          |
| **Transmission** | Reliable, ordered, error-checked    | Unreliable, unordered                |
| **Flow Control** | Yes                                 | No                                   |
| **Use Cases**    | Web browsing, email, file transfers | Video streaming, VoIP, online gaming |

TCP provides reliability by ensuring that data packets arrive in order and without errors. UDP, on the other hand, is faster but does not guarantee packet delivery or order, making it suitable for applications where speed is more important than reliability.

**How TCP Provides Reliable Transmission (Three-Way Handshake, Acknowledgment)**

TCP ensures reliable transmission using a mechanism known as the **Three-Way Handshake**:

1. **SYN (Synchronize):** The client sends a SYN packet to the server to initiate a connection.

2. **SYN-ACK (Synchronize-Acknowledge):** The server responds with a SYN-ACK packet to acknowledge the client’s request.

3. **ACK (Acknowledge):** The client sends an ACK packet to finalize the connection.

This handshake ensures that both the client and server are ready to send and receive data. After this, data is transmitted with acknowledgment for each packet received. If any packet is lost, TCP retransmits it, ensuring reliability.

TCP three-way handshake:

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
  participant Client as Client
  participant Server as Server

  Client->>Server: SYN
  Server-->>Client: SYN-ACK
  Client->>Server: ACK
</pre>

TCP also employs flow control mechanisms to prevent network congestion by adjusting the rate of data transmission based on the receiving side's capacity.

**Packet Structure and Routing**

A data packet is the fundamental unit of communication in networks. A typical TCP/IP packet contains several headers that are used for routing and control:

- **IP Header:** Contains the source and destination IP addresses, as well as routing information.

- **TCP Header:** Contains sequence numbers, acknowledgment numbers, and flags (such as SYN, ACK) that control the transmission process.

- **Data:** The actual payload being transmitted.

Packet routing occurs at the Internet layer. Routers examine the destination IP address in each packet and forward it toward its destination using the most efficient path.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    A(Source IP) --> B(Destination IP)
    B --> C(Router 1)
    C --> D(Router 2)
    D --> E(Destination IP)
</pre>

Routing is dynamic, meaning packets can take different paths to reach the same destination depending on network conditions.

## HTTP/HTTPS

HTTP (Hypertext Transfer Protocol) is the protocol used to transfer web pages and other content from servers to clients (such as web browsers). It works by establishing a connection between the client and the server, allowing the client to request resources and the server to respond with the requested content. The core elements of HTTP communication include requests from the client and responses from the server.

Typical HTTP communication flow:

1. **Client sends a request**: The client sends a request to the server for a specific resource (e.g., a web page).
2. **Server processes the request**: The server processes the request and determines how to respond (e.g., sending an HTML file).
3. **Server sends a response**: The server responds to the client with the requested data, along with a status code indicating the result of the request.

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
  participant Client as Client (Browser)
  participant Server as Web Server

  Client->>Server: HTTP Request (GET /index.html)
  Server-->>Client: HTTP Response (200 OK + HTML content)
</pre>

HTTP is a stateless protocol, meaning each request-response cycle is independent, with no memory of previous interactions. This allows for simplicity but requires additional mechanisms (like cookies or sessions) for maintaining state in web applications.

**HTTP Request Methods (GET, POST, PUT, DELETE)**

HTTP defines several request methods, each serving a different purpose:

| Method     | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| **GET**    | Retrieve data from the server. Typically used to request web pages or other resources. |
| **POST**   | Send data to the server, often used for submitting forms or uploading files.           |
| **PUT**    | Update or replace an existing resource on the server.                                  |
| **DELETE** | Remove a specified resource from the server.                                           |

For example, when you load a webpage, your browser uses a **GET** request to retrieve the page content, while submitting a form might trigger a **POST** request to send the form data to the server.

**HTTP Status Codes (200, 404, 500, etc.)**

HTTP status codes indicate the result of the client's request. Here are some common status codes:

| Status Code                   | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| **200 OK**                    | The request was successful, and the server returned the requested resource. |
| **301 Moved Permanently**     | The requested resource has been moved to a new URL.                         |
| **404 Not Found**             | The server could not find the requested resource.                           |
| **500 Internal Server Error** | The server encountered an error while processing the request.               |

These codes allow clients to understand whether their request succeeded, failed, or needs further action.

**Persistent vs Non-Persistent Connections**

- **Non-Persistent Connections:** After each HTTP request and response, the connection between the client and the server is closed. This was the default behavior in older versions of HTTP, resulting in additional overhead as each resource (HTML, images, CSS) required a new connection.

- **Persistent Connections:** In HTTP/1.1, persistent connections became the default. This allows multiple requests and responses to be sent over a single connection, reducing the overhead of establishing new connections. Persistent connections improve performance, especially when loading resources-heavy web pages.

**HTTPS: SSL/TLS and How It Secures Communication**

HTTPS (Hypertext Transfer Protocol Secure) is an extension of HTTP that encrypts data using SSL/TLS (Secure Sockets Layer / Transport Layer Security). It ensures that the data transmitted between the client and the server is encrypted, preventing attackers from intercepting or tampering with the communication.

In HTTPS, data encryption works as follows:

1. The client initiates a connection to the server using HTTPS.
2. The server responds with its SSL certificate, which contains its public key.
3. The client and server establish a secure connection by exchanging encryption keys using the public key.
4. Once the connection is established, all data transferred between the client and server is encrypted.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    A(Client) -->|Client Hello| B(Server)
    B -->|Server Hello + Certificate| A
    A -->|Session Key + Encryption| B
    B -->|Encrypted Data| A
</pre>

This encryption ensures the confidentiality, integrity, and authenticity of the communication between the client and server.

**How Certificates Work in HTTPS**

An SSL/TLS certificate is a digital certificate that authenticates the identity of a website and enables encrypted communication. Certificates are issued by trusted Certificate Authorities (CAs) and contain the following information:

- The public key of the website.
- The website's domain name.
- Information about the certificate issuer.
- An expiration date.

When a browser connects to an HTTPS site, it checks the SSL certificate to ensure it is valid and issued by a trusted CA. If the certificate is valid, the browser initiates an encrypted connection, ensuring that data sent between the client and server is secure.

## Browsers and Rendering

**How Browsers Work: From URL to Rendered Page**

When a user enters a URL into the browser, a series of steps occur to render the requested webpage. The process can be broken down into several phases:

1. **DNS Lookup**: The browser resolves the domain name to an IP address through DNS.
2. **Establish Connection**: The browser establishes a connection to the web server using protocols like TCP/IP, and if it's an HTTPS connection, an SSL/TLS handshake occurs.
3. **HTTP Request**: The browser sends an HTTP request to the server, specifying the resource it wants (e.g., an HTML file).
4. **Server Response**: The server responds with the requested resource (HTML, CSS, JS, etc.).
5. **Rendering Process**: The browser begins parsing the HTML, building the DOM (Document Object Model), loading external resources (CSS, JS), and rendering the page to the user.

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant Server as Web Server

    User->>Browser: Enter URL
    Browser->>Server: DNS Lookup + HTTP Request
    Server-->>Browser: HTML Response
    Browser->>User: Rendered Web Page
</pre>

**Key Browser Components (Rendering Engine, JavaScript Engine, Networking)**

Browsers are composed of several key components that work together to process and display web pages:

- **Rendering Engine**: Responsible for parsing HTML and CSS to build the DOM and CSSOM (CSS Object Model) trees. It then combines them to create the render tree, which is used to layout and paint the elements on the screen.
- **JavaScript Engine**: Executes JavaScript code on the page. Modern browsers have highly optimized JavaScript engines, like V8 (used in Chrome and Node.js) and SpiderMonkey (used in Firefox).

- **Networking**: Handles communication over the network, including fetching resources (HTML, CSS, JS) and managing persistent connections using HTTP or HTTPS.

These components interact to ensure that web pages are loaded and rendered efficiently.

**Rendering Process: DOM, CSSOM, and Layout**

The rendering process consists of several stages:

1. **DOM Construction**: The browser parses the HTML to build the DOM (Document Object Model) tree, which represents the structure of the HTML document.
2. **CSSOM Construction**: CSS is parsed into the CSSOM (CSS Object Model), which defines the styling of elements.
3. **Render Tree Construction**: The DOM and CSSOM are combined to create the render tree. The render tree represents only the visible elements on the page and their computed styles.
4. **Layout**: The browser calculates the positions and dimensions of each element on the page.
5. **Painting**: The browser paints the render tree to the screen, displaying the final content.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart TB
    A[HTML Document] -->|Parse| B[DOM Tree]
    C[CSS Styles] -->|Parse| D[CSSOM Tree]
    B --> E[Render Tree]
    D --> E
    E --> F[Layout]
    F --> G[Paint to Screen]
</pre>

**Role of the JavaScript Event Loop**

The JavaScript event loop plays a crucial role in how the browser handles asynchronous operations (like network requests, timers, and user input). JavaScript is single-threaded, meaning it can only execute one task at a time. The event loop ensures that non-blocking tasks (such as fetching data from a server) can be executed asynchronously without freezing the user interface.

The event loop works as follows:

- JavaScript code runs until it reaches an asynchronous operation (like an HTTP request).
- While waiting for the asynchronous task to complete, other JavaScript code continues to run.
- When the asynchronous task is done, a callback function is placed in the event queue.
- The event loop checks if the call stack is empty and, if so, executes the next task in the event queue.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart TB
    A[Call Stack] --> B[Asynchronous Task]
    B --> C[Event Queue]
    D[Event Loop] --> C
</pre>

This mechanism allows the browser to handle multiple tasks efficiently while keeping the UI responsive.

**Browser Caching Mechanisms**

Browser caching helps improve performance by storing resources locally, reducing the need to re-download them from the server. The cache stores responses to previous requests (such as HTML, CSS, and JavaScript files) based on caching headers provided by the server.

- **Cache-Control Header**: Specifies caching directives, such as how long the resource can be cached (e.g., `max-age`).

- **Expires Header**: Defines the date and time after which the resource is considered stale.

- **ETag and Last-Modified**: Used to validate whether a cached resource has changed. If it hasn’t changed, the browser can load the resource from cache instead of requesting it again from the server.

By caching resources, browsers reduce load times and bandwidth consumption, leading to a faster browsing experience.

## Socket Programming

A **socket** is an endpoint for sending and receiving data across a network. Sockets allow for two-way communication between a client and a server over a network, using standard protocols like TCP and UDP.

A socket can be thought of as a combination of:

- An IP address (to identify the device)
- A port number (to identify the specific application on the device)

When a connection is made using sockets, both the client and server create sockets to establish communication.

The general process of using sockets involves:

1. **Creating a socket**: Both the client and server create sockets using the appropriate protocol (TCP or UDP).
2. **Binding**: The server binds its socket to a specific IP address and port, listening for incoming connections.
3. **Connecting**: The client connects to the server by specifying the server's IP and port.
4. **Communication**: Data is sent and received over the connection between the client and server.
5. **Closing**: Once communication is finished, the connection is closed.

**TCP vs UDP Sockets**

There are two main types of sockets, corresponding to the two primary transport layer protocols: **TCP** (Transmission Control Protocol) and **UDP** (User Datagram Protocol).

| Feature            | TCP Socket                             | UDP Socket                                       |
| ------------------ | -------------------------------------- | ------------------------------------------------ |
| **Connection**     | Connection-oriented                    | Connectionless                                   |
| **Reliability**    | Reliable, ensures all data is received | Unreliable, no guarantee of delivery             |
| **Order of Data**  | Data is received in order              | Data may arrive out of order                     |
| **Error Checking** | Performs error checking and correction | Minimal error checking                           |
| **Use Cases**      | Web browsing, email, file transfer     | Real-time applications (e.g., video games, VoIP) |

- **TCP Sockets**: Provide reliable, ordered, and error-checked delivery of data. Before communication can begin, a connection is established using the TCP three-way handshake.
- **UDP Sockets**: Are faster but less reliable, as they don't guarantee the delivery or order of packets. UDP is often used for real-time applications where speed is more important than reliability.

**Basics of Socket Communication: Server-Client Model**

In the server-client model, a server provides resources or services, while clients make requests to the server. This model is widely used in socket programming.

**Server**:

- Creates a socket and binds it to an IP address and port.
- Listens for incoming connections.
- Accepts connections and communicates with clients.

```python
import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 8080))  # Bind to localhost on port 8080
server_socket.listen()

print("Server is listening...")

while True:
    client_socket, address = server_socket.accept()  # Accept a new connection
    print(f"Connection established with {address}")

    data = client_socket.recv(1024)  # Receive data
    print(f"Received: {data.decode()}")

    client_socket.send("Hello, Client!".encode())  # Send a response
    client_socket.close()  # Close the connection
```

**Client**:

- Creates a socket and connects to the server using its IP address and port.
- Sends requests and receives responses from the server.

Here is a simple Python example for a TCP server-client interaction:

```python
import socket

# Create a socket object
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(('localhost', 8080))  # Connect to the server

client_socket.send("Hello, Server!".encode())  # Send a message
data = client_socket.recv(1024)  # Receive a response
print(f"Received: {data.decode()}")

client_socket.close()  # Close the connection
```

**Socket Connections in Web Applications (e.g., WebSockets)**

In web applications, sockets are often used for real-time communication. **WebSockets** provide a full-duplex communication channel over a single TCP connection, allowing real-time data exchange between a client (like a browser) and a server.

Unlike traditional HTTP communication, where the client must make requests to get new data, WebSockets keep a persistent connection open, allowing the server to push data to the client without requiring a request.

A typical WebSocket communication flow:

1. The client initiates a WebSocket connection with the server.
2. Once connected, both the client and server can send messages to each other freely, keeping the connection open.
3. The connection remains open until one party closes it.

WebSocket usage in JavaScript:

```javascript
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
})
```

**Use Cases for Sockets (Real-time Applications, Chat Systems)**

Sockets are particularly useful in applications where real-time communication is required, such as:

- **Real-time Applications**: Multiplayer games, video conferencing, and financial trading platforms rely on sockets for fast, low-latency communication.

- **Chat Systems**: Chat applications use sockets to enable real-time messaging between users. Each user connects to the server, which facilitates the message exchange between clients.

- **IoT Devices**: Sockets enable communication between IoT devices and servers, allowing devices to send and receive data in real time.

## Firewalls and Network Security

A **firewall** is a security system designed to monitor and control incoming and outgoing network traffic based on predetermined security rules. Firewalls act as a barrier between a trusted internal network and untrusted external networks (such as the Internet). Their main role is to prevent unauthorized access, while allowing legitimate traffic to pass through.

Firewalls can be hardware-based, software-based, or a combination of both, and they operate at various layers of the network stack. Firewalls are essential for protecting networks from external threats like cyberattacks and for controlling the flow of sensitive data.

**How Firewalls Filter Traffic**

Firewalls use various techniques to filter network traffic, ensuring only authorized communications are allowed:

- **Packet Filtering**: Inspects individual data packets and compares them against a set of rules (such as allowing specific IP addresses or port numbers). If a packet matches a rule, it is allowed through; otherwise, it is blocked.

- **Stateful Inspection**: Keeps track of the state of active connections and makes decisions based on the context of the traffic (e.g., allowing return traffic for an established connection).

- **Proxy Firewalls**: Intercepts all traffic between the client and the server, acting as a middleman. The firewall validates the request before forwarding it to the destination.

The filtering process ensures that harmful or unauthorized traffic does not enter the network.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    Internet -->|Untrusted Traffic| Firewall -->|Allowed Traffic| Internal_Network
    Internet -.->|Blocked Traffic| Firewall
</pre>

**Concepts of NAT (Network Address Translation)**

**Network Address Translation (NAT)** is a method used by firewalls and routers to modify the IP address information in packets as they pass through a network. NAT allows multiple devices on a local network to share a single public IP address when accessing external networks (such as the Internet).

NAT works as follows:

- Devices on the internal network are assigned private IP addresses.

- When these devices send traffic to the Internet, the firewall or router translates their private IP address to a public IP address.

- On receiving a response, the firewall translates the public IP address back to the corresponding private IP address, ensuring that the traffic is routed to the correct internal device.

This process provides a layer of security by hiding internal IP addresses from the public Internet.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    Device1[Internal Device 1] --> NAT -->|Public IP| Internet
    Device2[Internal Device 2] --> NAT -->|Public IP| Internet
    Internet --> NAT -->|Private IP| Device1
    Internet --> NAT -->|Private IP| Device2
</pre>

**Port Forwarding and Its Use Cases**

**Port forwarding** is a technique used to redirect traffic from a specific port on a public IP address to a specific device and port within a private network. It enables external users to access services inside a private network (e.g., web servers, gaming servers, etc.) by forwarding incoming traffic on certain ports to internal devices.

Use cases of port forwarding include:

- **Hosting a Web Server**: Forwarding traffic on port 80 (HTTP) or port 443 (HTTPS) to a web server inside the network.

- **Online Gaming**: Allowing external users to connect to a gaming server hosted on a private network.

- **Remote Desktop Access**: Forwarding traffic to allow remote access to internal devices.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    Internet -->|Port 80| Firewall -->|Internal Web Server| Internal_Network
    Internet -->|Port 3389| Firewall -->|Remote Desktop| Internal_Network
</pre>

## Load Balancing and CDNs

**Load balancing** is crucial in large-scale applications because it ensures that traffic is evenly distributed across multiple servers. As traffic grows, a single server may not be able to handle all requests efficiently, leading to slow response times or even crashes. Load balancers help to prevent these issues by:

- **Distributing traffic**: Load balancers distribute incoming traffic across multiple servers, preventing any one server from being overwhelmed.

- **Increasing reliability**: By distributing requests, load balancers ensure that if one server fails, the traffic can be redirected to another, improving uptime.

- **Improving performance**: They allow for better resource utilization, ensuring that servers are not over or underutilized.

In short, load balancers enable scalability, reliability, and high availability, which are essential in large-scale applications.

**Types of Load Balancers (L4 vs L7)**

There are two main types of load balancers: **Layer 4 (L4)** and **Layer 7 (L7)**, corresponding to the OSI model layers at which they operate.

| Layer          | L4 (Transport Layer)                                        | L7 (Application Layer)                                              |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| **Scope**      | Operates at the network transport layer (TCP/UDP).          | Operates at the application layer (HTTP, HTTPS).                    |
| **Function**   | Distributes traffic based on IP addresses and port numbers. | Distributes traffic based on application-level data (URL, headers). |
| **Efficiency** | Faster but less flexible.                                   | More intelligent routing based on application-specific rules.       |
| **Use Cases**  | General-purpose routing, gaming servers.                    | HTTP/HTTPS traffic, API routing, content-specific load balancing.   |

L7 load balancers are more advanced, offering capabilities like content-based routing (e.g., routing based on URL paths), SSL termination, and more granular control of traffic at the application level.

**Content Delivery Networks (CDNs): How They Work**

A **Content Delivery Network (CDN)** is a distributed network of servers strategically located around the globe to deliver web content to users more efficiently. CDNs work by caching copies of content (e.g., images, videos, stylesheets) at servers closer to users, reducing latency and improving loading times.

The basic process is:

1. A user requests content from a website.
2. Instead of fetching the content directly from the origin server, the request is routed to the nearest CDN server.
3. If the CDN server has a cached copy of the content, it delivers it to the user.
4. If not, the CDN server fetches the content from the origin server, caches it, and serves it to the user.

This reduces the load on the origin server and ensures faster content delivery for users, especially those far from the origin server.

<pre class="mermaid" style="display: flex; justify-content: center;">
flowchart LR
    User -->|Request| CDN_Edge_Server
    CDN_Edge_Server -->|Cache Hit| User
    CDN_Edge_Server -->|Cache Miss| Origin_Server
    Origin_Server -->|Content| CDN_Edge_Server
    CDN_Edge_Server -->|Content| User
</pre>

**Caching and Edge Servers in CDNs**

**Caching** is the process of storing copies of files (e.g., HTML, images, CSS) to serve users faster. In CDNs, caching occurs at **edge servers**, which are servers located close to end users.

- **Edge Servers**: These are CDN servers located in various geographic locations to serve content more quickly. When a user requests content, the edge server nearest to them responds.
- **Cache Expiration**: Cached content has an expiration time (TTL - Time to Live). Once the TTL expires, the edge server fetches the latest content from the origin server.

Edge servers help reduce latency and bandwidth usage by ensuring users don’t need to fetch content from a distant origin server every time they load a page.

**Use Cases for Load Balancers and CDNs in Improving Web Performance**

**Load Balancers** and **CDNs** play a critical role in enhancing web performance, especially for large-scale applications:

- **Handling High Traffic**: Load balancers ensure that no single server is overwhelmed during high traffic periods, maintaining performance and availability.

- **Global Content Delivery**: CDNs reduce latency for users across different regions by serving content from the nearest edge server, improving loading times and user experience.

- **Failover and Redundancy**: Load balancers provide failover mechanisms, automatically redirecting traffic to healthy servers when others fail. CDNs offer redundancy by caching content across multiple servers.

- **Reducing Server Load**: CDNs offload traffic from origin servers by caching static resources, reducing server load and allowing servers to focus on dynamic content or critical tasks.

## RESTful APIs

**RESTful APIs** (Representational State Transfer) are web services that follow REST architecture principles. They allow for communication between clients and servers using standardized HTTP methods such as GET, POST, PUT, and DELETE. RESTful APIs are stateless, meaning that each request from a client to a server must contain all the information the server needs to fulfill the request, without relying on stored context between requests.

RESTful APIs matter because they:

- **Standardize communication**: REST uses HTTP, making it easy to integrate with web-based systems.
- **Decouple client and server**: Clients and servers can evolve independently as long as they adhere to the REST contract.
- **Enable scalability**: The stateless nature of RESTful APIs makes it easier to scale applications across multiple servers.

For a deeper dive into the architecture and benefits of REST, refer to the article ["Understanding REST Architecture"](/blog/understanding_rest_architecture).

**HTTP Methods and Status Codes in REST**

RESTful APIs use standard HTTP methods to perform operations on resources:

| HTTP Method | Description                        |
| ----------- | ---------------------------------- |
| **GET**     | Retrieve data from the server.     |
| **POST**    | Submit new data to the server.     |
| **PUT**     | Update an existing resource.       |
| **DELETE**  | Remove a resource from the server. |

In response to API requests, servers return **HTTP status codes**:

| Status Code                   | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| **200 OK**                    | Request succeeded, and the resource is returned. |
| **201 Created**               | New resource has been successfully created.      |
| **400 Bad Request**           | The request was malformed or invalid.            |
| **401 Unauthorized**          | Authentication is required.                      |
| **404 Not Found**             | The requested resource was not found.            |
| **500 Internal Server Error** | The server encountered an error.                 |

**How API Calls Are Made Over the Internet**

The typical flow of a REST API call:

1. **Client sends a request**: A client sends an HTTP request to the server's API endpoint (e.g., `/users`).
2. **Server processes the request**: The server processes the request and prepares the response.
3. **Server sends a response**: The server sends an HTTP response back to the client, including the requested data or status codes.

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
    participant Client as Client
    participant Server as Server
    
    Client->>Server: HTTP Request (GET /users)
    Server-->>Client: HTTP Response (200 OK + User Data)
</pre>

## SOAP Architecture

**SOAP** (Simple Object Access Protocol) is a protocol used for exchanging structured information in web services. Unlike REST, which is an architectural style, SOAP is a protocol with strict standards, typically using XML for messaging. SOAP provides built-in error handling, security (WS-Security), and supports transactions across distributed systems, making it suitable for enterprise applications.

SOAP has the following characteristics:

- **Protocol-based**: SOAP follows a rigid protocol with strict messaging rules.
- **Built-in security**: Features like WS-Security provide higher-level security in areas like message integrity and confidentiality.
- **Supports transactions**: SOAP ensures reliable messaging with standards like WS-ReliableMessaging, which are essential for complex workflows.
- **More complex**: SOAP is considered more heavyweight due to its protocol requirements, including mandatory envelopes and headers.

**Message Format in SOAP**

SOAP messages are structured in XML and include three main elements:

1. **Envelope**: Defines the message structure and identifies the message as a SOAP message.
2. **Header**: Contains optional information such as authentication data or routing information.
3. **Body**: Holds the main data of the message, typically containing the operation request or response.

Example of a SOAP message:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header>
      <Authentication>
         <Username>JohnDoe</Username>
         <Password>password123</Password>
      </Authentication>
   </soap:Header>
   <soap:Body>
      <GetUserData>
         <UserId>123</UserId>
      </GetUserData>
   </soap:Body>
</soap:Envelope>
```

## SOAP vs REST: Key Differences

| Feature            | SOAP                                               | REST                                                    |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------- |
| **Protocol**       | SOAP is a strict protocol with specific standards. | REST is an architectural style that uses standard HTTP. |
| **Message Format** | XML-based messaging.                               | Supports multiple formats (JSON, XML, etc.).            |
| **State**          | Can be stateful or stateless.                      | Stateless (each request is independent).                |
| **Complexity**     | More complex and heavyweight.                      | Lightweight and simpler to implement.                   |
| **Use Cases**      | Enterprise applications (e.g., banking).           | Web services, mobile, and IoT applications.             |

## Web Security Basics

Web applications are susceptible to various security vulnerabilities. Some of the most common include:

- **Cross-Site Scripting (XSS)**: This occurs when attackers inject malicious scripts into web pages viewed by other users. XSS can lead to session hijacking, defacement, or the redirection of users to malicious websites. Preventing XSS involves properly sanitizing and validating all input data.

- **SQL Injection (SQLi)**: SQL injection happens when an attacker manipulates a web application's database query by injecting malicious SQL code. This can lead to data leakage, unauthorized access, or complete control over the database. Parameterized queries and using ORM tools help prevent SQLi.

- **Cross-Site Request Forgery (CSRF)**: This attack tricks authenticated users into making unwanted requests to a different web application. CSRF tokens and verifying referrer headers are commonly used countermeasures.

To learn more about emerging threats and essential security practices, refer to the article <a target="_blank" href="/blog/web_application_security">Web Application Security: Essential Practices and Emerging Threats</a>.

**Overview of CORS (Cross-Origin Resource Sharing)**

**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by browsers to prevent a website from making requests to a different domain (origin) unless explicitly permitted. By default, web applications are restricted to only interacting with their own domain.

When a web application needs to access resources on another domain, the server hosting those resources must include specific headers (like `Access-Control-Allow-Origin`) to indicate that cross-origin requests are allowed.

Here’s an example of a CORS-enabled response:

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST
```

Without proper CORS configuration, an application may become vulnerable to attacks like CSRF or data leakage.

**Introduction to OAuth and Token-Based Authentication**

**OAuth** is an open standard protocol used for authorization, allowing third-party services to access user resources without exposing their credentials. OAuth is widely used for granting limited access to APIs.

- **OAuth 2.0**: The most common version, OAuth 2.0 allows users to authorize a third-party application to access their data without sharing credentials. It uses **access tokens** to grant this access.

**Token-Based Authentication**:

- Instead of using session-based authentication (where a server stores session data), token-based authentication involves issuing a token (typically a JSON Web Token or JWT) to the client after a successful login.

- The client includes this token in each subsequent request, and the server validates it, allowing access to protected resources.

Example of a JWT:

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  },
  "signature": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

This token-based approach allows for stateless authentication, making it ideal for scalable applications.

**Rate Limiting and Denial of Service (DoS) Prevention**

**Rate limiting** is a technique used to control the number of requests a user or system can make to a server within a specified time frame. Rate limiting prevents overuse of resources and protects against **Denial of Service (DoS)** attacks, where an attacker tries to overwhelm a server with too many requests.

Techniques for rate limiting:

- **IP-based rate limiting**: Limits the number of requests per IP address.

- **Token bucket algorithm**: Allows a fixed number of requests within a given time period. Once the limit is reached, requests are throttled or denied until more capacity becomes available.

By implementing rate limiting, applications can prevent abuse and ensure that resources are fairly distributed among legitimate users, reducing the risk of DoS attacks.

## Conclusion

- Importance of Understanding Internet Fundamentals for Software Engineers
- Key Takeaways on DNS, TCP/IP, HTTP, and Sockets
