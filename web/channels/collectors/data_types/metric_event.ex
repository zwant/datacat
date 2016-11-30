defmodule Boardling.MetricEvent do
  @derive [Poison.Encoder]
  defstruct [:name,
             :value]
end
