defmodule Boardling.CollectorChannel do
  alias Boardling.MetricEvent
  use Phoenix.Channel
  require Logger

  def join("metrics_collectors:" <> _collector_name, _message, socket) do
    {:ok, socket}
  end

  def handle_in("new", %{"body" => body}, socket) do
    case Poison.decode(body, as: %MetricEvent{}) do
      {:ok, event} ->
        Logger.debug("Received metric #{inspect event}")
        Boardling.OutgoingMetricsChannel.broadcast_metric event
      {:error, _} ->
        Logger.warn("Received invalid JSON: #{body}")
    end
    {:noreply, socket}
  end

  def broadcast_schedulation(collector_name) do
    Boardling.Endpoint.broadcast_from! self(), "metrics_collectors:#{collector_name}", "schedule", %{}
  end
end
