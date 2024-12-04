# Club Bônus

This repository contains the source code for the Club Bônus project, an application built with NestJS to provide a social marketplace platform.

## Description

Club Bônus is a scalable and efficient server-side application developed using the [NestJS](https://nestjs.com/) framework.

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Running the Application

To run the application, use one of the following commands:

### Development environment
```bash
npm run start
```

### Watch mode
```bash
npm run start:dev
```

### Development mode
```bash
npm run start:dev
```

## Testing

To run the application tests, use:

### Unit tests
```bash
npm run test
```

### End-to-end tests
```bash
npm run test:e2e
```

### Test coverage
```bash
npm run test:cov
```

## License

This project is licensed under the MIT License.

## Steps for Production Deployment

To install Docker on an Ubuntu machine, follow the steps below:

First, update the apt package index:

```bash
sudo apt-get update
```

Install the necessary packages to allow apt to use repositories over HTTPS:

```bash
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

Add Docker’s official GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Add Docker's repository to APT sources:

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

Update the apt package index again:

```bash
sudo apt-get update
```

Make sure you are installing from the Docker repository instead of the default Ubuntu repository:

```bash
sudo apt-get install docker-ce
```

Verify that the installation was successful by running the following command. This should display the installed Docker version:

```bash
docker --version
```

### 1. Update the System and Install Certbot
```bash
sudo apt update
sudo apt install certbot
```

### 2. Obtain SSL Certificates with Certbot
```bash
sudo certbot certonly --standalone -d {{domain.com}}
```

### 3. Install and Configure Nginx

#### Install Nginx:
```bash
sudo apt install nginx
```

#### Create and edit the configuration for Nginx:
```bash
sudo nano /etc/nginx/sites-available/{{domain.com}}
```

#### Add the following configuration:
```bash
server {
  listen 80;
  server_name {{domain.com}};
  return 301 https://$host$request_uri;  # Redirect HTTP to HTTPS
}

server {
  listen 443 ssl;
  server_name {{domain.com}};

  ssl_certificate /etc/letsencrypt/live/{{domain.com}}/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/{{domain.com}}/privkey.pem;

  location / {
    proxy_pass http://localhost:3000;  # Adjust according to your application's port
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

#### Run the following commands:
```bash
sudo mkdir -p /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/{{domain.com}} /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Docker Setup

#### Run the application in Docker:
```bash
docker run --name {{appname}} --network mynetwork --env-file .env -d -p 3000:3000 {{dockerUser}}/{{appname}}:1.0
```
