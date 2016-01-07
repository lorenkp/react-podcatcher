class Api::EpisodeStatusesController < ApplicationController
  def update
    test = EpisodeStatus.update(params[:id], episode_status_params)
  end

  private

  def episode_status_params
    params.require(:status).permit(:id, :played, :time_elapsed, :favorite)
  end
end
