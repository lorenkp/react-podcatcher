class Api::EpisodeStatusesController < ApplicationController
  def update
    updated_status = EpisodeStatus.find(params[:id]).update(episode_status_params.to_snake_keys)
    render json: updated_status
  end

  private

  def episode_status_params
    params.require(:status).permit(:played, :timeElapsed, :favorite)
  end
end
