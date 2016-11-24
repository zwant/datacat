defmodule Boardling.ExampleZmqClient do
  alias Boardling.MetricEvent
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    {:ok, ctx} = :czmq.start_link()
    {:ok, sub_socket} = connect_subscription_socket(ctx, {127,0,0,1}, 5555)
    {:ok, pub_socket} = connect_publish_socket(ctx, {127,0,0,1}, 5556)
    Process.send_after(self(), :work, 1000) # In one second

    {:ok, %{subscription_socket: sub_socket,
            publish_socket: pub_socket}}
  end

  defp connect_subscription_socket(ctx, host, port) do
    socket = :czmq.zsocket_new(ctx, :czmq_const.zmq_sub)
    :ok = :czmq.zsocket_connect(socket, "tcp://#{host}:#{port}")
    :czmq.zsocket_set_subscribe(socket, "schedule" |> String.to_char_list)

    {:ok, socket}
  end

  defp connect_publish_socket(host, port) do
    socket = :czmq.zsocket_new(ctx, :czmq_const.zmq_pub)
    :ok = :czmq.zsocket_connect(socket, "tcp://#{host}:#{port}")
    {:ok, socket}
  end

  def handle_info(:work, state) do
    receive_loop(state.subscription_socket, state.publish_socket)
    {:noreply, state}
  end

  defp receive_loop(subscription_socket, publish_socket) do
    {:ok, msg} = :czmq.zstr_recv(subscription_socket)
    event = Poison.encode!(%MetricEvent{name: "Example",
                                        value: :rand.uniform})
    :czmq.zstr_send(socket, "metrics #{event}")

    event_two = Poison.encode!(%MetricEvent{name: "Example-Two",
                                        value: :rand.uniform})
    :czmq.zstr_send(socket, "metrics #{event_two}")

    receive_loop(subscription_socket, publish_socket)
  end
end
