import requests
from time import sleep

URL = "http://localhost:3001/serviceCaller"

requests.post(URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': requests.post(URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()['output'] }})
