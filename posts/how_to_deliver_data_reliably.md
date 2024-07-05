---
title: How to deliver data reliably
date: '2024-07-05'
description: >-
  Discover essential strategies and concepts to build reliable, scalable, and fast systems. Learn about handling common problems in distributed systems, designing robust architectures, and ensuring efficient message delivery.
categories:
  - distributed-systems
  - engineering
  - network
  - performance-optimization
  - reliability
  - system-design
---

## Contents

## Introduction

Today, in the world of bits and bytes, data reliability is a crucial feature for every effective and efficient system. Distributed systems, big data processing, and providing non-stop user experiences are the challenges one has to address—knowing what to do about everyday problems and how to go about implementing adequate strategies counts.

This guide will take you through some of these problems, which include network issues, application failures, and performance issues. We will also cover important system design concepts, including but not limited to retries, idempotency, and auto-scaling, where practical, to make sure that your systems stay reliable and scalable. We'll also discuss other guarantees provided by such systems—message delivery, timeouts, and consumer offsets—used for building systems capable of handling data effectively and consistently.

With these principles in your pocket, you will be much more able to design and support systems that deliver data reliably, keeping your applications up and users happy.

## 1. What else to know to build reliable, scalable, and fast systems

Imagine you're organizing a big event with friends in different places. Sometimes, things can go wrong because everyone is in different locations and not everyone has the same information at the same time. Distributed systems have similar issues. Here are some common problems:

1. **Transient Network Issues:** Think of it like a hiccup in your internet connection that fixes itself quickly.
2. **Long-lasting Network Issues:** This is like when your internet goes out for a long time.
3. **Consumer Application Failures:** Imagine if your friends' phones run out of battery and they can't communicate.
4. **Performance Degradation:** This is like when everything starts running slower because too many people are using the same Wi-Fi.
5. **Timeouts:** Imagine waiting too long for a friend to reply and giving up.
6. **Sudden Burst of Incoming Messages:** Like getting too many text messages at once and not being able to read them all.
7. **Gradual Increase in the Number of Messages:** Similar to more and more people joining your event over time, needing more resources.

**Important Points:**

1. **Network Problems:**

   - **Transient Network Issues:** These are temporary and usually resolve themselves.
   - **Long-lasting Network Issues:** These require intervention to fix.

2. **Application Failures:** Systems can fail due to bugs, overload, or resource exhaustion.

3. **Performance Issues:** Systems can slow down under heavy load or due to inefficient code.

**System Design Concepts that Help Solve These Problems**

To fix these problems, there are several concepts in system design that can help:

1. **Retries and Idempotency:**

   - **Retries:** Trying the same action again if it fails.
   - **Idempotency:** Ensuring that repeating an action doesn't cause additional effects.

2. **Backoff with Jitter:** Waiting longer periods before retrying, with some randomness to avoid repeated clashes.

3. **Failover and Fallback:**

   - **Failover:** Switching to a backup system if the primary one fails.
   - **Fallback:** Using an alternative method if the main one doesn't work.

4. **Message Delivery Guarantees:** Ensuring that messages are delivered correctly even if there are issues.

5. **Batching and Compression:** Grouping multiple messages together and compressing them to save space and time.

6. **Horizontal and Vertical Scaling:**

   - **Horizontal Scaling:** Adding more machines to share the load.
   - **Vertical Scaling:** Adding more power to existing machines.

7. **Autoscaling:** Automatically adding or removing resources based on the current load.

8. **Partitioning:** Splitting data into smaller parts to manage it more easily.

9. **Load Shedding and Rate Limiting:**

   - **Load Shedding:** Dropping some work to save the system from overload.
   - **Rate Limiting:** Controlling the number of requests to a system to prevent overload.

10. **Circuit Breaker and Bulkhead:**
    - **Circuit Breaker:** Stopping calls to a failing service to prevent further issues.
    - **Bulkhead:** Isolating different parts of a system to prevent failure from spreading.

**Three-Tier Architecture**

