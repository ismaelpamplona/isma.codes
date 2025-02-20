---
title: 'Kubernetes Architecture'
date: '2025-02-19'
description: >-
  This article explains Kubernetes architecture using a cargo and control ship analogy. It covers master and worker nodes, key components like etcd, the API server, scheduler, controllers, kubelet, kube proxy, and container runtime, helping learners grasp orchestration, networking, and cluster management. Based on the **"Kubernetes Architecture"** class from *Certified Kubernetes Administrator (CKA) with Practice Tests* on Udemy. Check the link in the *Additional Resources* section.

categories:
  - kubernetes
  - container-orchestration
  - architecture
  - distributed-systems
  - devops
  - infrastructure
  - reliability
  - system-design
show: true
---

## Contents

## Introduction

Kubernetes is an orchestration system designed to manage containerized applications at scale. To understand how Kubernetes functions, we use an analogy of a maritime shipping fleet. Imagine a fleet of cargo ships (worker nodes) that carry containers across the sea. These cargo ships are controlled and managed by specialized control ships (master nodes), ensuring the smooth operation of all cargo movement, planning, and logistics. Kubernetes employs a similar approach, where control planes manage worker nodes to run applications efficiently and reliably.

## Kubernetes Cluster

A Kubernetes cluster consists of two main types of nodes:

- **Worker nodes** (Cargo Ships): These perform the actual task of running applications by loading and managing containers.
- **Master nodes** (Control Ships): These coordinate and manage worker nodes, ensuring containers are deployed correctly and operate efficiently.

The master node (control ship) has several critical responsibilities, including:

- Storing cluster state information
- Scheduling containers on the right worker nodes
- Monitoring and managing the overall cluster
- Handling communication between different components

Now, let's break down the individual components within each node type and explore their functions.

## Master Node (Control Ships)

The master node is responsible for managing the cluster, much like a control ship oversees the movement, loading, and organization of cargo ships. It consists of the following key components:

### `etcd`: The Cluster's Logbook

Every fleet requires a logbook to keep track of ship locations, cargo details, and schedules. In Kubernetes, this role is performed by **etcd**, a distributed key-value store that records the state of the cluster.

- Stores cluster metadata, node status, and configuration details.
- Ensures high availability and consistency across all nodes.
- Used by other Kubernetes components to retrieve information.

### Scheduler: The Dock Crane Operator

A shipping dock uses cranes to carefully allocate containers to the right ships based on size, capacity, and destination. In Kubernetes, this task is handled by the **Scheduler**.

- Assigns containers (pods) to worker nodes based on resource requirements.
- Considers node capacity, constraints (taints, tolerations, affinities), and policies.
- Ensures optimal distribution of workloads across the cluster.

### Controllers: The Management Offices

Ports have dedicated management teams overseeing various aspects of ship operations. In Kubernetes, **Controllers** handle different aspects of cluster management.

- **Node Controller:** Monitors node health, removes unhealthy nodes, and integrates new nodes.
- **Replication Controller:** Ensures the desired number of container replicas are always running.
- **Job Controller:** Manages batch jobs and one-time task executions.
- **Endpoint Controller:** Manages service discovery for network communications.

### PI Server: The Communication Tower

Every port has a command center that communicates with all ships and coordinates operations. In Kubernetes, the **API Server** serves as this command hub.

- Acts as the main entry point for all management operations.
- Exposes the Kubernetes API, allowing external users and internal components to interact.
- Facilitates communication between controllers, worker nodes, and external clients.

## Worker Nodes (Cargo Ships)

Worker nodes are responsible for running applications in the form of containers. They contain components that allow them to receive instructions from the control plane and execute workloads accordingly.

### Kubelet: The Ship Captain

Each cargo ship has a captain who follows instructions from the control ship, ensuring all operations are executed correctly. In Kubernetes, this role is played by **kubelet**.

- Receives instructions from the API Server to deploy or terminate containers.
- Monitors container health and reports back to the master node.
- Ensures that the containers remain in the desired state.

### Kube Proxy: The Communication Officer

Ships in a fleet need to communicate with each other for coordination. In Kubernetes, **Kube Proxy** enables this communication between worker nodes.

- Manages network routing to allow containers to interact across nodes.
- Implements load balancing for services within the cluster.
- Maintains network policies that define allowed communication paths.

### Container Runtime: The Engine Room

Cargo ships require an engine to function, and in Kubernetes, the **Container Runtime** provides the necessary infrastructure to run containers.

- Popular runtimes include **Docker, containerd, and CRI-O**.
- Responsible for pulling container images, running them, and managing their lifecycle.

<pre class="mermaid" style="display: flex; justify-content: center;">
graph TD
    subgraph Master_Node[Master Node - Control Ships]
        APIServer[Kube API Server - Command Center]
        Scheduler[Scheduler - Crane Operator]
        Controllers[Controllers - Management Offices]
        etcd[etcd - Logbook]
    end

    subgraph Worker_Nodes[Worker Nodes - Cargo Ships]
        Kubelet[Kubelet - Ship Captain]
        KubeProxy[Kube Proxy - Communication Officer]
        ContainerRuntime[Container Runtime - Engine Room]
    end

    APIServer -->|Schedules| Scheduler
    APIServer -->|Manages| Controllers
    APIServer -->|Stores Data| etcd
    Scheduler -->|Assigns Pods| Kubelet
    Controllers -->|Manage State| Worker_Nodes
    etcd -->|Cluster Data| APIServer
    Kubelet -->|Reports Status| APIServer
    KubeProxy -->|Handles Networking| Worker_Nodes
    ContainerRuntime -->|Runs Containers| Worker_Nodes
</pre>

## Summary

The Kubernetes architecture can be summarized as follows:

| Component         | Kubernetes Role                               | Ship Analogy                           |
| ----------------- | --------------------------------------------- | -------------------------------------- |
| etcd              | Stores cluster state                          | Logbook storing fleet information      |
| Scheduler         | Assigns containers to nodes                   | Crane operator allocating cargo        |
| Controllers       | Manage various cluster tasks                  | Management offices handling operations |
| API Server        | Handles all communication                     | Port command center                    |
| Kubelet           | Runs on each worker node, managing containers | Ship captain                           |
| Kube Proxy        | Manages network connectivity                  | Communication officer                  |
| Container Runtime | Runs containers on worker nodes               | Ship engine room                       |

## Conclusion

Kubernetes provides a robust system for managing containerized applications efficiently. By using the analogy of cargo and control ships, we can better understand how different components work together to orchestrate container deployments. In the following sections, we will explore each of these components in greater depth, along with practical demonstrations and exercises.

## Additional Resources

Here are some additional resources to further explore the concepts covered in this article:

1. **Certified Kubernetes Administrator (CKA) with Practice Tests**: [https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/)
