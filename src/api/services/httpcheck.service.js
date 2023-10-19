import HttpCheckModel from '../models/httpcheck.model'

const getAll = () => {
  return HttpCheckModel.findAll({})
}

const create = async (params) => {
  const {
    name,
    uri,
    is_paused,
    num_retries,
    uptime_sla,
    response_time_sla,
    use_ssl,
    response_status_code,
    check_interval_in_seconds,
  } = params

  return await HttpCheckModel.create({
    name,
    uri,
    is_paused,
    num_retries,
    uptime_sla,
    response_time_sla,
    use_ssl,
    response_status_code,
    check_interval_in_seconds,
  })
}

export default { getAll, create }
