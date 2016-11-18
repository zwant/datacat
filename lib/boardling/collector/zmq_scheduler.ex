defmodule Boardling.ZmqScheduler do
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, socket} = Exzmq.start([{:type, :pub}])
    Exzmq.bind(socket, :tcp, 5555, [])
    {:ok, %{socket: socket}}
  end

  def handle_info(:work, state) do
    Exzmq.send(state.socket, [<<"Hello",0>>])
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1000) # In one second
  end
end
