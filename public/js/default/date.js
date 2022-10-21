// making the date look beautiful
function dateToNiceString(myDate){
    var month = ["January","February","March","April","May","June","July","August","September","October","November","December",];
    return month[myDate.getMonth()]+" "+myDate.getDate()+" "+myDate.getFullYear();
}