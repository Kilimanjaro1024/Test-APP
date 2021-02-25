class ProductsController < ApplicationController
  before_action :set_product, only: [:show]

  # GET /products
  def index
    reviews = Review.where(product_id: params[:product_id])

    render json: reviews
  end

  # GET /products/1
  def show
    @product = Product.find(params[:id])
    render json: @product, status: 200
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end
end
