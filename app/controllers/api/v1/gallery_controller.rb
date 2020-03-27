class Api::V1::GalleryController < Api::ApiController
  # GET /api/v1/gallery
  #
  def index
    render json: current_user.images.map(&:to_h)
  end

  # POST /api/v1/gallery
  #
  def create
    render json: current_user.images.create(gallery_params).to_h
  end

  private

  def gallery_params
    params.require(:image).permit(:post_id, :title, :src)
  end
end
