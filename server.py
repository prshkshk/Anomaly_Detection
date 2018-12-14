import anomaly_detection_api
import os
from PIL import Image
from flask import Flask, request, Response, send_file
import base64

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST') # Put any other methods you need here
    return response


@app.route('/')
def index():
    return Response('Anomaly Detection in Videos')


@app.route('/local')
def local():
    return Response(open('./static/local.html').read(), mimetype="text/html")


@app.route('/video')
def remote():
    return Response(open('./static/video.html').read(), mimetype="text/html")



@app.route('/image', methods=['POST'])
def image():
	with open("movie2.gif", "rb") as imageFile:
		str = base64.b64encode(imageFile.read())
		anomaly_detection_api.detect_anomaly()
	return str


if __name__ == '__main__':
    app.run(debug=True, host='localhost',port= 80)

