# Stock-Trading-Application
INSTALLATION GUIDE
## GET the Code
1.	From my GitHub repo : https://github.com/shanfer1/Stock-Trading-Application.git (Preferred)
## Step 1: Required Installation for Environments:
1.	Assuming git, NodeJS, npm, python already installed, if installed you can skip section to point number 2
*	Install git from: https://github.com/git-for-windows/git/releases/download/v2.38.1.windows.1/Git-2.38.1-64-bit.exe
*	Install NodeJS from (OS dependent): https://nodejs.org/en/download/
*	My NodeJS version is v16.17.0
*	Install Python from: https://www.python.org/downloads/
*	My python version is 3.10.7
*	In order to check version or python, Nodejs, npm:
*	python --version
*	node –version
*	npm –version

## Step 2: Source Code Access:
1.	Run: git clone https://github.com/shanfer1/Stock-Trading-Application.git

## Step 3: Front End Setup:
Follow the commands to make the frontend up:
* cd Stock-Trading-Application
* cd frontend
* npm install –verbose
* Fix: Just in case of peer conflict comes up while npm installation run this command: npm install--verbose --legacy-peer-deps
* npm start for running the server
* Type localhost:4200 in browser window for accessing the application
* Preferred Browser: Chrome 
## Step 4: Backend Setup:
* cd Stock-Trading-Application
* cd backend
* python -m ensurepip
* python -m pip install -r requirements.txt 
* python app.py


## Step 5: For Admin Acess:
Use Username: admin 
Password :admin@123
