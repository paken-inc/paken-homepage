# paken-homepage

## How to run

```
    - Install NodeJS
    - git clone https://github.com/paken-inc/paken-homepage
    - cd paken-homepage
    - npm install
    - cd paken-homepage-frontend
    - npm install
    - npm run build
    - change to root folder
    - create secret-config.json file
    - npm start
    - On your browser go to localhost:4000
```

## secret-config.json

```
{
    "SESSION_KEY": "xxxxxxxxxx",
    "SESSION_NAME": "xxxxxxxxxxxx",
    "PAKEN_TOKEN": "xxxxxxxxxxxxxx"
}
```

## Server Setup Links

- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04
- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
- https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04
- https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04

## Server Setup

- Add ssh key to ~/.ssh/authorized_keys
- Create new user
- Activate firewall
- Set timezone to Europe/Lisbon
```
sudo timedatectl set-timezone Europe/Lisbon
```
- Install Nginx
- Install NodeJS
- Git clone NodeJS Application
- Change config.json with your URL on the back-end and the front-end.
- Copy the secret-config.json file
- Change the DB connection to your server's MySQL password
- Install PM2
- Install MySQL
- Run this command to set MySQL password:
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'mynewpassword';
- sudo mysql_secure_installation
- Setup a reverse proxy for your app with Nginx on /etc/nginx/sites-available
- Use PM2 to start your app's process
- pm2 save
- Restart Nginx
- On the browser go to your server's URL to run the app

## Server setup in production

- Change server name to your domain on /etc/nginx/sites-available
- Run certbot

## Important commands

- Access to mysql:
```
mysql -u root -p
```

- Import SQL file
```
mysql -u root -p database_name < file.sql
```

- Export SQL file
```
mysqldump -u root -p database_name > file.sql
```

- Create SSL certificate
```
sudo certbot --nginx -d domain.com -d www.domain.com
```

## How to create subdomain

- Add an A record with your subdomain
- Create a new file on /etc/nginx/sites-available with the following server block.
```
server {
        listen 80;
        listen [::]:80;

        root /home/user/myapp;
        index index.html index.htm index.nginx-debian.html;

        server_name myapp.paken.xyz;

        location / {
                try_files $uri $uri/ =404;
        }
}
```
- Create a link on sites-enabled with this command:
```
sudo ln -s ../sites-available/myapp.paken.xyz .
```
- Use this command to make sure nginx has permission to access the folder:
```
sudo gpasswd -a www-data user
```
- Restart nginx and test the website on your browser.
- Run certbot on your new subdomain like this.
```
sudo certbot --nginx -d myapp.paken.xyz
```
- Your subdomain should now be working at https://myapp.paken.xyz