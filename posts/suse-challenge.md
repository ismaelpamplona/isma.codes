---
title: SUSE - Technical challenge
date: '2024-10-9'
description: >-
  Applicant: Ismael Pamplona
categories:
show: false
---

## Current system description

The current system consists of a client-server application where **App S** and **App Z** interact with two servers: **Server A** and **Server B**. **App S** is responsible for setting up the necessary DNS entries and authentication information to allow **App Z** to communicate with **Server B**. Once **App Z** completes its task, **App S** cleans up the configuration and removes any sensitive data.

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
    participant S as App S
    participant A as Server A
    participant Hosts as /etc/hosts
    participant Z as App Z
    participant B as Server B

    S->>A: Request DNS and setup data
    A->>S: Respond with DNS and setup data (not publicly resolvable)

    S->>Hosts: add_hosts_entry (Add DNS and IP to /etc/hosts)
    S->>S: Generate access_B.conf
    S->>Z: Save access_B.conf for App Z

    Z->>Hosts: Check if DNS and IP are resolvable
    Z->>Z: Check if access_B.conf is available

    alt DNS resolves and access_B.conf is present
        Z->>B: Access Server B using credentials from access_B.conf
    else DNS or access_B.conf is missing
        B->>Z: 403 Forbidden
    end

    Z->>S: Send cleanup signal (Task completed)
    S->>S: Proceed with cleanup

    S->>Hosts: clean_hosts_file (Remove DNS and IP from /etc/hosts)
    S->>S: Remove access_B.conf
</pre>

1. **App S asks Server A** for the necessary data to set up the connection to Server B.

2. **Server A responds with data to App S**, including the **DNS name** of Server B, which is **not publicly resolvable**.

3. With the Server A response in hand, **App S performs several actions**:

   - Calls the **`add_hosts_entry`** function to resolve the DNS name received from Server A.
   - Adds the DNS name and its corresponding IP into the **`/etc/hosts`** file, allowing the client system to resolve the non-public DNS.
   - Generates the **`access_B.conf`** file, which contains the authentication credentials (username and password) for Server B.
   - Saves the **`access_B.conf`** file in a directory that **App Z** can access.

