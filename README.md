# Blog_Management_App


# Pre Requirements
1. Make a Local Folder named Blog_Management_App
2. Now pull origin from Github Desktop <br>
Note:- Github project folder wont have node modules on contrast to your local project folder 

# How to Run
1. Download the zip file of the project
2. Extract the zip file to your desired local folder
3. Open terminal and run the following commands<br> 
```
cd <path to your local folder>
pip install -r requirements.txt
```

```
cd Project
cd client
npm install
```

let the npm do its thing then run the below commands in terminal

```
cd ..
cd server
npm install --force --legacy-peers-deps
```

4.Now close your current terminal and open two new terminals and run one terminal with the following commands:

```
cd <path to the 'Project' folder>
cd client
npm start
```

and another with these commands

```
cd <path to the 'Project' folder>
cd server
node index.js
```

5.The client runs on localhost port number 3000 and the server is using localhost port:3001

# Commit
On Commiting copy everything except node modules and paste in Github Project repo

