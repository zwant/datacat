from ws4py.client.threadedclient import WebSocketClient
import json


class Metric(object):
    name = None
    value = None
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def __repr__(self):
        return "Metric[name: {}, value: {}]".format(self.name, self.value)

class _CollectorClient(WebSocketClient):
    topic = None
    collector_func = None # Needs to be set by creator
    collector_id = None

    def __init__(self,
                 url,
                 collector_id,
                 collector_func,
                 protocols=None,
                 extensions=None,
                 heartbeat_freq=None,
                 ssl_options=None,
                 headers=None):
        super().__init__(url,
                         protocols=protocols,
                         extensions=extensions,
                         heartbeat_freq=heartbeat_freq,
                         ssl_options=ssl_options,
                         headers=headers)
        self.collector_id = collector_id
        self.collector_func = collector_func
        self.topic = "metrics_collectors:{}".format(collector_id)

    def opened(self):
        data = dict(topic=self.topic, event="phx_join", payload={}, ref=None)
        self.send(json.dumps(data))
        print("Joined")

    def _is_schedule_event(self, json_msg):
        return 'event' in json_msg and json_msg['event'] == 'schedule'

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
        except AttributeError as e:
            return False
        return True

    def received_message(self, raw_msg):
        msg = str(raw_msg.data, encoding='utf-8')
        print("Got msg: {}".format(msg))
        json_msg_received = json.loads(msg)

        if not self._is_schedule_event(json_msg_received):
            return

        collector_return = self.collector_func()
        if not self._validate_return_value(collector_return):
            print("Invalid return value from collector: {}".format(collector_return))
            return

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
                outgoing_msg = dict(topic=self.topic,
                event="new",
                payload={"body":piece_of_data}, ref=None)
                self.send(json.dumps(outgoing_msg))

                print("Sent {}".format(outgoing_msg))

class BoardlingCollector(object):

    collector_id = None
    websocket_url = None

    incoming_topic = b'schedule:'
    outgoing_topic = b'metrics:'

    def __init__(self,
                 collector_id,
                 websocket_url="ws://127.0.0.1:4000/collector_socket/websocket"):
        self.collector_id = collector_id
        self.websocket_url = websocket_url


    def run(self, collector_func):
        try:
            ws = _CollectorClient(self.websocket_url,
                                  self.collector_id,
                                  collector_func,
                                  protocols=['http-only', 'chat'])
            ws.connect()
            ws.run_forever()
        except KeyboardInterrupt:
            ws.close()
