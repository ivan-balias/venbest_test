import {Job} from "../domain/job/entity/job.entity";

export const calculateJobPricePerTime = (job: Job) => {
    const diffHours = Math.abs(job.endTime.getTime() - job.startTime.getTime()) / (1000 * 60 * 60);
    let hours = Math.floor(diffHours);
    let minutes = (diffHours - hours) * 60;

    if (minutes > 15)
        hours++;

    const {rate} = job.user;
    const price = hours * rate;
    return {
        hours, minutes, price
    }
}
