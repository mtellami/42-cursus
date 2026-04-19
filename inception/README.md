<div align="center">

# 🐋  Inception 🐋
## System administration using Docker
</div>

> This project aims to expand your knowledge of systems administration using Docker. You need to virtualize several Docker images by creating them in your personal virtual machine.

<br>

### Overview
In the mandatory part, a container with nginx and only it must be accessible through port 443, exposing the services of the internal docker network for public access. The nginx service connects to the wordpress container running php-fpm which stores the data in a mariadb service on the network. The wordpress and mariadb website data must be persisted each in its own volume.

For the bonus we have to configure a container with an FTP server that accesses the wordpress volume, a static site, redis to cache the database requests and a useful service of our choice.

### Architecture :
<img src="https://user-images.githubusercontent.com/54292953/147146268-a616f39a-3f16-41f8-80c9-db5494c3dfe7.png"><br>

### Services:
#### - Mariadb :
MariaDB acts as a reliable and robust database management system, ensuring efficient data storage and retrieval for WordPress application. By running within a Docker container, MariaDB provides an isolated and portable environment, making deployment and scaling easier. This containerization facilitates seamless management and eliminates potential conflicts with the host system, ensuring a consistent and reproducible environment across different stages of development and deployment.

The integration of MariaDB with WordPress is critical as it enables your website or application to store essential data, such as user information, posts, comments, and various settings. It acts as the backbone of your dynamic content, efficiently handling read and write operations for smooth and responsive user experiences.

The connection between MariaDB and the WordPress container through port 3306 allows for secure communication and data transfer between the two components. By having this clear separation, you can manage and update each component independently without disrupting the other, promoting maintainability and minimizing potential points of failure.

The implementation of a Docker volume for data storage in MariaDB further enhances its importance. Docker volumes provide a reliable mechanism for persisting data outside the container's lifecycle. This means that even if the MariaDB container is stopped, restarted, or replaced, the data will persist in the volume, preventing data loss and promoting data durability.

The Docker volume also facilitates data backup and restoration processes, ensuring data integrity and reducing the risk of data corruption. Moreover, with the use of volumes, you can easily migrate your project to different environments without worrying about data transfer complications, making it highly portable and adaptable.
#### - Wordpress
Installing WordPress on a Docker container and running PHP-FPM within that container, which interfaces with an Nginx server on port 9000, offers a range of benefits for the application. By leveraging Docker, create a portable and consistent environment, making deployment and scalability hassle-free. Running PHP-FPM on the container allows for efficient and optimized processing of PHP files, ensuring better performance and resource management.

The interface between PHP-FPM and Nginx through port 9000 promotes seamless communication and data exchange, enabling Nginx to serve PHP-generated content and handle web requests effectively. This decoupling of services enables independent updates and modifications, ensuring flexibility and ease of maintenance.

The critical advantage of sharing a Docker volume between the WordPress and Nginx containers lies in the preservation and synchronization of WordPress files. By storing these files in a common volume, you ensure that updates made within the WordPress container are instantly available to Nginx. This seamless sharing of data eliminates the need for manual file transfers or synchronization, streamlining the development process and reducing the risk of inconsistencies between the two containers.

#### - Nginx
In this setup, Nginx is running within a Docker container, serving as the web server for your WordPress site hosted in another container. Both the Nginx container and the WordPress container share the same Docker volume, which allows them to access and share necessary files and data seamlessly. The Nginx container is configured to listen on the internet via port 443, providing secure HTTPS access to your WordPress site.

Running Nginx in a Docker container offers several advantages. Firstly, it provides an isolated environment for the web server, ensuring that any dependencies or configurations specific to Nginx do not interfere with the host system. This isolation promotes consistency and makes it easier to manage the web server's configuration across different environments.

Additionally, using Nginx as the web server for your WordPress site can significantly improve performance. Nginx is known for its high performance, efficiency, and low resource consumption. It can handle a large number of concurrent connections and efficiently serve static content, reducing the load on the backend application (in this case, WordPress) and improving response times for users.

Overall, the combination of Nginx running on a Docker container, serving the WordPress site hosted in another container with a shared volume, and listening on port 443 for HTTPS connections, creates a secure, scalable, and performant environment for hosting your WordPress website. This setup simplifies deployment, enhances data consistency, and ensures that your users can access your site securely and with optimal performance.

## Implementation - Technical Part
### - Docker-compose <br>
Docker Compose is a tool that was developed to help define and share multi-container applications. With Compose, we can create a YAML file to define the services and with a single command, can spin everything up or tear it all down.
I use docker compose to the three containers with the appropriate order, ports, shared volumes, networks. it help run, stop and restart the containers smoothly.

