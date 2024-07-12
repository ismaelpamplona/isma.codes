---
title: Why Rust is the Go-To Language for Brazilian Payroll API Systems
date: '2024-04-10'
description: >-
  Exploring the advantages of using Rust to build system APIs for Brazilian payroll, focusing on performance, safety, and concurrency.
categories:
  - rest-api
  - rust
  - security
  - systems-programming
---

## Content

## Introduction

As the Brazilian tech scene grows, there is a growing need for robust API systems around payroll. With its combination of performance, safety, and semantic expressiveness, there is no better fit than Rust. In this piece, we make the case for using Rust to build Brazilian payroll API systems, with practical examples based on the `abroad-payroll-api`.

## Why Rust for Payroll Systems?

By providing memory safety guarantees, state-of-the-art runtime performance, and modern language features, we believe that Rust APIs can be as robust as they are productive. Here’s what Rust brings to the table:

- **Safety**: Because Rust has a strict ownership model, concurrency bugs of the data race kind (which can affect any system doing concurrent processing; indeed, payroll systems must) cannot happen.

- **Performance**: Zero-cost abstractions mean that, when processing millions of rows of payroll data, you don’t have to choose between expressiveness and performance.

- **Concurrency**: Rust’s concurrency model makes it easy to scale systems that can manage thousands of requests to a service’s API without falling into many of the pitfalls of multithreaded development.

## Building the Foreign Payroll API in Rust

`abroad-payroll-api` is built on the strong ecosystem of Rust to provide a trustworthy and performant service to maintain payrolls for Brazilian public agents abroad. Here’s a glimpse of the `Cargo.toml` for you to see what dependencies were needed:

```toml
[package]
name = "abroad-payroll-api"
version = "0.1.0"
edition = "2021"

# Dependencies
axum = "0.7.4"
tokio = { version = "1.35.1", features = ["full"] }
sqlx = { version = "0.7", features = ["postgres"] }
```

This setup puts axum first for web framework features, tokio second for async runtime, and sqlx for the database. This provides a stable backend build.

The `abroad-payroll-api` has been structured with maintenance and scalability in mind. The path structure of the API in the project (as shown below) has a clean separation of concerns, clear modules, and shows modularity.

```
.
└── src/
    ├── handlers/
    ├── middlewares/
    ├── routes/
    ├── app.rs
    ├── main.rs
    └── response.rs
```

By doing so, the structure enables a developer to find classes and functions in one part of an API or even an entire codebase, and then find all the references to them in other parts.

The fact that, in the case of Rust, the API path structure is included in this manner presents an opportunity for a discussion of how the design of Rust benefits the individual components of the web service.

## API Endpoints and Operations

For example, let's look at the endpoint for retrieving bank data:

```rs
// GET /banks
async fn get_banks() -> Result<Json<Vec<Bank>>, Error> {
    let banks = fetch_banks_from_db().await?;
    Ok(Json(banks))
}
```

Here we have an asynchronous function that retrieves some fake bank data – securing a place to showcase Rust’s asynchronous functionality for non-blocking I/O, which is crucial for building responsive APIs.

## Containerization with Docker

To make sure that every time the abroad-payroll-api runs, it behaves consistently from one environment to another, we use containerization through Docker. The `Dockerfile.dev` looks like this:

```dockerfile
FROM rust:latest as builder
WORKDIR /usr/src/myapp
COPY . .
RUN cargo install --path .

FROM debian:buster-slim
COPY --from=builder /usr/src/myapp/target/release/abroad-payroll-api .
CMD ["./abroad-payroll-api"]
```

This multi-stage structure leads to a lighter final image that is ideal for use.

## Database and ORM

```rs
// Example SQLx query with compile-time checks
let rec: (i32, String) = sqlx::query_as("SELECT id, name FROM banks WHERE id = $1")
    .bind(bank_id)
    .fetch_one(&pool)
    .await?;
```

## Conclusion

Rust's combination of safety, performance, and modern features makes it the first choice for creating system APIs such as the abroad-payroll-api. As the Brazilian financial sector requires increasingly sophisticated software solutions, Rust is ready to take on these challenges.

## Appendix: Collection Example

Below is an example of a collection to illustrate API usage:

```json
{
  "name": "abroad-payroll-api",
  "request": {
    "method": "GET",
    "url": "http://localhost:3030/banks"
  }
}
```

This collection simplifies testing and interaction with the API and demonstrates the usability and integration capabilities of the system.

Stay tuned for more insights and tutorials about Rust and API development.

> This article encapsulates the technical considerations and benefits of using Rust for API development, particularly in the Brazilian payroll context, supported by code examples and practical implementation strategies.
