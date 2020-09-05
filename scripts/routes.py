import pymongo
from bson.objectid import ObjectId
from datetime import datetime, timedelta

db_name="scotland_yard"
db_server="127.0.0.1:27017"

file_path = './resources/routes.txt'

routes = []
route = []
with open(file_path) as fp:
   line = fp.readline()
   cnt = 1
   while line:
        if(cnt > 1):
            route = line.strip().split(' ')
            route[0] = int(route[0])
            route[1] = int(route[1])
            route[2] = route[2].lower()
            routes.append(route)
        line = fp.readline()
        cnt += 1

myclient = pymongo.MongoClient("mongodb://"+db_server+"/")
db=myclient[db_name]
routeDb = db['routes']
routeData = list(routeDb.find({}))
modeDb = db['transports']
modeData = list(modeDb.find({}))

if len(routeData) == 0:
    print("Starting to seed routes, do not interrupt")
    for route in routes:
        id = 0
        for d in modeData:
            if d['name'] == route[2]:
                id = d['_id']
        #seed
        data = {
            'point_1':route[0],
            'point_2':route[1],
            'mode': id
        }
        data = routeDb.insert_one(data)
    print("Routes seeded")
else:
    print("Already seeded")