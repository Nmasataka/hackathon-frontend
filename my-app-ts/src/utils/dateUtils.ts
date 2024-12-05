// src/utils/dateUtils.ts
export const formatToJST = (utcString: string | undefined): string => {
    if(utcString==undefined) return "undefined";
    const utcDate = new Date(utcString);
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const day = utcDate.getUTCDate();
    const hours = utcDate.getUTCHours();
    const minutes = String(utcDate.getUTCMinutes()).padStart(2, "0");
  
    const jstHours = hours + 9;
    const adjustedDay = jstHours >= 24 ? day + 1 : day;
    const finalHours = String(jstHours % 24).padStart(2, "0");
  
    return `${year}年${month}月${adjustedDay}日 ${finalHours}:${minutes}`;
  };
  