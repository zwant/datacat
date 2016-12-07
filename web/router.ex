defmodule Boardling.Router do
  use Boardling.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Boardling do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Boardling do
    pipe_through :api

    get "/collectors/:name", CollectorController, :show
    put "/collectors/:name/schedule", CollectorController, :update_schedule
    put "/collectors/:name/activate", CollectorController, :activate
    put "/collectors/:name/deactivate", CollectorController, :deactivate
    get "/collectors", CollectorController, :list
  end
end
