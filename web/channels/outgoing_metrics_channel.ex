defmodule Boardling.OutgoingMetricsChannel do
  alias Boardling.MetricEvent
  use Phoenix.Channel
  require Logger

  @event_type "new_metric"
  @topic_name "outgoing_metrics:all"

  def join("outgoing_metrics:all", _message, socket) do
    {:ok, socket}
  end

  def broadcast_metric(%MetricEvent{} = metric) do
    #Logger.debug "received new_metric #{inspect name}, #{inspect value}"
    Boardling.Endpoint.broadcast_from! self(), @topic_name, @event_type, metric
  end
end
