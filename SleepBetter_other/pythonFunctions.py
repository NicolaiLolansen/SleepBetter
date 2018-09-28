import sys

import uuid
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
import requests
import json

def notify_user (user_token, message):
    token = user_token 
    
    unique_id = str(uuid.uuid4())
    headers = {'content-type': 'application/json'}
    url = 'http://34.240.2.7:8080/addnotification'

    try:
        send_push_message(token, message,extra={"uuid":unique_id})

        data = {"data": {
                    "uuid": unique_id,
                    "token": token,
                    "statuscode": 200}
        }

        requests.post(url, data=json.dumps(data), headers=headers)

    except Exception as e:
        print(e)
        data = {"data": {
                    "uuid": unique_id,
                    "token": token,
                    "sound": "default",
                    "badge": 0,
                    "statuscode": e}
        }


        requests.post(url, data=json.dumps(data), headers=headers)
    
def notify_users_by_group (users, group, message):
    print('Message is: ' + message)
    for u in users:
        if ('token' in u.keys()):
            if ('group' in u.keys()):
                if (u['group'] == group):
                    print('Sending notification to: ' + u['name'])
                    notify_user(u['token'], message)

def notify_all_users_by_group (group, message):
    requests.get("http://34.240.2.7:8080/getusers").json();
    notify_users_by_group(users, group, message)
    
# notify_all_users_by_group(1,'Good morning group 1!')  

notify_all_users_by_group(arg1,arg2)                    