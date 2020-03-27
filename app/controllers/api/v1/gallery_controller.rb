class Api::V1::GalleryController < Api::ApiController
  # GET /api/v1/gallery
  #
  def index
    render json: images
  end

  # POST /api/v1/gallery
  #
  def create
    render json: current_user.images.create(gallery_params).to_h
  end

  # DELETE /api/v1/gallery/:id
  #
  def destroy
    image = current_user.images.find_by_post_id(params[:id])

    return render json: { error: 'Image not found' }, status: 404 unless image

    image.destroy

    render json: image
  end

  private

  def images
    current_user.images.order(created_at: :desc).map(&:to_h)
  end

  def gallery_params
    params.require(:image).permit(:post_id, :title, :src)
  end
end
