defmodule Boardling.ExampleZmqClient do
  alias Boardling.MetricEvent
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    {:ok, sub_socket} = connect_subscription_socket({127,0,0,1}, 5555)
    {:ok, pub_socket} = connect_publish_socket({127,0,0,1}, 5556)
    Process.send_after(self(), :work, 1000) # In one second
    {:ok, %{subscription_socket: sub_socket,
            publish_socket: pub_socket}}
  end

  defp connect_subscription_socket(host, port) do
    {:ok, socket} = Exzmq.start([{:type, :sub}])
    Exzmq.connect(socket, :tcp, host, port, [])
    {:ok, socket}
  end

  defp connect_publish_socket(host, port) do
    {:ok, socket} = Exzmq.start([{:type, :pub}])
    Exzmq.connect(socket, :tcp, host, port, [])
    {:ok, socket}
  end

  def handle_info(:work, state) do
    receive_loop(state.subscription_socket, state.publish_socket)
  end

  defp receive_loop(subscription_socket, publish_socket) do
    {:ok, r} = Exzmq.recv(subscription_socket)
    event = Poison.encode!(%MetricEvent{name: "Example",
                                        value: :rand.uniform})
    Exzmq.send(publish_socket, [<<"#{event}">>])

    event_two = Poison.encode!(%MetricEvent{name: "Example-Two",
                                        value: :rand.uniform})
    Exzmq.send(publish_socket, [<<"#{event_two}">>])
    receive_loop(subscription_socket, publish_socket)
  end
end
