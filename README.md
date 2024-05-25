# Transportation System: MagicPost

## :star2: Introduction

System for sneding,controlling and receiving package from start point to destination point.

We have 5 actors: administrator(s), leader of a warehouse, leader of a transaction point, and staff of 2 points.

## 🫂: Authors

Here are the authors of this project and infors to contact us:
* Duong Nguyen Viet Anh [dnvietanhvnuuet@gmail.com]
* Hoang Van Nguyen [21020370@vnu.edu.vn]
* Nguyen Tuan Anh [21020276@vnu.edu.vn]

## :wrench: Installation

Our project is based on **Vue.js + Tailwindcss** for client side and **Node.js + Express.js + ECMAScript (ES6)** for server side. Moreover, we use **JSON Web Token (JWT)** for authentication in back-end. 

Datas for instant courses are crawled in Udemy platform.

Requirements:
* Vue.js 3.2.13
* Vuex 4.0.2
* Node.js 20.10.0
* npm >= 10.2.3
* Sequelize 6.34.0

Step-by-step introductions to get you running DNA ONline Course Web:
### 1) Clone this repository to your local machine:

```bash
git clone https://github.com/vanhsusu03/Magic-Post.git
```
### 2) Running the client side

```bash
cd client
npm install
npm run serve
```
If the website running successfully, you can access it at ```https://localhost:8080```

### 3) Prepare for server side
* Open your SQL database workbench (MySQL Workbench for XAMPP, example) and running ```INSERT_DATA_GEO_VN.sql``` file and ```magicpost_schema.sql``` file to create "magic" database. Then, running ```magicpost_data.sql``` file to insert datas to using system.
* Config the .env file in server folder to your SQL config setup (HOST_NAME, PORT, PASSWORD,...)

### 4) Running the server side

```bash
cd server
npm install (or npm i)
npm run dev
```
If it's run successfully, you will see ***"[SERVER INFO] RUNNING ON PORT 3000"***.

You can access to ```http://localhost:3000/api-docs/``` to see detail and control (running and testing) the APIs using in project.

## :raising_hand: Questions
If you have any questions about running this code, or this project, contact Duong Nguyen Viet Anh (dnvietanvnuuet@gmail.com/dnvietanhctn@gmail.com).

