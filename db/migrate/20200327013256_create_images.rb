class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.references :user
      t.string :post_id
      t.string :title
      t.string :src

      t.timestamps
    end
  end
end
