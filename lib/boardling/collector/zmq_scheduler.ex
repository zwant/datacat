defmodule Boardling.ZmqScheduler do
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    {:ok, ctx} = :czmq.start_link()
    socket = :czmq.zsocket_new(ctx, :czmq_const.zmq_pub)
    {:ok, port} = :czmq.zsocket_bind(socket, "tcp://localhost:5555")
    schedule_work() # Schedule work to be performed at some point
    {:ok, %{socket: socket}}
  end

  def handle_info(:work, state) do
    :czmq.zstr_send(socket, "schedule hello")
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1000) # In one second
  end
end
