from flask import Flask,request,jsonify
import requests
from datetime import date
from datetime import datetime
from dateutil.relativedelta import relativedelta
from flask_cors import CORS
import sqlite3
from sqlite3 import Error

import json
app = Flask(__name__)

CORS(app)

@app.route("/api/detail/<ticker>")
def getTickerDetail(ticker):
    print(ticker)
    details={}
    try:
        sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM Stocks WHERE STOCK_TICKER=?", (ticker,))
        rows=cursor.fetchall()
        if len(rows)==0:
            details={
                "success":False,
                "results":[]
            }
        else:
            row=rows[0]
            res=[{'name':row[0],'ticker':row[1],'description':row[2],'exchangeCode':row[3],'startDate':row[4],'closingprice':row[5],'currentprice':row[6]}]
            details={
                "success":True,
                "results":res
            }
        cursor.close()
        print("the ticker is fetched from db")
        print(rows)
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    return jsonify(details)
    
    

@app.route("/api/search/<ticker>")
def searchTicker(ticker):
    r = requests.get('https://api.tiingo.com/tiingo/utilities/search?query='+ticker+'&token=8bb5d357e4616c9938090e9e3de7acefc38d224b')
    r=r.json()
    data=processData(r)
    print("the data after search (/api/search/<ticker> is ",data)
    return data

def processData(data):
    results={'results':[],'total':0}
    for i in range(len(data)):
        if data[i]['name']:
            results['results'].append({'name':data[i]['name'],'ticker':data[i]['ticker']})
    results['total']=len(results['results'])
    return results

@app.route("/api/price/<ticker>")
def getPriceticker(ticker):
    price={}
    r = requests.get('https://api.tiingo.com/iex/?tickers='+ticker+'&token=8bb5d357e4616c9938090e9e3de7acefc38d224b')
    r=r.json()
    if not r:
        price['results']=[]
        price['success']=False
    else:
        price['results']=r
        price['success']=True
    return price

@app.route("/api/chart/daily/<ticker>/<startDate>")
def getDailychart(ticker,startDate):
    dailyChart={}
    details='details'
    print(ticker)
    print(startDate)
    r = requests.get('https://api.tiingo.com/iex/'+ticker+'/prices?startDate='+startDate+'&resampleFreq=4min&token=8bb5d357e4616c9938090e9e3de7acefc38d224b')
    r=r.json()
    if details in r:
        dailyChart['results']=[]
        dailyChart['success']=False
    else:
        dailyChart['results']=r
        dailyChart['success']=True
    return dailyChart


@app.route("/api/news/<ticker>")
def getNews(ticker):
    news={}
    r = requests.get('https://newsapi.org/v2/everything?apiKey=02b9e74dc8a54b8cb99ef52fa07cd062&q='+ticker)
    r=r.json()
    if not r:
        news['results']=[]
        news['success']=False
    else:
        news['results']=processNews(r['articles'])
        news['success']=True
    return news

@app.route("/api/chart/historical/<ticker>")
def getChartHistory(ticker):
    detail='detail'
    startDate = datetime.now() - relativedelta(years=2)
    x=str(startDate).split(" ")
    print(x[0])
    histChart={}
    r = requests.get('https://api.tiingo.com/iex/'+ticker+'/prices?startDate='+x[0]+'&resampleFreq=4min&token=8bb5d357e4616c9938090e9e3de7acefc38d224b')
    r=r.json()
  
    if not r or detail in r:
        histChart['results']=[]
        histChart['success']=False
    else:
        histChart['results']=r
        histChart['success']=True
    return histChart


@app.route("/api/stocks")
def getStocksFromDB():
    rows=[]
    res=[]
    try:
        sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()    
        # cursor.execute("INSERT INTO Stocks (Stock_Name, STOCK_TICKER, OPENING_PRICE,CLOSING_PRICE,CURRENT_PRICE,HIGH_PRICE,VOLUME) VALUES (?, ?, ?,?,?,?,?)",("APPLE","AAPL",345,367,450,550,5000))
        # insertIntoStocks(sqliteConnection)
        sql = " SELECT * FROM Stocks"
        cursor.execute(sql)
        rows=cursor.fetchall()
        print("printing from /api/stocks")
        print(len(rows))
        res=[]
        for row in rows:
            temp={'name':row[0],'ticker':row[1],'description':row[2],'exchangeCode':row[3],'startDate':row[4],'closingprice':row[5],'currentprice':row[6]}
            res.append(temp)
        cursor.close()
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    return jsonify(res)

def processNews(data):
    results=[]
    for i in range(len(data)):
        if data[i]['url'] and data[i]['title'] and data[i]['description'] and data[i]['source']['name'] and data[i]['urlToImage'] and data[i]['publishedAt']:
            results.append({'url':data[i]['url'],'title': data[i]['title'] ,'description': data[i]['description'] ,'source': data[i]['source']['name'],'urlToImage': data[i]['urlToImage'],'publishedAt': data[i]['publishedAt']})
    return results



