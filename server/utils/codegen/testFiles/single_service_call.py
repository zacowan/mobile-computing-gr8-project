import requests

URL = "http://localhost:3001/serviceCaller"

requests.post(URL, json={'service': {'name': 'get_led', 'thingID': 'zach_thing', 'spaceID': 'smart_space', 'input': '' }}).json()
