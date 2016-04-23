#!/usr/bin/env python

import json
import socket
import time
import re

TCP_IP = '192.168.137.10'
TCP_PORT = 5005
BUFFER_SIZE = 1024
MESSAGE = "GET gyroscope"

def sent_request(request):

	# Connect to server
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
	s.connect((TCP_IP, TCP_PORT));

	# Sent request
	s.send(request);

	# Retrieve result
	data = s.recv(BUFFER_SIZE)

	# Parse retrieved result
	match = re.search(r'(\d+)', data)
	if match:
		value = match.group(1)
	else:
		value = 0
	return json.dumps([value])