Imagine your system is a big cake with three layers. Each layer has a specific role:

**1. Presentation Tier:** This is the top layer, like the icing. It's what users see and interact with.

- Responsible for displaying data to users.
- Examples: Web pages, mobile apps.

**2. Application Tier:** This is the middle layer, like the filling. It handles the logic and processing of the system.

- Contains the business logic.
- Processes requests from the presentation tier.
- Examples: Web servers, application servers.

**3. Data Tier:** This is the bottom layer, like the cake base. It stores all the data.

- Manages data storage and retrieval.
- Examples: Databases, file storage systems.

<pre class="mermaid">
graph LR
    A[Presentation Tier] --> B[Application Tier]
    B --> C[Data Tier]
</pre>

Building reliable, scalable, and fast systems involves understanding and addressing common problems in distributed systems. Key system design concepts, such as retries, idempotency, failover, and autoscaling, help solve these issues. The three-tier architecture, consisting of presentation, application, and data tiers, organizes system components to enhance manageability and performance.

## 2. Timeouts

Imagine you're trying to call a friend on the phone, but he doesn't answer. You don't want to wait forever, so you decide to hang up after a certain amount of time. In computing, a timeout is similar: it's a limit on how long you wait for an action to complete before giving up.

Timeouts are like setting a timer for how long you're willing to wait for something to happen. If the timer runs out and the action isn't done, you stop waiting and move on.

**Fast Failures:**

Fast failures happen quickly, so you know right away that something went wrong.

**Example:** If you call a friend and get a busy signal immediately, you know you can't talk to them right now.

- Quickly indicate that something is wrong.
- Allow systems to recover and try again sooner.

**Slow Failures:**

Slow failures take a long time, and you might have to wait a while before finding out there's a problem.

**Example:** If you call a friend and the phone just keeps ringing without an answer, you only find out after waiting that you can't talk to them.

- Can cause delays and frustration.
- May waste resources by waiting too long.

**Connection Timeouts:**

A connection timeout is how long you wait to establish a connection with another computer or server.

**Example:** Think of it like waiting for your friend to pick up the phone. If they don't pick up in a certain amount of time, you hang up.

- Set a limit on how long to wait for a connection.
- Help avoid long waits when a server is down or unreachable.

**Request Timeouts:**

A request timeout is how long you wait for a response after you've made a request.

**Example:** Imagine you asked your friend a question on the phone and are waiting for their answer. If they take too long, you decide to end the call.

- Limit how long to wait for a response after a request is made.
- Prevent your system from hanging indefinitely while waiting.

Timeouts are like setting a timer for how long you're willing to wait for an action to complete. Fast failures happen quickly, while slow failures take longer. Connection timeouts limit how long to wait to establish a connection, and request timeouts limit how long to wait for a response after making a request. These concepts help ensure systems remain responsive and efficient.

## 3. What to do with Failed Requests

When you try to do something and it doesn't work, you need a plan to handle it. In computers, there are different ways to manage things that fail. Let's look at some of them.

**1. Cancel:**

- **What it means:** Stop and report the failure.
- **When to use it:** When you can't continue safely.
- **Example:** Canceling a download that fails due to no internet.

**2. Retry:**

- **What it means:** Try again.
- **When to use it:** When the problem might fix itself (like a small internet glitch).
- **Example:** Retrying a message that didn't send because of a weak signal.

**3. Failover:**

- **What it means:** Switch to a backup system.
- **Why it's important:** It keeps things working by using a spare.
- **Example:** Using a backup generator when the power goes out.

**4. Fallback:**

- **What it means:** Switch to a different way or system.
- **Why it's important:** It keeps things going even if the main way fails.
- **Example:** Using a different route when your usual path is blocked.

<pre class="mermaid">
graph TD
    A[Request Fails] --> B[Cancel]
    A --> C[Retry]
    A --> D[Failover]
    A --> E[Fallback]
</pre>

