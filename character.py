import pymongo
from datetime import datetime, timedelta

db_name="scotland_yard"
db_server="127.0.0.1:27017"


myclient = pymongo.MongoClient("mongodb://"+db_server+"/")
db = myclient[db_name]
characterDb = db['characters']
modeData = list(characterDb.find({}))

characters = ['Mr.X', 'Red', 'Blue', 'Green', 'Yellow', 'Purple']

if len(modeData) == 0:
    #seed
    print("Starting to seed characters, do not interrupt")
    for c in characters:
        data = {
            'name':c
        }
        data = characterDb.insert_one(data)
    print("characters seeded")
else:
    print("Already seeded")