defmodule Boardling.Collector do
  @derive [Poison.Encoder]
  defstruct [:name,
             :schedule,
             :state]
end
