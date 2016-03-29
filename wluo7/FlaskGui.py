from flask import Flask, render_template, make_response

from time import time
import json
import sys

# BackEnd interface location on Gary's MacBook, need to change if using your own
BACKEND_LOCATION = '/Users/kaluo/Documents/Research/Hyperloop/IlliniHyperloopComputing/BackEnd/wluo7/GuiClient' 
sys.path.insert(0, BACKEND_LOCATION)

# BacnEnd Interface
from TCPclient import sent_request

app = Flask(__name__)

@app.route('/live-data')
def live_data():
	data = sent_request('GET gyroscope')
	data = json.loads(data)
	data = data[0]
	data = [time() * 1000, int(data)]
	print data
	response = make_response(json.dumps(data))
	response.content_type = 'application/json'
	return response


@app.route("/")
def index_page():
	return render_template('index.html')

if __name__ == "__main__":
	app.run(debug=True)