def createStockTables():
    try:

        sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("DROP TABLE IF EXISTS Stocks")
        cursor.execute("DROP TABLE IF EXISTS StockPrices")
        sql = "CREATE TABLE Stocks (Stock_Name VARCHAR(255) NOT NULL, STOCK_TICKER CHAR(25) NOT NULL, Description TEXT, Exchange_Code VAR_CHAR, START_DATE VARCHAR(255),CLOSINGPRICE INT,CURRENT_PRICE INT); "
        cursor.execute(sql)
        sql = "CREATE TABLE StockPrices (Stock_TICKER CHAR(25) NOT NULL,TIMESTAMP VARCHAR(255),LAST INT, PREV_CLOSE INT,OPENING_PRICE INT, HIGH_PRICE INT,LOW_PRICE INT, MID_PRICE INT,VOLUME INT,BID_SIZE INT, BIDPRICE INT,ASKSIZE INT,ASK_PRICE INT ); "
        cursor.execute(sql)
        insertIntoStocks(sqliteConnection)
        sqliteConnection.commit()
        cursor.close()

    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

def insertIntoStocks(sqliteConnection):
    try:
        print("------------Populating the Stocks Table----------------------")
        # sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()
        f = open('defaultstocks.json')
        data = json.load(f)
        vals=[]
        for element in data['stocks']:
            vals.append((element['StockName'],element['ticker'],element['DESCRIPTION'],element['EXCHANGECODE'],element['STARTDATE'],int(element["closingprice"]),int(element["currentprice"])))
        f.close()
        for val in vals:
            cursor.execute("INSERT INTO Stocks (Stock_Name,STOCK_TICKER, Description, Exchange_Code, START_DATE,CLOSINGPRICE,CURRENT_PRICE) VALUES (?,?,?,?,?,?,?)",val)
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)

def getConnection(db_file):
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn


@app.route("/api/users/authenticate",methods=['POST'])
def authenticateUser():
    print("the data for authenttication")
    details={}
    data=request.get_json()
    username=data['username']
    password=data['password']
    try:
        sqliteConnection=getConnection('UserManagement.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM Users WHERE Username=? AND Password=?", (username,password))
        rows=cursor.fetchall()
        if len(rows)==0:
            details={
                "success":False,
                "user":{}
            }
            print("the user is not authenticated")
        else:
            print("the user is authenticated")
            row=rows[0]
            res={'username':row[0],'password':row[1],'firstName':row[2],'lastName':row[3],'email':row[4]}
            details={
                "success":True,
                "user":res
            }
        cursor.close()
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    return jsonify(details)


@app.route("/api/stocks/register",methods=['POST'])
def registerStock():
    details={}
    data=request.get_json()
    name=data['name']
    ticker=data['ticker']
    description=data['description']
    closingprice=data['closingprice']
    currentprice=data['currentprice']
    today = str(date.today())
    Exchange_Code="NASDAQ"
    print("the ticker sent for registration is ",ticker)
    val=(name,ticker,description,Exchange_Code,today,closingprice,currentprice)
    try:
        sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM Stocks WHERE STOCK_TICKER=?", (ticker,))
        rows=cursor.fetchall()
        print("the data fecthed from DB is for ticker ",ticker)
        print(rows)
        print(len(rows))
        if len(rows)!=0:
            print("the reg is not successful ")
            details={
                "success":False,
                "user":data
            }
        else:
            cursor.execute("INSERT INTO Stocks (Stock_Name,STOCK_TICKER, Description, Exchange_Code, START_DATE,CLOSINGPRICE,CURRENT_PRICE) VALUES (?,?,?,?,?,?,?)",val)
            print("the reg is successful")
            details={
                "success":True,
                "user":data
            }
            sqliteConnection.commit()
        cursor.close()
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    return jsonify(details)

@app.route("/api/users/register",methods=['POST'])
def registerUser():
    details={}
    
    data=request.get_json()
    username=data['username']
    password=data['password']
    firstname=data['firstName']
    lastname=data['lastName']
    email=data['email']
    val=(username,password,firstname,lastname,email)
    try:
        sqliteConnection=getConnection('UserManagement.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM Users WHERE Username=? AND Password=?", (username,password))

        rows=cursor.fetchall()
        print("the rows after given for registration")
        print(rows)
        if len(rows)!=0:
            print("the reg is not successful ")
            details={
                "success":False,
                "user":data
            }
        else:
            cursor.execute("INSERT INTO Users (Username,Password, FirstName, LastName, Email) VALUES (?,?,?,?,?)",val)
            print("the reg is successful")
            details={
                "success":True,
                "user":data
            }
            sqliteConnection.commit()
        cursor.close()
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    return jsonify(details)



def createUsersTables():
    try:
        sqliteConnection=getConnection('UserManagement.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("DROP TABLE IF EXISTS Users")
        sql = "CREATE TABLE Users (Username VARCHAR(255) NOT NULL, Password CHAR(25) NOT NULL,  FirstName VAR_CHAR, LastName VARCHAR(255),Email VARCHAR(255)); "
        cursor.execute(sql)
        insertIntoUsers(sqliteConnection)
        sqliteConnection.commit()
        cursor.close()

    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

def insertIntoUsers(sqliteConnection):
    try:
        print("------------Populating the Users Table----------------------")
        # sqliteConnection=getConnection('STOCKS_DB.db')
        cursor = sqliteConnection.cursor()
        val=('admin','admin@123','admin','','admin@gmail.com')
        cursor.execute("INSERT INTO Users (Username,Password, FirstName, LastName, Email) VALUES (?,?,?,?,?)",val)
    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)


if __name__ == "__main__":
    createStockTables()
    createUsersTables()
    app.run(debug=True,port=5000)