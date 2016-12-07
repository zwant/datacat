# needed to get defdatabase and other macros
use Amnesia

# defines a database called Database, it's basically a defmodule with
# some additional magic
defdatabase Database do
  # this defines a table with other attributes as ordered set, and defines an
  # additional index as email, this improves lookup operations
  deftable Collector, [{ :id, autoincrement }, :name, :cron_schedule], type: :ordered_set do
    # again not needed, but nice to have
    @type t :: %Collector{id: non_neg_integer, name: String.t, cron_schedule: String.t}
  end
end
