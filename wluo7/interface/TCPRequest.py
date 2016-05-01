#!/usr/bin/env python

import json
import socket
import time
import re

TCP_IP = '127.0.0.1' # Change to beaglebone server IP
TCP_PORT = 5005
BUFFER_SIZE = 1024

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
connection.connect((TCP_IP, TCP_PORT))

def sent_request(request):
    
	# Sent request
    connection.send(request)
	
    # Retrieve result
    data = connection.recv(BUFFER_SIZE)

	# Parse retrieved result
    match = re.search(r'(\d+)', data)
    if match:
        value = match.group(1)
    else:
        value = 0
    return json.dumps([value])
