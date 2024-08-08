# Socialmarket

Este repositório contém o código-fonte do projeto Socialmarket, uma aplicação construída com NestJS para fornecer uma plataforma de mercado social.

## Descrição

Socialmarket é uma aplicação server-side escalável e eficiente, desenvolvida utilizando o framework [NestJS](https://nestjs.com/).

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Executando a Aplicação

Para executar a aplicação, utilize um dos seguintes comandos:

### Ambiente de desenvolvimento
```bash
npm run start
```

### Modo watch
```bash
npm run start:dev
```

### Modo de produção
```bash
npm run start:prod
```

## Testes

Para executar os testes da aplicação, utilize:

### Testes unitários
```bash
npm run test
```

### Testes end-to-end
```bash
npm run test:e2e
```

### Cobertura de testes
```bash
npm run test:cov
```

## Licença

Este projeto está licenciado sob a licença MIT.

## Passos para Deploy em Produção

### 1. Atualize o Sistema e Instale o Certbot
```bash
sudo apt update
sudo apt install certbot
```

### 2. Obtenha Certificados SSL com Certbot
```bash
sudo certbot certonly --standalone -d domain.com
```

### 3. Instale e Configure o Nginx

#### Instale o Nginx:
```bash
sudo apt install nginx
```

#### Crie e edite a configuração para o Nginx:
```bash
sudo nano /etc/nginx/sites-available/domain.com
```

#### Adicione a seguinte configuração:
```bash
server {
    listen 80;
    server_name domain.com;
    return 301 https://$host$request_uri;  # Redirecionar HTTP para HTTPS
}

server {
    listen 443 ssl;
    server_name domain.com;

    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;  # Ajuste de acordo com a porta da sua aplicação
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Execute os comandos
```bash
sudo mkdir -p /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/socialmarket-api.iza.dev.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Docker Setup

#### Crie uma rede Docker:
```bash
docker network create mynetwork
```

#### Execute o MySQL no Docker:
```bash
docker run --name socialmarket-mysql --network mynetwork -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:latest
```

#### Acesse o container MySQL:
```bash
docker exec -it socialmarket-mysql bash
```

#### No terminal do container, acesse o MySQL:
```bash
mysql -u root -p
```

#### Crie o esquema de banco de dados:
```bash
CREATE SCHEMA socialmarket;
SHOW DATABASES;
```

#### Execute a aplicação no Docker:
```bash
docker run --name socialmarket-api --network mynetwork --env-file .env -d -p 3000:3000 izaeldev/socialmarket-api:1.0
```
