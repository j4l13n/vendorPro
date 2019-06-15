# VendorPro
-----------
The vendor project will help vendors to manage their members

## Installation

> clone the repo from github
```
> git clone https://github.com/j4l13n/vendorPro.git
```

> Navigate to the repository
```
> cd vendorPro
```

> install dependencies and development dependencies
```
> npm install
```

## create database to postgresql
```
> createdb vendordb
```
remember to change the password in config.json file for development

## create your config file
> create config.json file into 'server/config/' and add same data as 'example.config.json' 
remember to change database user, and password

## add table to database

```
> sequelize db:migrate
```
The above command will migrate all table to your database

## start the application
```
> npm start
```


### Contributor

- Karangwa Hirwa Julien <julien.hirwa@andela.com>
- Samuel Adafia <samuel.adafia@andela.com>
- Manzi Fabrice Karemera<fabrice.karemera@andela.com>
- Emile Nsengimana <emile.nsengimana@andela.com>
- Ndahimana Dominique Xavier <dominique.ndahimana@andela.com>

