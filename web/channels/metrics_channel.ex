defmodule Boardling.MetricsChannel do
  use Phoenix.Channel
  require Logger

  def join("metrics:" <> _metrics_id, _message, socket) do
    {:ok, socket}
  end

  def handle_info({:metric, name, value}, socket) do
    Logger.debug "received :data #{inspect name} #{inspect value}"
    broadcast! socket, "new:metric", %{name: name, value: value}

    {:noreply, socket}
  end
end
