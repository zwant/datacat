defmodule Boardling.OutgoingMetricsChannel do
  alias Boardling.MetricEvent
  use Phoenix.Channel
  require Logger

  def join("outgoing_metrics:all", _message, socket) do
    {:ok, socket}
  end

  def broadcast_metric(%MetricEvent{} = metric) do
    #Logger.debug "received new_metric #{inspect name}, #{inspect value}"
    Boardling.Endpoint.broadcast_from! self(), "outgoing_metrics:all", "new", metric
  end
end
