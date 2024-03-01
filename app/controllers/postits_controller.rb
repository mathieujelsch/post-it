class PostitsController < ApplicationController
  before_action :authenticate_user!

  # def create
  #   user = current_user.id
  #   @postit = Postit.create(content: 'Nouveau postit', user_id: user)
  #   render json: { image_url: asset_url('postit.png') }
  # end

  def create
    # Logique de création du post-it ici
    respond_to do |format|
      format.js { head :ok }
    end
  end
end
