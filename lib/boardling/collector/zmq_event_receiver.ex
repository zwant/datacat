defmodule Boardling.ZmqEventReceiver do
  alias Boardling.MetricEvent
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    {:ok, socket} = Exzmq.start([{:type, :sub}])
    Exzmq.bind(socket, :tcp, 5556, [])
    Process.send_after(self(), :work, 1000) # In one second
    {:ok, %{socket: socket}}
  end

  def handle_info(:work, state) do
    receive_loop(state.socket)
  end

  defp receive_loop(socket) do
    {:ok, r} = Exzmq.recv(socket)
    case Poison.decode(r, as: %MetricEvent{}) do
      {:ok, metric} ->
        Logger.debug "Received new metric: name: #{metric.name}, value: #{metric.value}"
        Boardling.Endpoint.broadcast! "metrics:incoming", "new_metric", %{name: metric.name,
                                                                          value: metric.value}

      {:error, {error_type, where}} -> Logger.error "JSON Parse error #{error_type} at #{where} for message #{r}"
    end
    receive_loop(socket)
  end
end
