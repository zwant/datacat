defmodule Boardling.OutgoingMetricsChannel do
  alias Boardling.MetricEvent
  alias Boardling.Collector
  use Phoenix.Channel
  require Logger

  @metric_event_type "new_metric"
  @new_collector_event_type "new_collector"
  @topic_name "outgoing_metrics:all"


  def join("outgoing_metrics:all", _message, socket) do
    {:ok, socket}
  end


  def broadcast_new_collector(%Collector{} = collector) do
    Logger.info "Broadcasting new collector [#{collector.name}]"
    Boardling.Endpoint.broadcast_from! self(), @topic_name, @new_collector_event_type, collector
  end

  def broadcast_metric(%MetricEvent{} = metric) do
    #Logger.debug "received new_metric #{inspect name}, #{inspect value}"
    Boardling.Endpoint.broadcast_from! self(), @topic_name, @metric_event_type, metric
  end
end
