defmodule Boardling.CollectorChannel do
  alias Boardling.MetricEvent
  alias Boardling.CollectorManager
  use Phoenix.Channel
  require Logger

  def join("metrics_collectors:" <> collector_name, _message, socket) do
    CollectorManager.add_collector(collector_name)
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
    Logger.info "Running schedulation for [#{collector_name}]"
    Boardling.Endpoint.broadcast_from! self(), "metrics_collectors:#{collector_name}", "schedule", %{}
  end
end
