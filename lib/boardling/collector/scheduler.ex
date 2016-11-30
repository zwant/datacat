defmodule Boardling.Scheduler do
  alias Boardling.CollectorChannel
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    schedule_work
    {:ok, state}
  end

  def handle_info(:work, state) do
    Logger.debug("Scheduling...")
    CollectorChannel.broadcast_schedulation "example"
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1000) # In one second
  end
end
