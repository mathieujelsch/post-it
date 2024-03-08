class AddCoordonatesToPostits < ActiveRecord::Migration[7.0]
  def change
    add_column :postits, :coord_x, :integer
    add_column :postits, :coord_y, :integer
  end
end
