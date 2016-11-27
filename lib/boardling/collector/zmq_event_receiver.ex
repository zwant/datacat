defmodule Boardling.ZmqEventReceiver do
  alias Boardling.MetricEvent
  use GenServer
  require Logger

  @topic "metrics:"

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(_state) do
    {:ok, ctx} = :czmq.start_link()
    socket = :czmq.zsocket_new(ctx, :czmq_const.zmq_sub)
    {:ok, _port} = :czmq.zsocket_bind(socket, "tcp://*:5556")
    :czmq.zsocket_set_subscribe(socket, @topic |> String.to_char_list)
    Process.send_after(self(), :work, 1000) # In one second
    {:ok, %{socket: socket}}
  end

  def handle_info(:work, state) do
    receive_loop(state.socket)
  end

  defp receive_loop(socket) do
    case :czmq.zstr_recv_nowait(socket) do
      {:ok, msg} ->
        msg
          |> to_string
          |> String.replace_prefix(@topic, "")
          |> parse_json_from_str
        {:ok}
      :error ->
        {:error}
    end

    receive_loop(socket)
  end

  defp parse_json_from_str(msg) do
    Poison.decode!(msg, as: %MetricEvent{})
      |> send_metric
  end

  defp send_metric(%MetricEvent{} = metric) do
    Boardling.Endpoint.broadcast!("metrics:incoming", "new_metric",
                                  %{name: metric.name, value: metric.value})
    Logger.debug "Received metric: name: #{metric.name}, value: #{metric.value}"
  end

end
