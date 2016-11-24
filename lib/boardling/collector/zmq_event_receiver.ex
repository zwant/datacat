defmodule Boardling.ZmqEventReceiver do
  alias Boardling.MetricEvent
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    {:ok, ctx} = :czmq.start_link()
    socket = :czmq.zsocket_new(ctx, :czmq_const.zmq_sub)
    {:ok, port} = :czmq.zsocket_bind(socket, "tcp://localhost:5556")
    :czmq.zsocket_set_subscribe(socket, "metrics" |> String.to_char_list)
    Process.send_after(self(), :work, 1000) # In one second
    {:ok, %{socket: socket}}
  end

  def handle_info(:work, state) do
    receive_loop(state.socket)
  end

  defp receive_loop(socket) do
    {:ok, msg} = :czmq.zstr_recv(socket)
    case Poison.decode(msg, as: %MetricEvent{}) do
      {:ok, metric} ->
        Logger.debug "Received new metric: name: #{metric.name}, value: #{metric.value}"
        Boardling.Endpoint.broadcast! "metrics:incoming", "new_metric", %{name: metric.name,
                                                                          value: metric.value}

      {:error, {error_type, where}} -> Logger.error "JSON Parse error #{error_type} at #{where} for message #{msg}"
    end
    receive_loop(socket)
  end
end
