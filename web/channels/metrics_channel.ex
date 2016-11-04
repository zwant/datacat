defmodule Boardling.MetricsChannel do
  use Phoenix.Channel
  require Logger

  def join("metrics:all", _message, socket) do
    {:ok, socket}
  end

  def broadcast_metric(name, value) do
    #Logger.debug "received new_metric #{inspect name}, #{inspect value}"
    Boardling.Endpoint.broadcast_from! self(), "metrics:all", "new", %{name: name, value: value}
  end
end
