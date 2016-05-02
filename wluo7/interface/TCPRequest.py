#!/usr/bin/env python

import json
import socket
import time
import re
import select

TCP_IP = '192.168.1.200' # Change to beaglebone server IP
TCP_PORT = 5005
BUFFER_SIZE = 1024

connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
connection.connect((TCP_IP, TCP_PORT))

def sent_request(request):
    print "Senting request to server: "+request 
	# Sent request
    connection.send(request)
	
    print "Wait for response from back-end server..."
    # Retrieve result
    while True:
        connection.setblocking(0)
        ready = select.select([connection],[],[],1.0)
        if ready[0]:
            data = connection.recv(BUFFER_SIZE)
            break
        else:
            print "No response, re-sending request..."
            connection.send(request)

    print "Retrieved response from server, processing in front-end."

	# Parse retrieved result
    return json.dumps([float(data)])
