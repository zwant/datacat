defmodule Boardling.CollectorController do
  use Boardling.Web, :controller
  alias Boardling.CollectorManager

  def update_schedule(conn, %{"name" => name, "schedule" => schedule}) do
    CollectorManager.update_collector_schedule(name, schedule)
    conn
      |> put_status(200)
      |> json(%{ok: true})
  end

  def activate(conn, %{"name" => name}) do
    CollectorManager.activate_collector(name)
    conn
      |> put_status(200)
      |> json(%{ok: true})
  end

  def deactivate(conn, %{"name" => name}) do
    CollectorManager.deactivate_collector(name)
    conn
      |> put_status(200)
      |> json(%{ok: true})
  end

  def list(conn, _params) do
    conn
      |> put_status(200)
      |> json(CollectorManager.list_collectors)
  end

  def show(conn, %{"name" => name}) do
    case CollectorManager.get_collector(name) do
      collector when not is_nil(collector) -> conn |> put_status(200) |> json(collector)
      _ -> conn |> put_status(404) |> json("Collector not found")
    end
  end
end