4. **App Z checks for the `access_B.conf` file** and verifies that the **DNS name and IP** are resolvable in the **`/etc/hosts`** file:

   1. If everything is in order (i.e., the DNS resolves and `access_B.conf` is present), **App Z accesses Server B** using the credentials stored in `access_B.conf`.
   2. If something is missing or incorrect (e.g., the DNS doesn't resolve or `access_B.conf` is missing), **App Z fails to authenticate and receives a 403: Forbidden** response from Server B.

5. **Once the configuration data is no longer needed**, **App Z sends a cleanup signal** (indicating that its task with **Server B** is complete) to **App S**, which then proceeds to clean up by:

   - Calling the **`clean_hosts_file`** function to remove the DNS entry and clean up the system.
   - Existent code for removing the **`access_B.conf`** file so that sensitive credentials are not left behind.
   - Removing the line with **Server B's DNS name and IP** from the **`/etc/hosts`** file to restore the system to its previous state.

<!-- <div class="page-break"></div> -->

## Desired system description

The desired system introduces two additional client programs, **C1** and **C2**, which also need to interact with **Server B** using separate DNS entries and authentication mechanisms. **App S** will be responsible for configuring the system to allow these additional clients to authenticate and communicate with **Server B**, while maintaining the ability to clean up the environment once the tasks are complete.

<pre class="mermaid" style="display: flex; justify-content: center;">
sequenceDiagram
    participant S as App S
    participant A as Server A
    participant Hosts as /etc/hosts
    participant Z as App Z
    participant C1 as App C1
    participant C2 as App C2
    participant Proxy as NGINX (Proxy)
    participant B as Server B

    S->>A: Request DNS and setup data (Z, C1, C2)
    A->>S: Respond with DNS and setup data for Z, C1, C2 (not publicly resolvable)

    S->>Hosts: add_hosts_entry(dns_z, ip) (Add DNS and IP for Z to /etc/hosts)
    S->>Hosts: add_hosts_entry(dns_c1, ip) (Add DNS and IP for C1 to /etc/hosts)
    S->>Hosts: add_hosts_entry(dns_c2, ip) (Add DNS and IP for C2 to /etc/hosts)


    S->>S: generate_access_B_conf() (Generate access_B.conf)
    S->>Z: save_auth_file() (Save access_B.conf for App Z)

    S->>S: add_env_variable('C1_AUTH_LOCATION', '/path/to/c1/auth') (Add C1_AUTH_LOCATION to /etc/profile.local)
    S->>S: add_env_variable('C2_AUTH_LOCATION', '/path/to/c2/auth') (Add C2_AUTH_LOCATION to /etc/profile.local)

    S->>S: generate_auth_c1_conf() (Generate auth_c1.conf)
    S->>C1: save_auth_file() (Save auth_c1.conf for App C1)

    S->>S: generate_auth_c2_json() (Generate auth_c2.json)
    S->>C2: save_auth_file() (Save auth_c2.json for App C2)

    Z->>Hosts: Check if DNS and IP are resolvable
    Z->>Z: Check if access_B.conf is available

    C1->>Hosts: Check if DNS and IP are resolvable
    C1->>C1: Check if auth_c1.conf is available

    C2->>Hosts: Check if DNS and IP are resolvable
    C2->>C2: Check if auth_c2.json is available

    alt DNS resolves and config files are present
        Z->>Proxy: Send request to NGINX
        C1->>Proxy: Send request to NGINX
        C2->>Proxy: Send request to NGINX
        Proxy->>B: Forward requests to Server B using credentials
    else DNS or config files are missing
        B->>Z: 403 Forbidden
        B->>C1: 403 Forbidden
        B->>C2: 403 Forbidden
    end

    par
        Z->>S: Send cleanup signal (Task completed)
        C1->>S: Send cleanup signal (Task completed)
        C2->>S: Send cleanup signal (Task completed)
    end

    S->>Hosts: clean_hosts_file(dns_z) (Remove DNS entry for Z)
    S->>Hosts: clean_hosts_file(dns_c1) (Remove DNS entry for C1)
    S->>Hosts: clean_hosts_file(dns_c2) (Remove DNS entry for C2)

    S->>S: remove_auth_file("/etc/app_s/", "access_B.conf")
    S->>S: remove_auth_file(C1_AUTH_LOCATION, "auth_c1.conf") (Remove auth_c1.conf)
    S->>S: remove_auth_file(C2_AUTH_LOCATION, "auth_c2.json") (Remove auth_c2.json)

    S->>S: remove_env_variable('C1_AUTH_LOCATION') (Remove C1_AUTH_LOCATION from /etc/profile.local)
    S->>S: remove_env_variable('C2_AUTH_LOCATION') (Remove C2_AUTH_LOCATION from /etc/profile.local)
</pre>

1. **App S asks Server A** for the necessary data to set up the connection to Server B.

2. **Server A responds with data to App S**, including the **DNS names** (Z, C1, and C2) of Server B, which are **not publicly resolvable**.

3. With the Server A response in hand, **App S performs several actions**:

   - **DNS Entry Configuration**:

     - Calls the **`add_hosts_entry(dns_z, ip)`** function to add the DNS and IP for **App Z** to the **`/etc/hosts`** file.
     - Calls the **`add_hosts_entry(dns_c1, ip)`** function to add the DNS and IP for **App C1** to the **`/etc/hosts`** file.
     - Calls the **`add_hosts_entry(dns_c2, ip)`** function to add the DNS and IP for **App C2** to the **`/etc/hosts`** file.

   - **Environment Variables Configuration**:

     - Calls the **`add_env_variable('C1_AUTH_LOCATION', '/path/to/c1/auth')`** function to set the **C1_AUTH_LOCATION** environment variable in **`/etc/profile.local`**.
     - Calls the **`add_env_variable('C2_AUTH_LOCATION', '/path/to/c2/auth')`** function to set the **C2_AUTH_LOCATION** environment variable in **`/etc/profile.local`**.

   - **Authentication File Generation** (contains the authentication credentials (username and password) for Server B):

     - Calls the **`generate_access_B_conf()`** function to create the **`access_B.conf`** file for **App Z**.
     - Calls the **`generate_auth_c1_conf()`** function to create the **`auth_c1.conf`** file for **App C1**.
     - Calls the **`generate_auth_c2_json()`** function to create the **`auth_c2.json`** file for **App C2**.

   - **Saving Authentication Files**:

     - Calls the **`save_auth_file('/etc/app_s/', "access_B.conf")`** function to save the **`access_B.conf`** file in the appropriate directory for **App Z** to access
     - Calls the **`save_auth_file(C1_AUTH_LOCATION, "auth_c1.conf")`** function to save the **`auth_c1.conf`** file in the directory specified by **C1_AUTH_LOCATION**.
     - Calls the **`save_auth_file(C2_AUTH_LOCATION, "auth_c2.json")`** function to save the **`auth_c2.json`** file in the directory specified by **C2_AUTH_LOCATION**.

4. **App Z, App C1, and App C2 check for their respective configuration files** and verify that the **DNS names and IPs** are resolvable in the **`/etc/hosts`** file:

   1. If everything is in order (i.e., the DNS resolves and **`access_B.conf`**, **`auth_c1.conf`**, and **`auth_c2.json`** are present), **Apps Z, C1, and C2** send requests to **NGINX (acting as a transparent proxy)**. **NGINX** then forwards the requests to **Server B** using the credentials stored in each respective file.
   2. If something is missing or incorrect (e.g., the DNS doesn't resolve or configuration files are missing), **NGINX** forwards the authentication request to **Server B**, resulting in **Apps Z, C1, and C2** failing to authenticate and receiving a **403: Forbidden** response from **Server B**.

5. **Once the configuration data is no longer needed**, **Apps Z, C1, and C2 send a cleanup signal** (indicating that their tasks with **Server B** are complete) to **App S**, which then proceeds to clean up by:

   - Calls the **`clean_hosts_file(dns_z)`** function to remove the DNS entry for **App Z** and clean up the system.
   - Calls the **`clean_hosts_file(dns_c1)`** function to remove the DNS entry for **App C1**.
   - Calls the **`clean_hosts_file(dns_c2)`** function to remove the DNS entry for **App C2**.
   - Calls the **`remove_auth_file("/etc/app_s/", "access_B.conf")`** function to delete the **`access_B.conf`** file.
   - Calls the **`remove_auth_file(C1_AUTH_LOCATION, "auth_c1.conf")`** function to delete the **`auth_c1.conf`** file.
   - Calls the **`remove_auth_file(C2_AUTH_LOCATION, "auth_c2.json")`** function to delete the **`auth_c2.json`** file.
   - Calls the **`remove_env_variable('C1_AUTH_LOCATION')`** function to remove the **C1_AUTH_LOCATION** environment variable from the **`/etc/profile.local`** file.
   - Calls the **`remove_env_variable('C2_AUTH_LOCATION')`** function to remove the **C2_AUTH_LOCATION** environment variable from the **`/etc/profile.local`** file.

### Modifications needed

#### Server A

**Server A** must now send DNS information for three different clients: **Z**, **C1**, and **C2**. This requires modifying the response to include DNS entries for **C1**, **C2**, and **Z**.

**App S** can request the configuration for each client individually, which can make the system more flexible and scalable. Each client would receive its own configuration response, and **App S** can handle each configuration independently:

```http
GET /api/config/{client-unique-id}
```

Example response for Client 1:

```json
{
  "client_id": "client-c1-id",
  "dns_name": "c1.serverb.com",
  "ip_address": "192.168.1.10",
  "setup_data": {
    "username": "user-s",
    "password": "1two3four"
  }
}
```

#### Server B

Since **C1** and **C2** already know how to interact with **Server B**'s API, there are no changes needed to **Server B**'s endpoints or logic.

However, **Server B** is accessed via **NGINX** (acting as a **transparent proxy**):

- NGINX must be configured to handle the requests coming from the apps **Z**, **C1**, and **C2**.
- Each client will access **Server B** via its respective **DNS name** (`z.serverb.com`, `c1.serverb.com`, `c2.serverb.com`), and **NGINX** should be able to forward these requests to **Server B** transparently.
- NGINX should authenticate requests using credentials from the respective configuration files for **Z**, **C1**, and **C2**.

For the exemplification purposes of this challenge, the credentials will be base64-encoded and stored in files accessible to NGINX. When requests are forwarded, NGINX will check for the existence of these credentials, decode them, and pass them along as part of the HTTP Authorization header to **Server B**.

```nginx
server {
    listen 80;
    server_name z.serverb.com c1.serverb.com c2.serverb.com;

    location / {
        proxy_pass http://192.168.1.10;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Load credentials for each app based on its DNS name
        set $auth_file /etc/nginx/auth/$host.credentials;

        # Check if the credentials file exists before setting the header
        if (-f $auth_file) {
            # Base64-encoded Authorization header
            set $auth_basic "Basic $(cat $auth_file | base64)";

            # Set the Authorization header with base64-encoded credentials
            proxy_set_header Authorization $auth_basic;
        }
    }
}

```

#### Client Code for Application S

**1. DNS Entry Handling** will ensure that the **`add_hosts_entry`** function accepts parameters (`dns_name` and `ip`) and works correctly for **C1**, **C2**, and **Z**. This function will be responsible for adding the DNS entries for these applications into the **`/etc/hosts`** file, ensuring proper resolution of their respective DNS names to IP addresses.

```py
# Function to add DNS entries to /etc/hosts
def add_hosts_entry(dns_name, ip):
    if not dns_name or not ip:
        raise ValueError("DNS name and IP address must be provided.")

    try:
        with open("/etc/hosts", "a") as hosts_file:
            hosts_file.write(f"{ip} {dns_name}\n")
        logger.info(f"DNS entry {dns_name} with IP {ip} added to /etc/hosts.")
    except PermissionError:
        logger.error("Insufficient permissions to modify /etc/hosts.")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
```

Usage:

```py
add_hosts_entry(dns_c1, ip) # C1
add_hosts_entry(dns_c2, ip) # C2
add_hosts_entry(dns_z, ip)  # Z
```

**2. Cleanup Function for DNS Entries** will ensure that the **`clean_hosts_file`** function accepts the `dns_name` parameter and can handle the removal of DNS entries for **C1**, **C2**, and **Z** from the **`/etc/hosts`** file. This ensures that the system is properly cleaned up once the tasks of the applications have been completed.

```py
# Function to clean DNS entries from /etc/hosts
def clean_hosts_file(dns_name):
    if not dns_name:
        raise ValueError("DNS name must be provided.")

    try:
        with open("/etc/hosts", "r") as hosts_file:
            lines = hosts_file.readlines()
    except PermissionError:
        logger.error("Insufficient permissions to read /etc/hosts.")
        return
    except Exception as e:
        logger.error(f"An unexpected error occurred while reading /etc/hosts: {e}")
        return

    try:
        with open("/etc/hosts", "w") as hosts_file:
            for line in lines:
                if dns_name not in line:
                    hosts_file.write(line)
        logger.info(f"DNS entry {dns_name} removed from /etc/hosts.")
    except PermissionError:
        logger.error("Insufficient permissions to write to /etc/hosts.")
    except Exception as e:
        logger.error(f"An unexpected error occurred while writing to /etc/hosts: {e}")
```

Usage:

```py
# Remove DNS entries
clean_hosts_file('z.serverb.com')
clean_hosts_file('c1.serverb.com')
clean_hosts_file('c2.serverb.com')
```

### New implementations

To meet the new requirements for **C1** and **C2**, we will extend the existing **App S** by adding new functions, ensuring the current codebase remains untouched. This approach emphasizes gradual enhancements, preserving the stability of the system and ensuring that new features integrate smoothly without impacting existing functionality and userspace.

#### 1. File Permissions

For the purposes of this challenge, authentication files like `access_B.conf`, `auth_c1.conf`, and `auth_c2.json` will be created with restrictive file permissions (`chmod 600`). This ensures that only the owner of the file (the user running App S) has access to read and write, while preventing any other users or processes from accessing sensitive authentication data. A more advanced approach could involve using Linux group permissions or Access Control Lists (ACLs) to provide finer-grained access control.

```py
# Function to set file permissions to 600 (Owner can read/write, others have no access)
def set_file_permissions(file_path):
    if not file_path:
        raise ValueError("File path must be provided.")

    try:
        os.chmod(file_path, 0o600)
        logger.info(f"File permissions set to 600 for {file_path}")
    except PermissionError:
        logger.error(f"Insufficient permissions to change file mode for {file_path}")
    except Exception as e:
        logger.error(
            f"An unexpected error occurred while setting permissions for {file_path}: {e}"
        )


# Helper function to save files and set secure permissions
def save_auth_file(file_path, content):
    if not file_path or not content:
        raise ValueError("File path and content must be provided.")

    try:
        with open(file_path, "w") as auth_file:
            auth_file.write(content)
        # Set file permissions to 600 after saving the file
        set_file_permissions(file_path)
    except Exception as e:
        print(f"An error occurred while saving file {file_path}: {e}")
```

#### 2. Authentication File Generation

Since each client application has a different file format, custom functions can be added to generate the authentication files for **C1** and **C2** based on the Server A `setup_data` response, as these new clients store the information in formats different from that used by **Z**.

```py
# Plain config file (as implementation example) for C1
def generate_auth_c1_conf(setup_data):
    if not setup_data or "username" not in setup_data or "password" not in setup_data:
        raise ValueError("Setup data must include 'username' and 'password'.")

    c1_auth_location = os.getenv("C1_AUTH_LOCATION")
    if not c1_auth_location:
        raise EnvironmentError("C1_AUTH_LOCATION environment variable is not set.")

    try:
        auth_c1_conf_content = (
            f"username={setup_data['username']}\npassword={setup_data['password']}"
        )
        save_auth_file(
            os.path.join(c1_auth_location, "auth_c1.conf"), auth_c1_conf_content
        )
    except Exception as e:
        print(f"An error occurred while generating auth_c1.conf: {e}")


# JSON format, for C2, as described
def generate_auth_c2_json(setup_data):
    if not setup_data or "username" not in setup_data or "password" not in setup_data:
        raise ValueError("Setup data must include 'username' and 'password'.")

    c2_auth_location = os.getenv("C2_AUTH_LOCATION")
    if not c2_auth_location:
        raise EnvironmentError("C2_AUTH_LOCATION environment variable is not set.")

    try:
        auth_c2_json_content = json.dumps(
            {
                "username": setup_data["username"],
                "password": setup_data["password"],
            }
        )
        save_auth_file(
            os.path.join(c2_auth_location, "auth_c2.json"), auth_c2_json_content
        )
    except Exception as e:
        print(f"An error occurred while generating auth_c2.json: {e}")
```

Another approach could involve creating a generic function that accepts parameters such as the file format (e.g., plain text or JSON) and the destination path, allowing for more flexible authentication file generation.

```py
def generate_auth_file(setup_data, file_format, auth_location_env_var, file_name):
    if not setup_data or "username" not in setup_data or "password" not in setup_data:
        logger.error("Setup data must include 'username' and 'password'.")
        raise ValueError("Setup data must include 'username' and 'password'.")

    auth_location = os.getenv(auth_location_env_var)
    if not auth_location:
        logger.error(f"{auth_location_env_var} environment variable is not set.")
        raise EnvironmentError(
            f"{auth_location_env_var} environment variable is not set."
        )

    try:
        if file_format == "plain":
            auth_content = (
                f"username={setup_data['username']}\npassword={setup_data['password']}"
            )
        elif file_format == "json":
            auth_content = json.dumps(
                {
                    "username": setup_data["username"],
                    "password": setup_data["password"],
                }
            )
        else:
            logger.error(f"Unsupported file format: {file_format}")
            raise ValueError(f"Unsupported file format: {file_format}")

        file_path = os.path.join(auth_location, file_name)
        save_auth_file(file_path, auth_content)
        logger.info(
            f"{file_format.upper()} authentication file generated at {file_path}"
        )

    except Exception as e:
        logger.error(
            f"An error occurred while generating the {file_format} auth file: {e}"
        )
```

#### 3. Environment Variable Configuration

Functions can be added to configure the environment variables **C1_AUTH_LOCATION** and **C2_AUTH_LOCATION** in **`/etc/profile.local`**.

```py
# Function to add environment variables to /etc/profile.local
def add_env_variable(variable_name, variable_value):
    if not variable_name or not variable_value:
        raise ValueError("Both variable_name and variable_value must be provided.")

    try:
        with open("/etc/profile.local", "a") as profile_file:
            profile_file.write(f"export {variable_name}={variable_value}\n")
    except PermissionError:
        print("Error: Insufficient permissions to modify /etc/profile.local.")
    except Exception as e:
        print(f"An unexpected error occurred while modifying /etc/profile.local: {e}")
```

Usage:

```py
 add_env_variable('C1_AUTH_LOCATION', '/path/to/c1/auth')
 add_env_variable('C2_AUTH_LOCATION', '/path/to/c2/auth')
```

#### 4. Cleanup Functions

Functions can be added to remove authentication files and environment variables for **C1** and **C2**.

```py
# Function to remove authentication files
def remove_auth_file(auth_location, auth_file):
    if not auth_location or not auth_file:
        raise ValueError("Both auth_location and auth_file must be provided.")

    file_path = os.path.join(auth_location, auth_file)
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            print(f"Warning: File {file_path} does not exist.")
    except PermissionError:
        print(f"Error: Insufficient permissions to delete {file_path}.")
    except Exception as e:
        print(f"An unexpected error occurred while deleting {file_path}: {e}")

# Function to remove environment variables from /etc/profile.local
def remove_env_variable(variable_name):
    if not variable_name:
        raise ValueError("Variable name must be provided.")

    try:
        with open("/etc/profile.local", "r") as profile_file:
            lines = profile_file.readlines()
    except FileNotFoundError:
        print("Error: /etc/profile.local does not exist.")
        return
    except PermissionError:
        print("Error: Insufficient permissions to read /etc/profile.local.")
        return
    except Exception as e:
        print(f"An unexpected error occurred while reading /etc/profile.local: {e}")
        return

    try:
        with open("/etc/profile.local", "w") as profile_file:
            for line in lines:
                # Use regex to match the exact variable
                if not line.strip().startswith(f"export {variable_name}="):
                    profile_file.write(line)
    except PermissionError:
        print("Error: Insufficient permissions to write to /etc/profile.local.")
    except Exception as e:
        print(f"An unexpected error occurred while writing to /etc/profile.local: {e}")
```

Usage:

```py
# Remove auth files
remove_auth_file(os.getenv('C1_AUTH_LOCATION'), "auth_c1.conf")
remove_auth_file(os.getenv('C2_AUTH_LOCATION'), "auth_c2.json")

# Remove environment variables
remove_env_variable('C1_AUTH_LOCATION')
remove_env_variable('C2_AUTH_LOCATION')
```

#### 5. Monitoring System for Cleanup Signals

The monitoring system will observe signal files generated by **App Z**, **App C1**, and **App C2** to trigger the cleanup process. This system will monitor a specific directory for signal files and call the appropriate cleanup function when a signal is detected.

- The `monitor_cleanup_signals` function watches a dir (default `/var/tmp/app_signals`) for signal files from **App Z**, **C1**, or **C2**, indicating they’ve finished and need cleanup.
- When a signal file (e.g., `Z_done.signal`, `C1_done.signal`) is detected, the respective cleanup function is triggered and the signal file is deleted.

```py
# Function to monitor a directory for signal files
def monitor_cleanup_signals(signal_dir="/var/tmp/app_signals", check_interval=5):
    if not os.path.exists(signal_dir):
        logger.error(f"Signal directory {signal_dir} does not exist.")
        raise ValueError(f"Signal directory {signal_dir} does not exist.")

    logger.info(f"Monitoring {signal_dir} for cleanup signals...")

    while True:
        # Poll the signal directory every check_interval seconds
        for app_name in ["Z", "C1", "C2"]:
            signal_file = f"{app_name}_done.signal"
            signal_file_path = os.path.join(signal_dir, signal_file)

            if os.path.exists(signal_file_path):
                logger.info(f"Received cleanup signal from {app_name}.")
                # Call the appropriate cleanup function based on the app name
                cleanup_resources(app_name)
                # Remove the signal file after processing
                try:
                    os.remove(signal_file_path)
                    logger.info(f"Removed signal file: {signal_file_path}")
                except Exception as e:
                    logger.error(
                        f"Failed to remove signal file {signal_file_path}: {e}"
                    )

        # Wait for the next check
        time.sleep(check_interval)


# Cleanup logic based on the app name
def cleanup_resources(app_name):
    try:
        if app_name == "Z":
            cleanup_app_z()
        elif app_name == "C1":
            cleanup_app_c1()
        elif app_name == "C2":
            cleanup_app_c2()
        else:
            logger.warning(f"Unknown app name: {app_name}")
    except Exception as e:
        logger.error(
            f"An error occurred while cleaning up resources for {app_name}: {e}"
        )
```

For this challenge, a simplified approach was used with the filesystem and a shared path for signal writing. In another scenario, more advanced methods like socket communication or message queues (e.g., RabbitMQ, Kafka) could provide better scalability and real-time communication.

## PRs Splits Descriptions

The PRs will be split based on feature isolation, manageable size for easier reviews, and separation of functionality and tests. Each PR will focus on a specific feature or improvement to ensure clarity and minimize bugs.

1. **DNS Entry Management**:

   - Implement DNS handling for `C1`, `C2` and `Z`.
   - Modify existing DNS management, if needed.
   - Add tests for DNS functionality.

2. **Authentication File Handling**:

   - Implement creation of `auth_c1.conf` and `auth_c2.json`.
   - Apply file permissions.
   - Add tests for authentication files.

3. **Cleanup Logic**:

   - Implement cleanup for `C1`, `C2` and `Z`.
   - Maintain separate cleanup functions for each app.
   - Add tests for cleanup.

4. **Environment Variable Management**:

   - Handle environment variables for `C1` and `C2`.
   - Add tests for environment variable management.

5. **NGINX Configuration**:

   - Implement NGINX configuration for `C1`, `C2`, and `Z`.
   - Validate the configuration with tests or checks.

6. **Monitoring System for Cleanup Signals**:

   - Implement signal monitoring using the filesystem for cleanup.
   - Add tests for signal handling.
