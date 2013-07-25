class AddBarcodeToVariants < ActiveRecord::Migration
  def change
    add_column :spree_variants, :barcode, :string
  end
end
