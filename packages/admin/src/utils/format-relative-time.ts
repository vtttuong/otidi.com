import moment from 'moment';

export const UnitEnum = {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};

export function formatRelativeTime(createdAt) {
    const diffIntime = moment
        .duration(moment(moment.now()).diff(moment(createdAt)))
        .asSeconds();

    if (diffIntime < 60) {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asSeconds().toString()
        );
        return {
            time: time,
            unit: UnitEnum.SECOND,
        };
    } else if (diffIntime < 3600) {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asMinutes().toString()
        );
        return {
            time: time,
            unit: UnitEnum.MINUTE,
        };
    } else if (diffIntime < 86400) {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asHours().toString()
        );
        return {
            time: time,
            unit: UnitEnum.HOUR,
        };
    } else if (diffIntime < 2592000) {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asDays().toString()
        );
        return {
            time: time,
            unit: UnitEnum.DAY,
        };
    } else if (diffIntime < 18144000) {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asWeeks().toString()
        );
        return {
            time: time,
            unit: UnitEnum.WEEK,
        };
    } else {
        let time = parseInt(
            moment.duration(moment(moment.now()).diff(moment(createdAt))).asMonths().toString()
        );
        return {
            time: time,
            unit: UnitEnum.MONTH,
        };
    }
}
