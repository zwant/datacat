defmodule Boardling.CollectorManager do
  alias Boardling.CollectorChannel
  require Logger

  def add_collector(name) do
    fun = fn -> CollectorChannel.broadcast_schedulation name end
    default_schedule = "* * * * *"
    case Quantum.add_job(name,
                         %Quantum.Job{schedule: default_schedule,
                                      task: fun}) do
      :error -> Logger.info "Job with name [#{name}] already exists"
      :ok -> Logger.info "Added job with name [#{name}]"
    end
    Quantum.deactivate_job(name)
  end

  def update_collector_schedule(name, schedule) do
    job = Quantum.delete_job(name)
    :ok = Quantum.add_job(name, %Quantum.Job{schedule: schedule,
                                             task: job.task})
  end

  def remove_collector(name) do
    Quantum.delete_job(name)
  end

  def activate_collector(name) do
    :ok = Quantum.activate_job(name)
  end

  def deactivate_collector(name) do
    :ok = Quantum.deactivate_job(name)
  end

  def list_collectors do
    Enum.map(Quantum.jobs, fn (x) -> convert_job_to_external_format(x) end)
  end

  def get_collector(name) do
    Quantum.find_job(name) |> convert_job_to_external_format
  end

  defp convert_job_to_external_format(nil) do
    nil
  end

  defp convert_job_to_external_format(%{} = job) do
    convert_job_to_external_format({job.name, job})
  end

  defp convert_job_to_external_format({name, job}) do
    %{name: name, schedule: job.schedule, state: job.state}
  end

end
