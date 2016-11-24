import time
import random
import zmq
import json

def main():
    context = zmq.Context()
    # First, connect our subscriber socket
    subscriber = context.socket(zmq.SUB)
    subscriber.connect('tcp://127.0.0.1:5555')
    subscriber.setsockopt(zmq.SUBSCRIBE, b'schedule')

    # First, connect our publish socket
    publisher = context.socket(zmq.PUB)
    publisher.connect('tcp://127.0.0.1:5556')

    while True:
        msg = subscriber.recv()
        print "Got message {}".format(msg)
        data = {
            "name": "My Python Script",
            "value": random.uniform(0, 100)
        }
        print "Sending {}".format(data)

        result = publisher.send_multipart([b'metrics', json.dumps(data)])
        print result

if __name__ == "__main__":
    main()
