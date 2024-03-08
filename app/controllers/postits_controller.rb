class PostitsController < ApplicationController
  before_action :authenticate_user!

  def index
    @postits = current_user.postits
    respond_to do |format|
      format.json { render json: @postits }
    end
  end

  def create
    @postit = Postit.new
    @postit.user_id = current_user.id
    if @postit.save
      respond_to do |format|
        format.js { head :ok }
      end
    else
      respond_to do |format|
        format.js { head :unprocessable_entity }
      end
    end
  end

  def update
    @postit = current_user.postits.find(params[:id])
    if @postit.update(postit_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @postit = current_user.postits.find(params[:id])
    if @postit.destroy
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def postit_params
    params.require(:postit).permit(:content, :coord_x, :coord_y)
  end
end
