export const plugins = [
    function toDatePad(time){
        return new Date(time * 1000).toLocaleDateString().split(/\//).map(d => d.padStart(2, "0"));
    },

    function toUnixTime(date){
        return Math.floor((date?.getTime() ?? Date.now()) / 1000);
    }
];