## Description

Small package navigation utility made with React for Debian family Linux systems or systems with dpkg.
This utility converts `status.real` files made with dpkg into html.

## Deploy

Build and deploy with Docker:  
`docker build .`  
`docker run -p 80:8080 <Image name or id> `

Utility has been deployed on [Heroku](https://tranquil-springs-15086.herokuapp.com/).

## Usage

Run included `getPackages.sh` script to make the `status.real` file which contains information about installed packages in your system. Input the `status.real` file into this navigation utility to convert it into html.

## TODO

- Menubar
- Backend and database
- Login
- Refactoring
