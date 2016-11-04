defmodule Boardling.Scheduler do
  use GenServer
  require Boardling.Endpoint
  require Logger
  require Phoenix.PubSub

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:work, state) do
    Boardling.Endpoint.broadcast! "metrics:incoming", "new_metric", %{name: "hej", value: :rand.uniform}
    Boardling.Endpoint.broadcast! "metrics:incoming", "new_metric", %{name: "hej2", value: :rand.uniform}
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1000) # In one second
  end
end
