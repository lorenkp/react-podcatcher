class RenameSubscribesToSubscriptions < ActiveRecord::Migration
  def change
    rename_table :subscribes, :subscriptions
  end
end