```yml
  services:
  nginx:
    container_name: nginx;
    build:
      context: ./requirements/nginx
      dockerfile: Dockerfile
    depends_on:
      - wordpress
    volumes:
      - wordpress:/var/www/wordpress
    ports:
      - "443:443"
    networks:
      - inception
    env_file:
      - .env
  wordpress:
    container_name: wordpress
    build:
      context: ./requirements/wordpress
      dockerfile: Dockerfile
    depends_on:
      - mariadb
    volumes:
      - wordpress:/var/www/wordpress
    networks:
      - inception
    ports:
       - "9000:9000"
    env_file:
      - .env
  mariadb:
    container_name: mariadb
    build:
      context: ./requirements/mariadb
      dockerfile: Dockerfile
    volumes:
      - mariadb:/var/lib/mysql
    networks:
      - inception
    ports:
      - "3306:3306"
    env_file:
      - .env
```

### - Dotenv file
a dotenv is used to store “environment variables” AKA variables we need to configure our code environment. This can include information like database name, users, passwords, open ports. These variables are ones we need in order to access our project’s various services but don’t want others to be able to see and access. An example of this would include API keys ...etc

### - container image
A Docker image is a file used to execute code in a Docker container. Docker images act as a set of instructions to build a Docker container, like a template. Docker images also act as the starting point when using Docker. An image is comparable to a snapshot in virtual machine (VM) environments.

### - Dockerfile
The three images are build with Dockerfile based on Debian:buster image, Dockerfile allow me to build my custom image based on another base image, in this case 'debian:buster' (FROM) and install all the dependencies nedded to run the container (RUN ..), Also i can set the default executable of the image (CMD). and specify the litening port for the container on the network.

```dockerfile
  FROM [Base image]
  COPY [configurations]
  RUN [Dependencies ...]
  EXPOSE [Port]
  CMD [run command]
```

### - Docker container
### - Docker network
### - Docker volume

<img src="https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo-2015-2017.png">

## Conclution
The use of three separate containers, each dedicated to specific components (MariaDB, WordPress, and Nginx), represents an efficient and well-designed approach for creating a high-performance website while adhering to best practices. By isolating each part into individual containers, this setup ensures that every component operates independently, minimizing potential conflicts and improving overall system stability.

Starting with the MariaDB container, it serves as the database management system, providing robust and reliable data storage for the website. Its isolation allows for easy management and scaling, and data remains persistent even if the container is replaced or updated, thanks to the use of Docker volumes.

The WordPress container houses the web application, managing content creation, user interactions, and dynamic functionalities. Running WordPress in a separate container guarantees a clean separation from other services, making it easier to maintain, update, and replace without affecting the rest of the setup.

The use of three separate containers, each dedicated to specific components (MariaDB, WordPress, and Nginx), represents an efficient and well-designed approach for creating a high-performance website while adhering to best practices. By isolating each part into individual containers, this setup ensures that every component operates independently, minimizing potential conflicts and improving overall system stability.

<hr>

<img src="https://mariadb.com/wp-content/uploads/2019/11/mariadb-horizontal-white.svg">

Starting with the MariaDB container, it serves as the database management system, providing robust and reliable data storage for the website. Its isolation allows for easy management and scaling, and data remains persistent even if the container is replaced or updated, thanks to the use of Docker volumes.

<hr>

<img src="https://brandslogos.com/wp-content/uploads/images/large/wordpress-logo.png">

The WordPress container houses the web application, managing content creation, user interactions, and dynamic functionalities. Running WordPress in a separate container guarantees a clean separation from other services, making it easier to maintain, update, and replace without affecting the rest of the setup. 

<img src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png">

Managing this setup with Docker containers, networks, and volumes offers several advantages. Docker enables the encapsulation of each component, ensuring consistent and reproducible deployments across different environments. Its containerization allows for easy scaling, load balancing, and failover, ensuring the website can handle increased traffic without compromising performance. Docker networks facilitate seamless communication between containers, and by exposing only necessary ports, the attack surface is minimized, enhancing security.

Using Docker volumes for data storage ensures that critical data, such as the website's content, configuration files, and databases, remains durable and preserved, even if containers are updated, replaced, or fail. This data persistence also simplifies backup and migration processes, allowing for smooth disaster recovery and easy movement between development, staging, and production environments.

In conclusion, the deployment of three separate containers (MariaDB, WordPress, and Nginx) represents an efficient and well-architected approach for creating a high-performance website that adheres to best practices. Isolating each component ensures seamless maintenance, scalability, and improved system stability. Managing this setup with Docker containers, networks, and volumes further enhances these benefits, providing a robust and reliable infrastructure that delivers an excellent user experience and facilitates efficient website management.
