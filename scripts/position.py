import pymongo
from datetime import datetime, timedelta

db_name="scotland_yard"
db_server="127.0.0.1:27017"

file_path = './resources/position.txt'

positions = []
pos = []
with open(file_path) as fp:
   line = fp.readline()
   cnt = 1
   while line:
        if(cnt > 1):
            pos = line.strip().split(' ')
            pos[0] = int(pos[0])
            pos[1] = int(pos[1])
            pos[2] = int(pos[2])
            positions.append(pos)
        line = fp.readline()
        cnt += 1

myclient = pymongo.MongoClient("mongodb://"+db_server+"/")
db = myclient[db_name]
posDb = db['pointPositions']
posData = list(posDb.find({}))

if len(posData) == 0:
    print("Starting to seed positions, do not interrupt")
    for pos in positions:
        #seed
        data = {
            'place':pos[0],
            'map_x':pos[1],
            'map_y':pos[2]
        }
        data = posDb.insert_one(data)
    print("positions seeded")
else:
    print("Already seeded")