When things don't work, you can cancel, retry, failover, or fallback. Canceling stops everything. Retrying tries again. Failover uses a backup. Fallback uses a different way. These strategies help make sure things keep working even when problems happen.

## 4. When to Retry

### Idempotency

Idempotency is a big word that means doing something multiple times gives the same result as doing it once.

- **Example:** Imagine you have a light switch. Flipping the switch once turns the light on. Flipping it again doesn't make it brighter; the light stays on. This is like idempotency.

**Idempotent Operations:**

- **Idempotent:** If you do the same action many times, you get the same result.
  - **Example:** Setting `x = 5`. No matter how many times you do this, `x` will always be 5.
- **Not Idempotent:** If you do the same action many times, you get different results.
  - **Example:** Incrementing `x++`. Each time you do this, `x` increases by 1.

**Idempotent APIs:**

- **Read API:** These are usually idempotent. If you ask for the same data many times, you get the same result.
  - **Example:** Asking what time it is now.
- **Write API:** These are usually not idempotent. If you create a new record many times, you get multiple records.
  - **Example:** Creating a new user account every time you send a request.

**When to Retry**

Retrying is trying something again when it fails the first time. Whether it's safe to retry depends on whether the operation is idempotent.

If you can do something many times and it gives the same result, it's usually safe to retry.

**Safe to Retry:**

- **Idempotent APIs:** These are safe to retry.

  - **Example:** If you ask for the same data again, you just get the same data.

- **Non-Idempotent APIs:** These are only safe to retry if:
  - The original request never reached the server.
  - The server supports idempotency keys (special tokens to ensure the operation happens only once).

**HTTP Status Codes and Retrying:**

1. **Network Connection Not Established (N/A):** Yes, retry.

   - The request never reached the server.

2. **Bad Request (400):** No, don't retry.

   - There is a problem with the request.

3. **Access Denied (403):** No, don't retry.

   - Security credentials are not valid.

4. **Not Found (404):** No, don't retry.

   - The resource doesn't exist.

5. **Too Many Requests (429):** Yes, retry after a delay.

   - The request was rejected because of too many requests.

6. **Internal Server Error (500):** Yes, if idempotent.

   - The server encountered an error.

7. **Service Unavailable (503):** Yes, retry.

   - The service is temporarily unavailable.

8. **Request Timeout (504):** Yes, if idempotent.
   - The request hit the server but didn't complete in time.

**Quiz: Which AWS API Failures are Safe to Retry?**

- **Network Connection Not Established (N/A):** Yes
- **Bad Request (400):** No
- **Access Denied (403):** No
- **Not Found (404):** No
- **Too Many Requests (429):** Yes, after a delay
- **Internal Server Error (500):** Yes, if idempotent
- **Service Unavailable (503):** Yes
- **Request Timeout (504):** Yes, if idempotent

