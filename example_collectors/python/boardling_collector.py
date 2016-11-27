from collections import namedtuple
import zmq
import json

class Metric(object):
    name = None
    value = None
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def __repr__(self):
        return "Metric[name: {}, value: {}]".format(self.name, self.value)

class BoardlingCollector(object):
    collector_id = None
    schedule_subscriber = None
    metrics_publisher = None

    incoming_topic = b'schedule:'
    outgoing_topic = b'metrics:'

    def __init__(self,
                 collector_id,
                 host="localhost",
                 scheduling_port=5555,
                 metrics_port=5556):
        self.collector_id = collector_id

        context = zmq.Context()
        self.schedule_subscriber = self._setup_schedule_subscriber(context,
                                                                   host,
                                                                   scheduling_port)
        self.metrics_publisher = self._setup_metrics_publisher(context,
                                                               host,
                                                               metrics_port)


    def _setup_schedule_subscriber(self, ctx, host, scheduling_port):
        subscriber = ctx.socket(zmq.SUB)
        subscriber.connect('tcp://{}:{}'.format(host, scheduling_port))
        subscriber.setsockopt(zmq.SUBSCRIBE, self.incoming_topic)

        return subscriber

    def _setup_metrics_publisher(self, ctx, host, metrics_port):
        publisher = ctx.socket(zmq.PUB)
        publisher.connect('tcp://{}:{}'.format(host, metrics_port))

        return publisher

    def _validate_return_value(self, return_value):
        """
            Return value should either be something iterable, where every value
            is a Metric, or it should just be a Metric
        """
        try:
            try:
                iterator = iter(return_value)
            except TypeError:
                return_value.name
                return_value.value
            else:
                for thing in iterator:
                    thing.name
                    thing.value
        except AttributeError, e:
            return False

        return True

    def run(self, collector_func):
        while True:
            msg = self.schedule_subscriber.recv()
            print("Got message {}".format(msg))

            collector_return = collector_func()
            if not self._validate_return_value(collector_return):
                print("Invalid return value from collector: {}".format(collector_return))
                continue

            all_data = []
            try:
                iterator = iter(collector_return)
            except TypeError:
                # Not iterable
                all_data.append(json.dumps({"name": collector_return.name,
                                   "value": collector_return.value}))
            else:
                # iterable
                all_data.extend([json.dumps({"name": returned.name,
                                    "value": returned.value}) for returned in collector_return])

            for piece_of_data in all_data:
                outgoing_msg = self.outgoing_topic + piece_of_data
                self.metrics_publisher.send_string(outgoing_msg)

                print("Sent {}".format(outgoing_msg))
