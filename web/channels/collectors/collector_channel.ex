defmodule Boardling.CollectorChannel do
  alias Boardling.MetricEvent
  use Phoenix.Channel
  require Logger

  def join("metrics_collectors:" <> _collector_name, _message, socket) do
    {:ok, socket}
  end

  def handle_in("new", %{"body" => body}, socket) do
    Poison.decode!(body, as: %MetricEvent{})
      |> Boardling.OutgoingMetricsChannel.broadcast_metric
    {:noreply, socket}
  end

  def broadcast_schedulation(collector_name) do
    Boardling.Endpoint.broadcast_from! self(), "metrics_collectors:#{collector_name}", "schedule", %{}
  end
end
