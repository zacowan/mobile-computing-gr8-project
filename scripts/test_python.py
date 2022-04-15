import requests

URL = "http://localhost:3001/serviceCaller"


def main():
    requests.post('url', data={'service': {
        'name': "service_name",
        'thingID': "thing_id",
        'spaceID': 'space_id',
        'input': ''
    }}).json()


if __name__ == "__main__":
    main()
