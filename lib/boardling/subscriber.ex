defmodule Boardling.Subscriber do
  use GenServer
  require Logger

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
  end

  def init(state) do
    Phoenix.PubSub.subscribe(Boardling.PubSub, self, "metrics:incoming")
    {:ok, state}
  end

  def handle_info(%{event: event, payload: payload} = msg, state) do
    %{name: name, value: value} = payload
    Boardling.MetricsChannel.broadcast_metric name, value
    {:noreply, state}
  end

end
