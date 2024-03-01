class CreatePostits < ActiveRecord::Migration[7.0]
  def change
    create_table :postits do |t|
      t.string :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
