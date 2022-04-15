import requests
from time import sleep

URL = "http://localhost:3001/serviceCaller"

while True:
    requests.post(URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()
    sleep(5000/1000.0)
