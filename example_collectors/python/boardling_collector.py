import asyncio
import websockets
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
    websocket_url = None

    incoming_topic = b'schedule:'
    outgoing_topic = b'metrics:'

    def __init__(self,
                 collector_id,
                 websocket_url="ws://127.0.0.1:4000/collector_socket/websocket"):
        self.collector_id = collector_id
        self.websocket_url = websocket_url


    def run(self, collector_func):
        asyncio.get_event_loop().run_until_complete(_run_listen(collector_func, self.collector_id, self.websocket_url))
        asyncio.get_event_loop().run_forever()

def _validate_return_value(return_value):
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

async def _run_listen(collector_func, collector_id, websocket_url):
    topic = "metrics_collectors:{}".format(collector_id)

    async with websockets.connect(websocket_url) as websocket:
        data = dict(topic=topic, event="phx_join", payload={}, ref=None)
        await websocket.send(json.dumps(data))
        print("Joined")

        while True:
            call = await websocket.recv()
            json_msg_received = json.loads(call)
            print("Got msg: {}".format(call))

            collector_return = collector_func()
            if not _validate_return_value(collector_return):
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
                msg = dict(topic=topic,
                           event="new",
                           payload={"body":piece_of_data}, ref=None)
                await websocket.send(json.dumps(msg))

                print("Sent {}".format(msg))
