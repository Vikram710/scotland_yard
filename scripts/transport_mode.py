import pymongo
from datetime import datetime, timedelta

db_name="scotland_yard"
db_server="127.0.0.1:27017"


myclient = pymongo.MongoClient("mongodb://"+db_server+"/")
db = myclient[db_name]
modeDb = db['transports']
modeData = list(modeDb.find({}))

modes = ['Taxi', 'Underground', 'Bus', 'Boat']

if len(modeData) == 0:
    #seed
    print("Starting to seed positions, do not interrupt")
    for mode in modes:
        data = {
            'name':mode.lower()
        }
        data = modeDb.insert_one(data)
    print("positions seeded")
else:
    print("Already seeded")