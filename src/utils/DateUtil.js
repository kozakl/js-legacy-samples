class DateUtil
{
    static dateDiff(date1, date2)
    {
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()),
              utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return Math.floor((utc2 - utc1) / DateUtil.MS_PER_DAY);
    }
    
    static addDays(date, days)
    {
        return new Date(date.getTime() + days * DateUtil.MS_PER_DAY);
    }
}

DateUtil.MS_PER_DAY = 1000 * 60 * 60 * 24;