<pre class="mermaid">
graph LR
    A[Request \n Fails] --> B[Is the operation \n idempotent?]
    B -->|Yes| C[Retry]
    B -->|No| D[Check \n Cond`itions]
    D --> E[Did the request \n reach the server?]
    E -->|No| C
    E -->|Yes| F[Does the \n server support \n idempotency \n keys?]
    F -->|Yes| C
    F -->|No| G[Do not \n retry]
</pre>

Retrying an operation is like trying again if something goes wrong. If an operation is idempotent, it's usually safe to retry. For non-idempotent operations, retry only if the original request never hit the server or if the server supports idempotency keys. Understanding when to retry based on the type of API and the response status code helps keep systems reliable and efficient.

## 5. How to Retry

### Exponential Backoff and Jitter

When you try to do something and it doesn't work, you might want to try again. But if you keep trying immediately, it might just keep failing. To avoid this, you can wait a bit longer each time before trying again. This is called exponential backoff. Adding a bit of randomness to the waiting time is called jitter.

**Exponential Backoff:**

Exponential backoff means waiting longer and longer before each retry.

- **Example:** Imagine you're trying to reach a friend on the phone. The first time, you wait 1 second before trying again. If it fails, you wait 2 seconds, then 4 seconds, then 8 seconds, and so on. The waiting time doubles each time.

- **Definition:** Increasing the wait time between retries exponentially.

- **Why it’s useful:** Helps prevent overwhelming the system by spreading out the retries.

- **Example in Software:** If a request to a server fails, the client waits 1 second, then 2 seconds, then 4 seconds, and so on, before retrying.

**Jitter:**

Jitter means adding some randomness to the waiting time to avoid everyone trying again at the exact same moment.

- **Example:** If you and your friends are all trying to call the same person, you each wait a random amount of time before trying again. This way, you're not all calling at the exact same time.

- **Definition:** Adding randomness to the wait time.

- **Why it’s useful:** Prevents multiple clients from retrying at the same time, which can cause traffic spikes.

- **Example in Software:** If multiple clients are retrying a failed request, each waits a slightly different random amount of time before retrying.

**Example Code:**

Here’s a simple way to implement exponential backoff with jitter in code:

```rust
use tokio::time::{sleep, Duration};
use rand::Rng;

async fn retry_with_backoff<F, Fut, T, E>(operation: F, max_retries: u32)
-> Result<T, E>
where
F: Fn() -> Fut,
Fut: std::future::Future<Output = Result<T, E>>,
{
// Start with 0 retries
let mut retries = 0;
// Initialize random number generator
let mut rng = rand::thread_rng();

    loop {
        // Execute the operation and match on the result
        match operation().await {
            Ok(result) => return Ok(result), // If successful, return the result
            Err(err) if retries < max_retries => {
                retries += 1; // Increment retry count
                // Calculate exponential backoff with jitter
                let backoff = 2u64.pow(retries) + rng.gen_range(0..1000);
                sleep(Duration::from_millis(backoff)).await; // Wait before retrying
            }
            Err(err) => return Err(err), // If max retries exceeded, return the error
        }
    }

}

#[tokio::main]
async fn main() {
// Example operation that always fails for demonstration
let result = retry*with_backoff(
|| async {
// Replace this with your actual operation
Err::<(), *>("SomeExceptionType")
},
5,
)
.await;

    match result {
        Ok(_) => println!("Operation succeeded."),
        Err(_) => println!("Operation failed after retries."),
    }

}
```

This code retries a failed request 5 times, with an exponentially increasing wait time and up to 1 second of random jitter.

<pre class="mermaid">
graph LR
    A[Original \n Request] -->|Fails| B[1st Retry: \n Wait 1s]
    B -->|Fails| C[2nd Retry: \n Wait 2s]
    C -->|Fails| D[3rd Retry: \n Wait 4s]
    D -->|Fails| E[4th Retry: \n Wait 8s]
    E -->|Fails| F[Stop or \n Failover]
    B -.->|Add Jitter| G[Wait 1-2s]
    C -.->|Add Jitter| H[Wait 2-3s]
    D -.->|Add Jitter| I[Wait 4-5s]
    E -.->|Add Jitter| J[Wait 8-9s]
</pre>

When retrying an operation, exponential backoff helps by waiting longer between each retry, and jitter adds randomness to avoid traffic spikes. Together, they make retries more effective and prevent systems from being overwhelmed by repeated requests.

## 6. Message Delivery Guarantees

When sending messages between systems, it’s important to know how many times a message might be delivered. There are three main guarantees: at-most-once, at-least-once, and exactly-once. Let’s break them down in a way that’s easy to understand.

**1. At-most-once Guarantee**

- **Definition:** A message is delivered at most once. No retries are made if a message fails.
- **Characteristics:**
  - Simple and fast.
  - No duplicates, but messages might be lost.
- **Example:** Sending an HTTP GET request. If the request fails, the system does not retry.

**2. At-least-once Guarantee**

- **Definition:** A message is delivered at least once. It might be delivered more than once.
- **Characteristics:**
  - Ensures no message is lost.
  - May result in duplicates.
- **Example:** Using a message queue with retries. If a message fails, the system retries until it succeeds.

**3. Exactly-once Guarantee**

- **Definition:** A message is delivered exactly once, with no duplicates and no messages lost.
- **Characteristics:**
  - Requires careful design.
  - Often uses idempotency and transaction logs.
- **Example:** Using a system with idempotent operations and transactions. If you create a record, it is created exactly once.

Understanding message delivery guarantees helps design systems that are reliable and predictable. At-most-once is simple but might lose messages. At-least-once ensures no messages are lost but might duplicate them. Exactly-once is the gold standard, ensuring each message is delivered only once.

| Guarantee     | Description                                   | Example                                      |
| ------------- | --------------------------------------------- | -------------------------------------------- |
| At-most-once  | Delivered at most once. No retries.           | HTTP GET request.                            |
| At-least-once | Delivered at least once. Might be duplicated. | Message queue with retries.                  |
| Exactly-once  | Delivered exactly once. No duplicates.        | Idempotent operations with transaction logs. |

<pre class="mermaid">
graph TD
    A[Message is sent] --> B[At-most-once]
    A --> C[At-least-once]
    A --> D[Exactly-once]
    B -->|No retries| E[Message may be lost]
    C -->|Retries allowed| F[Message is delivered at least once]
    D -->|Idempotent operations| G[Message delivered exactly once]
</pre>

## 7. Consumer Offsets

**Log-based Messaging Systems**

Imagine you have a big notebook where you write down every message you receive. Each message gets a number, like pages in a book. This notebook is called a "log."

These systems use a log to keep track of messages. Every message gets a number (an offset), so you always know where to find each message.

- Messages are stored in a log file on disk.
- Each message has a unique offset, like a page number in a book.
- The log allows you to go back and read any message, not just the latest ones.

**Examples:**

- **Kafka**: Uses a log to store messages, and each consumer keeps track of their own offset.
- **Kinesis**: Similar to Kafka, where messages are stored in a log and consumers manage offsets.

<pre class="mermaid">
graph TD
    A[Log-based Messaging System] --> B["Message 1 (Offset 0)"]
    A --> C["Message 2 (Offset 1)"]
    A --> D["Message 3 (Offset 2)"]
    A --> E["Message 4 (Offset 3)"]
</pre>

**Checkpointing**

Checkpointing is like marking your place in a book so you can easily find it later. In messaging systems, checkpointing means saving the offset of the last message you processed, so if you stop reading and come back later, you know where to start.

**1. Checkpointing:**

- The process of saving the current offset (position) of a consumer.
- Ensures that if a consumer restarts, it knows where to continue from.
- Can be done before or after processing a message.

**2. Options for Handling Messages:**

- **Option 1: Delete Message When Processed**
  - The message is removed from the queue once it's processed.
  - Example systems: ActiveMQ, RabbitMQ, SQS.
- **Option 2: Increment Message Position**
  - The consumer keeps track of the offset and increments it after processing.
  - Example systems: Kafka, Kinesis.

**3. Types of Checkpointing:**

- **At-most-once:** Checkpoint before processing the message.
- **At-least-once:** Checkpoint after processing the message.
- **Exactly-once:** Requires idempotent processing to ensure no duplicates.

**Example:**

- **Kafka Checkpointing:**
  - Uses ZooKeeper or a similar service to store offsets.
  - Ensures that consumers can restart from the correct position.

<pre class="mermaid">
graph LR
    A[Consumer] --> B["Message 1 \n (Offset 0)"]
    B --> C[Process \n Message]
    C --> D[Checkpoint \n Offset 1]
    D --> E["Message 2 \n (Offset 1)"]
</pre>

Consumer offsets help keep track of the position in the message log. Log-based messaging systems like Kafka and Kinesis store messages in a log with unique offsets. Checkpointing ensures that consumers can restart from the correct position, maintaining reliable message processing. There are different strategies for handling messages and ensuring message delivery guarantees.
