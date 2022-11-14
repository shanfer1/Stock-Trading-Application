# Stock-Trading-Application
INSTALLATION GUIDE
The source code is available from two sources
1.	Attached source zip file in the email
2.	From my GitHub repo : https://github.com/shanfer1/Stock-Trading-Application.git (Preferred)
Step 1: Required Installation for Environments:
1.	Assuming git, NodeJS, npm, python already installed, if installed you can skip section to point number 2
a.	Install git from: https://github.com/git-for-windows/git/releases/download/v2.38.1.windows.1/Git-2.38.1-64-bit.exe
b.	Install NodeJS from (OS dependent): https://nodejs.org/en/download/
i.	My NodeJS version is v16.17.0
c.	Install Python from: https://www.python.org/downloads/
i.	My python version is 3.10.7
d.	In order to check version or python, Nodejs, npm:
i.	python --version
ii.	node –version
iii.	npm –version

Step 2: Source Code Access:
1.	Run: git clone https://github.com/shanfer1/Stock-Trading-Application.git

Step 3: Front End Setup:
Follow the commands to make the frontend up:
o	cd Stock-Trading-Application
o	cd frontend
o	npm install –verbose
o	Fix: Just in case of peer conflict comes up while npm installation run this command: npm install--verbose --legacy-peer-deps
o	npm start for running the server
o	Type localhost:4200 in browser window for accessing the application
	Preferred Browser: Chrome 
Step 4: Backend Setup:
•	cd Stock-Trading-Application
•	cd backend
•	pip install -r requirements.txt
•	python app.py
