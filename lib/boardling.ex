defmodule Boardling do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Start the endpoint when the application starts
      supervisor(Boardling.Endpoint, [])
    ]
    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Boardling.Supervisor]
    Supervisor.start_link(children, opts)

    init_event_subscribers
    init_zmq_handlers
  end

  defp init_zmq_handlers() do
    import Supervisor.Spec, warn: false

    children = [
      worker(Boardling.ZmqEventReceiver, [Boardling.ZmqEventReceiver]),
      worker(Boardling.ZmqScheduler, [Boardling.ZmqScheduler]),
    ]
    opts = [strategy: :one_for_one, name: Boardling.ZmqHandlerSupervisor]
    Supervisor.start_link(children, opts)
  end

  defp init_event_subscribers() do
    import Supervisor.Spec, warn: false

    children = [
      worker(Boardling.Subscriber, [Boardling.Subscriber])
    ]
    opts = [strategy: :one_for_one, name: Boardling.EventSubscriberSupervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Boardling.Endpoint.config_change(changed, removed)
    :ok
  end
end
