defmodule Boardling.PageController do
  use Boardling.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
