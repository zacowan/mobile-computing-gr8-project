import requests
from time import sleep

SERVICE_URL = "http://localhost:3001/serviceCaller?appID=test_generated_app"
ERROR_URL = "http://localhost:3001/apps/logError?appID=test_generated_app"

try:
    while True:
        if requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()['output']: requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }})
        sleep(5000/1000.0)
except Exception as e:
    requests.post(ERROR_URL, json={'message': str(e)})
    exit()
