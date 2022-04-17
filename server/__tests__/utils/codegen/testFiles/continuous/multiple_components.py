import requests
from time import sleep
from signal import signal, SIGTERM

SERVICE_URL = "http://localhost:3001/serviceCaller?appID=test_generated_app"
ERROR_URL = "http://localhost:3001/apps/logError?appID=test_generated_app"
STOP_URL = "http://localhost:3001/apps/logStop?appID=test_generated_app"

loop = True
def term():
    global loop
    loop = False

try:
    signal(SIGTERM, term)
    while loop:
        requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }})
        requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()['output'] }})
        if requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()['output']: requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }})
        if requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }}).json()['output'] == 1: requests.post(SERVICE_URL, json={'service': {'name': 'test_service_name', 'thingID': 'test_thing_id', 'spaceID': 'test_space_id', 'input': '' }})
        sleep(5000/1000.0)
except Exception as e:
    requests.post(ERROR_URL, json={'message': str(e)})
    exit()
