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

## Server Setup

- Add ssh key to ~/.ssh/authorized_keys
- Create new user
- Activate firewall
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
- On the browser go to your server's URL to run the app